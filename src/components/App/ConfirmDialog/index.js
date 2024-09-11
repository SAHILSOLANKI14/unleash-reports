import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import Button from '../../shared/Button';
import CloseIcon from '@mui/icons-material/Close';

const propTypes = {
  buttonTitle: PropTypes.string,
  buttonProps: PropTypes.any,
  title: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onConfirm: PropTypes.func,
  cancelButtonVariant: PropTypes.string,
  showCancelButton: PropTypes.boolean,
  confirmButtonVariant: PropTypes.string,
};

const defaultProps = {
  buttonTitle: 'Confirm',
  buttonProps: {},
  cancelButtonColor: 'primary',
  confirmButtonColor: 'secondary',
  cancelButtonVariant: 'text',
  confirmButtonVariant: 'text',
  title: '',
  open: false,
  showCancelButton: true,
  setOpen: () => {},
  onConfirm: () => {},
};

const ConfirmDialog = (props) => {
  const {
    title,
    children,
    open,
    onClose,
    onConfirm,
    buttonTitle,
    loading,
    cancelButtonColor,
    showCancelButton,
    confirmButtonColor,
    cancelButtonVariant,
    confirmButtonVariant,
  } = props;
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': { width: '450px' },
        '& #confirm-dialog': { borderBottom: '1px solid #00000027' },
        '& .MuiDialogContent-root': { padding: '20px 24px !important' },
      }}
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h2" component="span" color="textPrimary">
            {title}
          </Typography>
          <Button iconButton onClick={onClose} sx={{ padding: 0 }}>
            <CloseIcon />
          </Button>
        </Stack>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {showCancelButton && (
          <Button
            disabled={loading}
            variant={cancelButtonVariant}
            color={cancelButtonColor}
            onClick={onClose}
          >
            Cancel
          </Button>
        )}
        <Button
          variant={confirmButtonVariant}
          onClick={() => {
            onConfirm();
          }}
          color={confirmButtonColor}
          loading={loading}
          {...props.buttonProps}
        >
          {buttonTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = propTypes;
ConfirmDialog.defaultProps = defaultProps;

export default ConfirmDialog;
