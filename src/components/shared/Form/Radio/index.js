import React from 'react';
import PropTypes from 'prop-types';

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  FormHelperText,
  Stack,
} from '@mui/material';

function RadioComponent({
  label,
  options,
  labelPlacement,
  color,
  onChange,
  onClick,
  helperText,
  error,
  labelProps,
  fullWidth,
  row,
  direction,
  ...props
}) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <Box mt={2}>
      <FormControl component="fieldset">
        <Box mb={1}>
          <FormLabel>{label}</FormLabel>
        </Box>
        <RadioGroup
          aria-label="gender"
          onChange={handleChange}
          {...props}
          // row={row}
          sx={{ width: '100%', flexDirection: 'row' }}
        >
          {Array.isArray(options) && options.length > 0 && (
            <>
              {options.map((option, index) => (
                <>
                  <FormControlLabel
                    key={`${props.id}-${index}`}
                    value={option.value}
                    control={<Radio onClick={() => onClick(option)} color={color} />}
                    label={option.label}
                    labelPlacement={labelPlacement}
                    disabled={option?.disabled || false}
                    sx={labelProps}
                  />
                  <Stack direction="row" spacing={2} alignItems="center">
                    {option?.tip && option?.tip !== '' && (
                      <Box ml={2} mt={-1}>
                        <FormHelperText key={`${props.id}-${index}-tip`}>
                          {option.tip}
                        </FormHelperText>
                      </Box>
                    )}
                    {option?.action && option.action}
                  </Stack>
                </>
              ))}
            </>
          )}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

RadioComponent.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  labelPlacement: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  color: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['medium', 'small']),
  labelProps: PropTypes.any,
  row: PropTypes.bool,
  direction: PropTypes.bool,
};

RadioComponent.defaultProps = {
  className: undefined,
  label: undefined,
  labelPlacement: 'end',
  options: () => [],
  onChange: () => {},
  onClick: () => {},
  variant: 'standard',
  color: 'secondary',
  size: 'medium',
  labelProps: {},
  row: false,
  direction: 'row',
};
export default RadioComponent;
