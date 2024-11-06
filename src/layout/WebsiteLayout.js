import React from 'react';
import { Box } from '@mui/material';
import Header from '../modules/WebSite/Header/header';
const WebsiteLayout = ({ children }) => {
  return (
    <Box>
      <Header />
      <main>{children}</main>
      <footer>
        <p>Website Footer</p>
      </footer>
    </Box>
  );
};

export default WebsiteLayout;
