import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const ButtonLoader = ({ loading }) => {
  if (!loading) return null;
  return <CircularProgress color="inherit" size={20} />;
};

const ButtonComponent = forwardRef(
  (
    { sx, className, variant, size, fullWidth, disabled, color, iconButton, loading, ...props },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <React.Fragment>
        {iconButton ? (
          <IconButton
            className={className}
            disabled={isDisabled}
            color={color}
            onClick={() => {
              props.onClick();
            }}
            size={size}
            {...props}
          >
            {loading ? (
              <ButtonLoader loading={loading} />
            ) : (
              <React.Fragment>{props.children}</React.Fragment>
            )}
          </IconButton>
        ) : (
          <Button
            sx={{
              ...sx,
            }}
            className={className}
            variant={variant}
            fullWidth={fullWidth}
            size={size}
            disabled={isDisabled}
            color={color}
            disableElevation
            {...props}
            endIcon={loading ? <ButtonLoader loading={loading} /> : props?.endIcon}
          >
            <React.Fragment>{props.children}</React.Fragment>
          </Button>
        )}
      </React.Fragment>
    );
  },
);

ButtonComponent.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  iconButton: PropTypes.bool,
  loading: PropTypes.bool,
};

ButtonComponent.defaultTypes = {
  className: undefined,
  variant: 'contained',
  size: 'medium',
  fullWidth: false,
  disabled: false,
  color: 'default',
  iconButton: false,
  loading: false,
};

export default ButtonComponent;
