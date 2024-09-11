import React from 'react';
import { useState } from 'react';
import { appointments } from '../../../mock/appointments';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
// import DeleteIcon from '@mui/icons-material/Delete';

const PopupAction = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [open, setOpen] = useState(null);

  const handleEditClick = () => {
    setIsEditOpen(true);
  };
  const handleallclose = () => {
    setIsEditOpen(false);
    setOpen(null);
  };
  const handleActionMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  appointments.map((item, index) => {
    return (item.index = index + 1);
  });
  return (
    <>
      <IconButton onClick={handleActionMenu}>
        <MoreVertIcon />
      </IconButton>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleEditClick}>
          <Stack spacing={1} direction="row" onClick={handleEditClick}>
            <EditIcon />
            <span>Edit</span>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Stack spacing={1} direction="row">
            <DeleteIcon />
            <span>Delete</span>
          </Stack>
        </MenuItem>
      </Popover>
    </>
  );
};

export default PopupAction;
