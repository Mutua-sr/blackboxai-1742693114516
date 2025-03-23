import React from 'react';
import { useParams } from 'react-router-dom';

interface ChatRoomProps {
  type: 'direct' | 'group';
}

const ChatRoom: React.FC<ChatRoomProps> = ({ type }) => {
  const { roomId } = useParams();

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-semibold">
          {type === 'direct' ? 'Direct Message' : 'Group Chat'}
        </h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {/* Chat messages will go here */}
      </div>

      <div className="bg-white p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;