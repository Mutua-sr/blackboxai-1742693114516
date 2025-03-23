import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import {
  Forum as FeedIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';
import { bottomNavStyles as styles } from '../../styles/layout/BottomNav.styles';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  React.useEffect(() => {
    setValue(location.pathname);
  }, [location]);

  return (
    <Paper sx={styles.container} elevation={3}>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        sx={styles.navigation}
      >
        <BottomNavigationAction
          label="Feed"
          value="/"
          icon={<FeedIcon />}
        />
        <BottomNavigationAction
          label="Communities"
          value="/communities"
          icon={<GroupIcon />}
        />
        <BottomNavigationAction
          label="Classes"
          value="/classrooms"
          icon={<SchoolIcon />}
        />
        <BottomNavigationAction
          label="Profile"
          value="/profile"
          icon={<ProfileIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;