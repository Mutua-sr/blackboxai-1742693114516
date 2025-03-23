import nano, { DocumentScope, MaybeDocument } from 'nano';
import config from '../config/config';
import logger from '../config/logger';
import { CouchDBDocument } from '../types';

// Initialize CouchDB connection
const couchdb = nano({
  url: config.couchdb.url,
  requestDefaults: {
    auth: {
      username: config.couchdb.username,
      password: config.couchdb.password
    }
  }
});

// Get database instance
const db = couchdb.use(config.couchdb.dbName);

// Generic database operations
export const DatabaseService = {
  // Create a document
  async create<T>(doc: T): Promise<T & CouchDBDocument> {
    try {
      const response = await db.insert(doc as any);
      return {
        ...doc,
        _id: response.id,
        _rev: response.rev
      } as T & CouchDBDocument;
    } catch (error) {
      logger.error('Error creating document:', error);
      throw new Error('Failed to create document');
    }
  },

  // Read a document by ID
  async read<T>(id: string): Promise<T | null> {
    try {
      const doc = await db.get(id) as T & CouchDBDocument;
      if (!doc) return null;
      return {
        ...doc,
        id: doc._id
      } as T;
    } catch (error) {
      if ((error as any).statusCode === 404) {
        return null;
      }
      logger.error(`Error reading document ${id}:`, error);
      throw new Error('Failed to read document');
    }
  },

  // Update a document
  async update<T>(id: string, doc: Partial<T>): Promise<T> {
    try {
      const existing = await db.get(id);
      const updated = { ...existing, ...doc, updatedAt: new Date().toISOString() };
      const response = await db.insert(updated);
      return {
        ...updated,
        id: response.id
      } as T;
    } catch (error) {
      logger.error(`Error updating document ${id}:`, error);
      throw new Error('Failed to update document');
    }
  },

  // Delete a document
  async delete(id: string): Promise<boolean> {
    try {
      const doc = await db.get(id);
      await db.destroy(id, (doc as any)._rev);
      return true;
    } catch (error) {
      logger.error(`Error deleting document ${id}:`, error);
      throw new Error('Failed to delete document');
    }
  },

  // Find documents using Mango query
  async find<T>(query: any): Promise<T[]> {
    try {
      const { docs } = await db.find(query);
      return docs.map(doc => ({
        ...doc,
        id: doc._id
      })) as T[];
    } catch (error) {
      logger.error('Error finding documents:', error);
      throw new Error('Failed to find documents');
    }
  },

  // List documents with pagination
  async list<T>(options: { limit?: number; skip?: number; startkey?: string; endkey?: string } = {}): Promise<T[]> {
    try {
      const response = await db.list(options);
      return response.rows.map(row => ({
        ...row.value,
        id: row.id
      })) as T[];
    } catch (error) {
      logger.error('Error listing documents:', error);
      throw new Error('Failed to list documents');
    }
  }
};

// Design documents for views
const designDocs = {
  classrooms: {
    _id: '_design/classrooms',
    views: {
      by_instructor: {
        map: `function(doc) {
          if (doc.type === 'classroom') {
            emit(doc.instructor.id, doc);
          }
        }`,
        reduce: '_count'
      },
      by_topic: {
        map: `function(doc) {
          if (doc.type === 'classroom' && Array.isArray(doc.topics)) {
            doc.topics.forEach(function(topic) {
              emit(topic, doc);
            });
          }
        }`,
        reduce: '_count'
      }
    }
  },
  communities: {
    _id: '_design/communities',
    views: {
      by_topic: {
        map: `function(doc) {
          if (doc.type === 'community' && Array.isArray(doc.topics)) {
            doc.topics.forEach(function(topic) {
              emit(topic, doc);
            });
          }
        }`,
        reduce: '_count'
      }
    }
  },
  posts: {
    _id: '_design/posts',
    views: {
      by_tag: {
        map: `function(doc) {
          if (doc.type === 'post' && Array.isArray(doc.tags)) {
            doc.tags.forEach(function(tag) {
              emit(tag, doc);
            });
          }
        }`,
        reduce: '_count'
      },
      by_author: {
        map: `function(doc) {
          if (doc.type === 'post') {
            emit(doc.author.id, doc);
          }
        }`,
        reduce: '_count'
      }
    }
  }
};

// Initialize database
export const initializeDatabase = async (): Promise<void> => {
  try {
    // Create database if it doesn't exist
    try {
      await couchdb.db.create(config.couchdb.dbName);
      logger.info(`Database ${config.couchdb.dbName} created`);
    } catch (error) {
      if ((error as any).statusCode !== 412) { // 412 means DB already exists
        throw error;
      }
    }

    // Create or update design documents
    for (const [name, ddoc] of Object.entries(designDocs)) {
      try {
        const existing = await db.get(ddoc._id);
        await db.insert({ ...existing, ...ddoc });
      } catch (error) {
        if ((error as any).statusCode === 404) {
          await db.insert(ddoc);
        } else {
          throw error;
        }
      }
    }

    logger.info('Database initialization completed');
  } catch (error) {
    logger.error('Error initializing database:', error);
    throw new Error('Failed to initialize database');
  }
};

export default DatabaseService;