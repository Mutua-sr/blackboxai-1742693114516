import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import mobileTheme from './theme/mobileTheme';
import MainLayout from './components/layout/MainLayout';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Classrooms from './pages/Classrooms';
import Communities from './pages/Communities';
import Profile from './pages/Profile';
import ChatRoom from './pages/ChatRoom';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={mobileTheme}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes with MainLayout */}
          <Route
            path="/feed"
            element={
              <MainLayout>
                <Feed />
              </MainLayout>
            }
          />
          <Route
            path="/classrooms"
            element={
              <MainLayout>
                <Classrooms />
              </MainLayout>
            }
          />
          <Route
            path="/communities"
            element={
              <MainLayout>
                <Communities />
              </MainLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <MainLayout>
                <Profile />
              </MainLayout>
            }
          />
          <Route
            path="/chat/:roomId"
            element={
              <MainLayout>
                <ChatRoom type="group" />
              </MainLayout>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
