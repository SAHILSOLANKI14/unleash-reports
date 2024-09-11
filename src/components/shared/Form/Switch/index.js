import React from 'react';
import PropTypes from 'prop-types';

import {
  Switch,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  FormHelperText,
} from '@mui/material';

function SwitchComponent({
  label,
  labelPlacement,
  color,
  onChange,
  error,
  value,
  helperText,
  sx,
  ...props
}) {
  const handleChange = (event) => {
    onChange(!value);
  };

  return (
    <Box mt={2} sx={sx}>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value={value}
            control={<Switch color={color} checked={value} onChange={handleChange} />}
            label={label}
            labelPlacement={labelPlacement}
            {...props}
          />
          {helperText && helperText !== '' ? <FormHelperText>{helperText}</FormHelperText> : null}
        </FormGroup>
      </FormControl>
    </Box>
  );
}

SwitchComponent.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  labelPlacement: PropTypes.string,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'error']),
  size: PropTypes.oneOf(['medium', 'small']),
  disabled: PropTypes.bool,
  sx: PropTypes.object,
};

SwitchComponent.defaultProps = {
  className: undefined,
  label: undefined,
  labelPlacement: 'end',
  onChange: () => {},
  variant: 'standard',
  color: 'primary',
  size: 'medium',
  disabled: false,
  sx: {},
};
export default SwitchComponent;
