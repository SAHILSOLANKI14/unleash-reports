import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AvatarImg from 'src/assets/images/user-3296.svg';
import Link from '@mui/material/Link';

const AccountMenu = () => {
  const [avatarEl, setAvatarEl] = useState(null);

  const handleAvatarClick = (e) => {
    setAvatarEl(e.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarEl(null);
  };

  const open = Boolean(avatarEl);

  return (
    <div>
      <Button aria-describedby="accountMenu" onClick={handleAvatarClick}>
        <Avatar alt="Remy Sharp" src={AvatarImg}/>
        <KeyboardArrowDownIcon />
      </Button>

      <Popover
        id="accountMenu"
        open={open}
        anchorEl={avatarEl}
        onClose={handleAvatarClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton>
              <Link underline="none" color="inherit" href="/myaccount">
                <ListItemText primary="My Account" />
              </Link>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <Link underline="none" color="inherit" href="/settings">
                <ListItemText primary="Settings" />
              </Link>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <Link underline="none" color="inherit" href="/auth/login">
                <ListItemText primary="Login" />
              </Link>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
};

export default AccountMenu;
