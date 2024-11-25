// src/components/Breadcrumbs.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Breadcrumbs as MUIBreadcrumbs, Typography } from '@mui/material';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Mapping paths to user-friendly names
  const routeTitleMap = {
    '': '',
    products: 'Products',
    sales: 'Sales',
    purchases: 'Purchases',
    users: 'Users',
    'add-products': 'Add Product',
    'add-sales': 'Add Sales',
    'add-purchases': 'Add Purchases',
    customers: 'Customers',
    suppliers: 'Suppliers',
    settings: 'Settings',
    billing: 'Billing & Payments',
    myaccount: 'My Account',
    // Add more mappings as needed
  };

  return (
    <MUIBreadcrumbs
      aria-label="breadcrumb"
      separator={<span style={{ fontSize: '20px', color: '#2277f5' }}>›</span>}
      sx={{ padding: 1 }}
    >
      <Link to="/" style={{ textDecoration: 'none', color: '#2277f5', fontSize: '13px' }}>
        {routeTitleMap['']}
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        const title = routeTitleMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

        return isLast ? (
          <Typography
            color="text.primary"
            key={to}
            sx={{ textDecoration: 'none', color: '#2277f5', fontSize: '13px', mt: '3px' }}
          >
            {title}
          </Typography>
        ) : (
          <Link
            to={to}
            key={to}
            style={{ textDecoration: 'none', color: '#2277f5', fontSize: '13px' }}
          >
            {title}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
}

export default Breadcrumbs;
