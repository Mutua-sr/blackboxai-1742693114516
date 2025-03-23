import React, { useState } from 'react';
import { 
  Box,
  Paper,
  TextField,
  Button,
  IconButton,
  Stack,
  Avatar
} from '@mui/material';
import {
  Image as ImageIcon,
  VideoLibrary as VideoIcon,
  Link as LinkIcon
} from '@mui/icons-material';

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement post creation
    console.log('Creating post:', content);
    setContent('');
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Avatar 
            src="https://ui-avatars.com/api/?name=John+Doe&background=random"
            alt="User avatar"
          />
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Share your thoughts or ask a question..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="outlined"
          />
        </Box>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ borderTop: 1, borderColor: 'divider', pt: 2 }}
        >
          <Stack direction="row" spacing={1}>
            <IconButton color="primary" size="small">
              <ImageIcon />
            </IconButton>
            <IconButton color="primary" size="small">
              <VideoIcon />
            </IconButton>
            <IconButton color="primary" size="small">
              <LinkIcon />
            </IconButton>
          </Stack>

          <Button 
            variant="contained" 
            color="primary"
            type="submit"
            disabled={!content.trim()}
          >
            Post
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default CreatePost;