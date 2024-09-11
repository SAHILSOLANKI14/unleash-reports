import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
  styled,
  useTheme,
  Divider,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Spacer from '../Spacer';

const AppModal = ({
  open,
  title,
  subtitle,
  fullWidth,
  size,
  onClose,
  fullScreen,
  padding,
  customActions,
  variant = 'standard',
  renderActions = () => {},
  ...props
}) => {
  const { palette } = useTheme();
  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={size}
        open={open}
        onClose={onClose}
        fullScreen={fullScreen}
        PaperProps={{
          sx: {
            overflow: 'visible!important',
            backgroundImage: 'none',
            ...(palette.mode === 'dark' && {
              background: palette.background.default,
            }),
          },
        }}
        {...props}
      >
        {variant === 'success' ? (
          <SuccessDialogTitle>
            <svg
              width={76}
              height={76}
              viewBox="0 0 76 76"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx={38} cy={38} r={38} fill="#00BFA5" />
              <path d="M17 44.5L22 38L33 46.5L51.5 20L58.5 25L35 58.5L17 44.5Z" fill="white" />
            </svg>
            <Typography fontSize={25} fontWeight="bolder" mt={3} mb={0} align="center">
              {title}
            </Typography>
          </SuccessDialogTitle>
        ) : (
          <>
            <DialogTitle id="max-width-dialog-title">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  {title ? <Typography variant="h2">{title}</Typography> : null}
                  <Spacer x={0.5} y={0.5} />
                  {subtitle ? (
                    <Typography variant="body2" color="textSecondary">
                      {subtitle}
                    </Typography>
                  ) : null}
                </Box>
                {customActions && typeof customActions !== 'undefined' ? (
                  <>{customActions()}</>
                ) : (
                  <ButtonBase onClick={onClose}>
                    <CloseIcon />
                  </ButtonBase>
                )}
              </Box>
            </DialogTitle>
            {/* {palette.mode === 'dark' && <Divider />} */}
          </>
        )}

        {!fullScreen && padding === true ? (
          <DialogContent
            sx={{
              '&::-webkit-scrollbar': {
                width: 4,
              },
              '&::-webkit-scrollbar-track': {
                borderRadius: 4,
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: palette.mode === 'light' ? '#dddddd' : '#1B3C59',
                borderRadius: 6,
              },
            }}
          >
            {props.children}
          </DialogContent>
        ) : (
          props.children
        )}

        {/* {props.children} */}
        <DialogActions>{renderActions()}</DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export const SuccessDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: 0,
  marginBottom: theme.spacing(1),
  padding: theme.spacing(0, 3),
  svg: {
    fill: theme.palette.grey[400],
    marginTop: -30,
    zIndex: theme.zIndex.modal,
  },
  flexDirection: 'column',
}));

AppModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  fullScreen: PropTypes.bool,
  padding: PropTypes.bool,
  customActions: PropTypes.any,
  variant: PropTypes.oneOf(['standard', 'success', 'error']),
};

AppModal.defaultProps = {
  open: false,
  onClose: () => {},
  title: '',
  subtitle: '',
  fullWidth: true,
  size: 'sm',
  fullScreen: false,
  padding: true,
  customActions: undefined,
  variant: 'standard',
};

export default AppModal;
