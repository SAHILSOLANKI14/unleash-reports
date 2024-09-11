import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  Typography,
  FormGroup,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';

const CheckboxInput = forwardRef(
  (
    {
      checked,
      className,
      label,
      onChange,
      variant,
      color,
      size,
      value,
      helperText,
      error,
      textColor,
      ...props
    },
    ref,
  ) => {
    return (
      <React.Fragment>
        {label && label !== '' ? (
          <FormControl error={error}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    classes={className}
                    className={className}
                    variant={variant}
                    color={color}
                    size={size}
                    checked={value || false}
                    onChange={(e) => {
                      onChange(e.target.checked, e);
                    }}
                    {...props}
                  />
                }
                label={
                  <Typography color={textColor || 'textPrimary'} variant="body1">
                    {label}
                  </Typography>
                }
              />
            </FormGroup>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        ) : (
          <Checkbox
            classes={className}
            variant={variant}
            color={color}
            size={size}
            checked={value || false}
            onChange={(e) => {
              onChange(e.target.checked, e);
            }}
            {...props}
          />
        )}
      </React.Fragment>
    );
  },
);

CheckboxInput.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  color: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['medium', 'small']),
};

CheckboxInput.defaultProps = {
  checked: false,
  className: undefined,
  label: undefined,
  onChange: () => {},
  variant: 'standard',
  color: 'primary',
  size: 'medium',
};

export default CheckboxInput;
