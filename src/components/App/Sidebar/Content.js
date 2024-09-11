import React, { useState } from 'react';
import { Logo, Icon1 } from './styles';
import { menuItems } from 'src/config/menu';
import Item from './Item';
import ListItemText from '@mui/material/ListItemText';

import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';

function Content() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <Logo />
      <Stack direction="column" justifyContent="space-between" height="100%">
        <List component="nav">
          {menuItems.map((item, index) => (
            <Item item={item} key={`menu-item-${index}`} pathname={pathname} />
          ))}
        </List>
        <List>
          <ListItem>
            <ListItemText
              secondary={
                <Typography variant="body2" color="white" sx={{ opacity: 0.6 }}>
                  copyright 2024
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Stack>
    </>
  );
}

export default Content;
