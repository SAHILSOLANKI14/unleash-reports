import React from 'react';
import { Box } from '@mui/material';
import Header from '../modules/WebSite/Header/header';
import Footer from 'src/modules/WebSite/Footer/Footer';
const WebsiteLayout = ({ children }) => {
  return (
    <Box>
      <Header />
      <main>{children}</main>
      <Box sx={{ mt: 2 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default WebsiteLayout;
