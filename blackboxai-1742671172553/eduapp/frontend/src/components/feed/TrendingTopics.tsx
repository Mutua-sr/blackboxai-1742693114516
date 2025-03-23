import React from 'react';
import { 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Chip
} from '@mui/material';
import { TrendingUp as TrendingIcon } from '@mui/icons-material';

interface TrendingTopic {
  tag: string;
  count: number;
  category: string;
}

const trendingTopics: TrendingTopic[] = [
  { tag: 'React', count: 1234, category: 'Web Development' },
  { tag: 'MachineLearning', count: 987, category: 'AI & Data Science' },
  { tag: 'Python', count: 856, category: 'Programming' },
  { tag: 'UIDesign', count: 743, category: 'Design' },
  { tag: 'JavaScript', count: 654, category: 'Web Development' }
];

const TrendingTopics: React.FC = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <TrendingIcon color="primary" />
        Trending Topics
      </Typography>

      <List>
        {trendingTopics.map((topic, index) => (
          <ListItem 
            key={topic.tag}
            sx={{ 
              px: 0,
              '&:hover': {
                backgroundColor: 'action.hover',
                cursor: 'pointer',
                borderRadius: 1
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Typography 
                color="text.secondary" 
                variant="body2"
                sx={{ fontWeight: 500 }}
              >
                {index + 1}
              </Typography>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  #{topic.tag}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="body2" color="text.secondary" component="span">
                    {topic.count} posts
                  </Typography>
                  <Chip
                    label={topic.category}
                    size="small"
                    sx={{ ml: 1 }}
                    color="primary"
                    variant="outlined"
                  />
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TrendingTopics;