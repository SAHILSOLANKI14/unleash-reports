import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { palette, drawerWidth } from 'src/config/theme';
import Content from './Content';

function Sidebar({ window, mobileOpen, handleDrawerTransitionEnd, handleDrawerClose }) {
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        // container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '100%',
            backgroundImage: 'none',
            backgroundColor: palette.primary.main,
          },
        }}
      >
        <Content />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            overflow: 'hidden',
            backgroundColor: palette.primary.main,
            borderRight: '1px groove',
          },
        }}
        open
      >
        <Content />
      </Drawer>
    </Box>
  );
}

export default Sidebar;
