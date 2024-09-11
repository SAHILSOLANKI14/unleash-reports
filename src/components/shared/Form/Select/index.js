import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  ListItemIcon,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Box,
} from '@mui/material';

import { styled } from '@mui/system';

const propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  fullWidth: PropTypes.bool,
  optLabel: PropTypes.string,
  optValue: PropTypes.string,
  showNone: PropTypes.bool,
  color: PropTypes.string,
};

const defaultProps = {
  className: undefined,
  variant: 'standard',
  name: undefined,
  label: undefined,
  value: '',
  defaultValue: undefined,
  placeholder: 'Select',
  multiple: false,
  fullWidth: false,
  optLabel: 'label',
  optValue: 'value',
  showNone: true,
  sx: {},
  color: 'primary',
};

const InputSelect = ({
  className,
  variant,
  label,
  name,
  value,
  defaultValue,
  placeholder,
  options,
  onChange,
  multiple,
  fullWidth,
  helperText,
  margin,
  optLabel,
  optValue,
  showNone,
  color,
  tip,
  sx,
  ...props
}) => {
  const handleChange = (event) => {
    onChange(event.target.value, event);
  };

  const placeholderExist = typeof placeholder === 'string' && !!placeholder;

  return (
    <FormControl
      sx={{
        ...(placeholderExist
          ? {
              '& .MuiInputLabel-root': {
                background: 'white',
                padding: '0px 8px',
              },
              '& .MuiSelect-select:has(.notranslate) ~ input': {
                height: '100%',
                opacity: 1,
                padding: '0 18px',
                fontSize: '15px',
                border: 'none',

                '&::placeholder': {
                  color: '#c4c4c4',
                },
              },
            }
          : {}),
        ...sx,
      }}
      fullWidth={fullWidth}
      margin={margin}
      error={props.error}
    >
      <InputLabel {...(placeholderExist ? { shrink: true } : {})} id={`${props.id}-label`}>
        {label}
      </InputLabel>
      <Select
        labelId={`${props.id}-label`}
        {...(placeholderExist
          ? {
              placeholder: placeholder.endsWith('*') ? placeholder.slice(0, -1) : placeholder,
            }
          : {})}
        id={props.id}
        onChange={handleChange}
        variant={variant}
        name={name}
        label={label}
        defaultValue={value}
        value={value}
        {...props}
        color={color}
        multiple={multiple}
        placeholder={placeholder}
      >
        {/* {showNone && !multiple && <MenuItem value="">{placeholder || 'None'}</MenuItem>} */}
        {showNone && !multiple && <MenuItem value="">None</MenuItem>}

        {(() => {
          if (options && typeof options !== 'undefined' && options.length) {
            return options.map((option) => {
              return (
                <MenuItem
                  disabled={option?.disabled ? option?.disabled : false}
                  key={option[optValue]}
                  value={option[optValue]}
                >
                  {option?.icon ? (
                    <Box display="flex" alignItems="center">
                      <ListItemIcon sx={{ minWidth: '44px' }}>{option.icon}</ListItemIcon>
                      {option[optLabel]}
                    </Box>
                  ) : (
                    option[optLabel]
                  )}
                </MenuItem>
              );
            });
          }
        })()}
      </Select>

      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

InputSelect.propTypes = propTypes;
InputSelect.defaultProps = defaultProps;

export default InputSelect;
