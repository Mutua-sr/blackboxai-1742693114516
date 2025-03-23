import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import MainLayout from './components/layout/MainLayout';

// Pages
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Communities from './pages/Communities';
import Classrooms from './pages/Classrooms';
import ChatRoom from './pages/ChatRoom';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MainLayout>
          <Routes>
            {/* Redirect root to feed */}
            <Route path="/" element={<Navigate to="/feed" replace />} />
            
            {/* Main routes */}
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/classrooms" element={<Classrooms />} />
            
            {/* Chat routes */}
            <Route path="/communities/:id" element={<ChatRoom type="community" />} />
            <Route path="/classrooms/:id" element={<ChatRoom type="classroom" />} />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/feed" replace />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
