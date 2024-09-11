import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { IMaskInput } from 'react-imask';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

import TextField from '@mui/material/TextField';
import { IconButton, ButtonBase } from '@mui/material';
import { InputAdornment, CircularProgress } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.string,
  filter: PropTypes.instanceOf(RegExp),
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  loading: PropTypes.bool,
  showCounter: PropTypes.bool,
  InputProps: PropTypes.any,
};

const defaultProps = {
  className: undefined,
  value: undefined,
  icon: undefined,
  filter: undefined,
  onChange: () => {},
  variant: 'standard',
  loading: false,
  showCounter: false,
  InputProps: {},
};

const NumericFormatCustom = React.forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator=","
      valueIsNumericString
      // prefix="$"
    />
  );
});

const NumberInput = forwardRef(
  (
    {
      icon,
      className,
      filter,
      onChange,
      variant,
      helperText,
      error,
      id,
      loading,
      type,
      InputProps,
      disabled,
      value,
      showCounter,
      startAdornment,
      endAdornment,
      ...props
    },
    ref,
  ) => {
    const handleChange = (value) => {
      if (!filter || filter.test(value)) {
        onChange(parseInt(value), null);
      }
    };

    const inputProps = {
      startAdornment: (
        <InputAdornment position="end">
          <IconButton
            onClick={() => {
              if (value >= 1) {
                handleChange(value - 1);
              }
            }}
            disabled={disabled}
            size="large"
          >
            <RemoveIcon size={20} />
          </IconButton>
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            onClick={() => {
              handleChange(value + 1);
            }}
            disabled={disabled}
            size="large"
          >
            <AddIcon size={20} />
          </IconButton>
        </InputAdornment>
      ),
    };

    if (showCounter === true) {
      return (
        <TextField
          className={className}
          type="number"
          onChange={(event) => {
            handleChange(event.target.value);
          }}
          ref={ref}
          variant={variant}
          helperText={helperText}
          error={error}
          id={id}
          InputProps={{
            ...inputProps,
            ...props.InputProps,
            disableUnderline: true,
          }}
          disabled={loading || disabled}
          value={value}
          {...props}
        />
      );
    }

    return (
      <TextField
        className={`${className} MuiNumberInput`}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
        // ref={ref}
        variant={variant}
        helperText={helperText}
        error={error}
        id={id}
        InputProps={{
          inputComponent: NumericFormatCustom,
          startAdornment: (
            <InputAdornment position="end">{startAdornment ? startAdornment : null}</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">{endAdornment ? endAdornment : null}</InputAdornment>
          ),
        }}
        disabled={loading || disabled}
        value={value}
        {...props}
      />
    );
  },
);

NumberInput.propTypes = propTypes;
NumberInput.defaultProps = defaultProps;

export default NumberInput;
