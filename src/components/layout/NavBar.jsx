import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Sidebar from './SideBar';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div>
      <AppBar
        position="static"
        style={{ backgroundColor: '#fff', color: '#333' }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, color: '#000' }}>
            WaveTrack
          </Typography>
          <IconButton color="inherit">
            <AccountCircleIcon style={{ color: '#000' }} />
            <Typography variant="body1" style={{ marginLeft: 8 }}>
              Christaino Ronaldo
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default Navbar;
