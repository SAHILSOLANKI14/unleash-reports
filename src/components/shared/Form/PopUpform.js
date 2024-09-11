import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Form from '../Form/Form';

const PopupForm = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogContent>
        <Form />
      </DialogContent>
    </Dialog>
  );
};

export default PopupForm;
