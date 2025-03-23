import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
  TextField,
  Typography,
  Chip,
} from '@mui/material';
import {
  Close as CloseIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  Poll as PollIcon,
  Tag as TagIcon,
} from '@mui/icons-material';

import { CreatePostData, CreatePostProps } from '../../types/feed';

const CreatePost: React.FC<CreatePostProps> = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTagInput = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      const newTag = currentTag.startsWith('#') ? currentTag : `#${currentTag}`;
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string): void => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (): void => {
    const post: CreatePostData = {
      type: 'post',
      author: 'User', // TODO: Get from auth context
      avatar: 'U',    // TODO: Get from auth context
      title,
      content,
      tags,
    };
    onSubmit(post);
    setTitle('');
    setContent('');
    setTags([]);
    onClose();
  };

  const handleFileUpload = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Create Post</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            variant="outlined"
          />
          
          <TextField
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
            variant="outlined"
          />

          <Box>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Button
                startIcon={<ImageIcon />}
                variant="outlined"
                onClick={handleFileUpload}
              >
                Add Image
              </Button>
              <Button
                startIcon={<PdfIcon />}
                variant="outlined"
                onClick={handleFileUpload}
              >
                Add PDF
              </Button>
              <Button
                startIcon={<PollIcon />}
                variant="outlined"
              >
                Create Poll
              </Button>
            </Stack>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*,.pdf"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0) {
                  // Handle file upload logic here
                  console.log(e.target.files[0]);
                }
              }}
            />
          </Box>

          <Box>
            <TextField
              label="Add Tags"
              fullWidth
              value={currentTag}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentTag(e.target.value)}
              onKeyDown={handleTagInput}
              placeholder="Type tag and press Enter"
              InputProps={{
                startAdornment: <TagIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
            {tags.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {tags.map((tag: string) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleRemoveTag(tag)}
                      sx={{ mt: 1 }}
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!title.trim() || !content.trim()}
        >
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePost;