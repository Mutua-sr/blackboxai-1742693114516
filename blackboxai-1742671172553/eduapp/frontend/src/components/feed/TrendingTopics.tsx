import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import {
  TrendingUp as TrendingIcon,
  Tag as TagIcon,
} from '@mui/icons-material';

interface TrendingTopic {
  tag: string;
  count: number;
  trending: boolean;
}

interface TrendingTopicsProps {
  topics: TrendingTopic[];
  onTopicClick: (tag: string) => void;
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ topics, onTopicClick }) => {
  return (
    <Card sx={{ borderRadius: 2, mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">Trending Topics</Typography>
        </Box>
        <List sx={{ p: 0 }}>
          {topics.map((topic) => (
            <ListItem
              key={topic.tag}
              sx={{
                px: 0,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
              onClick={() => onTopicClick(topic.tag)}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <TagIcon color="action" fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={topic.tag}
                secondary={`${topic.count} posts`}
              />
              {topic.trending && (
                <Chip
                  label="Trending"
                  size="small"
                  color="primary"
                  sx={{ ml: 1 }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;