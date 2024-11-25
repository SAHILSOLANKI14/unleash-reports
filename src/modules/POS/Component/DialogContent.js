import { Dialog, DialogTitle } from '@mui/material';
import React from 'react';

const DialogContent = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      maxWidth="sm"
      fullWidth
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Supplier Products</DialogTitle>
      <DialogContent dividers></DialogContent>
    </Dialog>
  );
};

export default DialogContent;
