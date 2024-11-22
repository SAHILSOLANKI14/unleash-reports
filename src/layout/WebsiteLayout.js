import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Header from '../modules/WebSite/Header/header';
import Footer from 'src/modules/WebSite/Footer/Footer';
import { useDispatch } from 'react-redux';
import { restoreSession } from 'src/modules/WebSite/Auth/Store/authslice';
import Breadcrumbs from 'src/components/shared/BreadCrumbs/Breadcrumb';
const WebsiteLayout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Breadcrumbs />
      <main>{children}</main>
      <Box sx={{ mt: 2 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default WebsiteLayout;
