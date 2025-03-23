import React from 'react';
import { Box, CssBaseline, ThemeProvider, useMediaQuery, useTheme } from '@mui/material';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import mobileTheme from '../../theme/mobileTheme';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={mobileTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: isMobile ? 1.5 : 3,
            pt: { xs: '64px', sm: '72px' }, // Adjusted top padding for navbar height
            pb: { xs: '80px', sm: '88px' }, // Adjusted bottom padding for bottom nav height
            backgroundColor: 'background.default',
            overflowY: 'auto',
            overflowX: 'hidden',
            '& > *': {
              maxWidth: '100%',
            },
          }}
        >
          {children}
        </Box>
        <BottomNav />
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;