import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Header from 'src/components/App/Header';
import Sidebar from 'src/components/App/Sidebar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import { drawerWidth } from 'src/config/theme';

function AppLayout({ children, ...props }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  console.log('props', props);
  // const { window } = props;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar
        window={window}
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          marginBottom: 4,
          marginTop: 1,
          maxWidth: '100vw',
        }}
      >
        <Box
          sx={{
            marginBottom: 2,
          }}
        >
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <Container maxWidth="xl">
              <Header />
            </Container>
          </Toolbar>
        </Box>
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </Box>
  );
}

export default AppLayout;
