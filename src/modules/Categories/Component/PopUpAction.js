import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import MmsIcon from '@mui/icons-material/Mms';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { makeStyles } from '@mui/styles';

// Define the styles
const useStyles = makeStyles((theme) => ({
  icon: {
    color: '#bcbdc1',
    fontSize: 'medium',
    transition: 'color 0.2s ease',
    textDecoration: 'none',
  },
  Mainicon: {
    color: '#bcbdc1',
    fontSize: 'medium',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '',
      color: '#1B84FF', // Change text color on hover
    },
  },
  menuItem: {
    color: 'black',
    fontSize: '12px',
    transition: 'color 0.2s ease, background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '',
      color: '#1B84FF', // Change text color on hover
      '& .MuiSvgIcon-root': {
        // Change icon color on hover
        color: '#1B84FF',
      },
    },
  },
}));

const SettingpopupAction = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(null);

  const handleActionMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton onClick={handleActionMenu}>
        <SettingsOutlinedIcon className={classes.Mainicon} />
      </IconButton>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 'auto' },
        }}
      >
        <MenuItem onClick={handleCloseMenu} className={classes.menuItem}>
          <Stack
            direction="row"
            sx={{
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            spacing={1}
          >
            <ListAltIcon className={classes.icon} />
            <span>Product Details</span>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} className={classes.menuItem}>
          <Stack
            direction="row"
            sx={{
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            spacing={1}
          >
            <EditIcon className={classes.icon} />
            <span>Edit Product</span>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} className={classes.menuItem}>
          <Stack
            direction="row"
            sx={{
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            spacing={1}
          >
            <EditIcon className={classes.icon} />
            <span>Duplicate Product</span>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} className={classes.menuItem}>
          <Stack
            direction="row"
            sx={{
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            spacing={1}
          >
            <MmsIcon className={classes.icon} />
            <span>View Image</span>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} className={classes.menuItem}>
          <Stack
            direction="row"
            sx={{
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            spacing={1}
          >
            <QrCode2RoundedIcon className={classes.icon} />
            <span>Print Barcode/Label</span>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} className={classes.menuItem}>
          <Stack
            direction="row"
            sx={{
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            spacing={1}
          >
            <DeleteIcon className={classes.icon} />
            <span>Delete Product</span>
          </Stack>
        </MenuItem>
      </Popover>
    </>
  );
};

export default SettingpopupAction;
