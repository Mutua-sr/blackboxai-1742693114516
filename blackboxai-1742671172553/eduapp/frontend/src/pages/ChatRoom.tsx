import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Drawer, useTheme, useMediaQuery, IconButton } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import ChatInterface from '../components/chat/ChatInterface';
import VideoCall from '../components/video/VideoCall';

interface ChatRoomProps {
  type: 'community' | 'classroom';
}

const ChatRoom: React.FC<ChatRoomProps> = ({ type }) => {
  const { id } = useParams<{ id: string }>();
  // Use id for future API calls and room identification
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(!isVideoActive);

  // Mock participants for video call
  const participants = [
    {
      id: '1',
      name: 'You',
      avatar: 'https://source.unsplash.com/random/200x200/?person=1',
      isSpeaking: true,
      isVideoOn: true,
      isAudioOn: true,
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://source.unsplash.com/random/200x200/?person=2',
      isSpeaking: false,
      isVideoOn: true,
      isAudioOn: false,
    },
    {
      id: '3',
      name: 'John Doe',
      avatar: 'https://source.unsplash.com/random/200x200/?person=3',
      isSpeaking: false,
      isVideoOn: true,
      isAudioOn: true,
    },
  ];

  const handleStartVideoCall = () => {
    setIsVideoActive(true);
    if (isMobile) {
      setIsChatOpen(false);
    }
  };

  const handleEndVideoCall = () => {
    setIsVideoActive(false);
    setIsChatOpen(true);
  };

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleBack = () => {
    navigate(type === 'community' ? '/communities' : '/classrooms');
  };

  // Get room details based on type and id
  const getRoomDetails = () => {
    if (type === 'classroom') {
      return {
        title: 'Data Structures & Algorithms',
        subtitle: 'Dr. Sarah Johnson • 25 students',
        avatar: 'https://source.unsplash.com/random/200x200/?algorithm',
      };
    } else {
      return {
        title: 'Computer Science Hub',
        subtitle: '150 members',
        avatar: 'https://source.unsplash.com/random/200x200/?computer',
      };
    }
  };

  const roomDetails = getRoomDetails();

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex',
      bgcolor: isVideoActive ? 'grey.900' : 'background.default',
      position: 'relative'
    }}>
      {isMobile && (
        <IconButton
          onClick={handleBack}
          sx={{
            position: 'absolute',
            top: theme.spacing(1),
            left: theme.spacing(1),
            zIndex: 1200,
            color: isVideoActive ? 'white' : 'inherit',
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}

      {/* Video Call Section */}
      {isVideoActive && (
        <Box sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <VideoCall
            participants={participants}
            onEndCall={handleEndVideoCall}
            onToggleChat={handleToggleChat}
          />
        </Box>
      )}
      
      {/* Chat Section */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor={isMobile ? 'right' : 'right'}
        open={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        sx={{
          width: isVideoActive ? { xs: '100%', sm: '400px' } : '100%',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isVideoActive ? { xs: '100%', sm: '400px' } : '100%',
            boxSizing: 'border-box',
          },
        }}
      >
        <ChatInterface
          title={roomDetails.title}
          subtitle={roomDetails.subtitle}
          avatar={roomDetails.avatar}
          isLive={isVideoActive}
          onStartVideoCall={handleStartVideoCall}
          onStartVoiceCall={() => console.log('Voice call started')}
        />
      </Drawer>
    </Box>
  );
};

export default ChatRoom;