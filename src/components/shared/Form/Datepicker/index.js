import React from 'react';
import PropTypes from 'prop-types';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, StaticDatePicker } from '@mui/x-date-pickers'; //
import { FormControl, TextField } from '@mui/material';
import moment from 'moment';
const propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
  icon: PropTypes.string,
  filter: PropTypes.instanceOf(RegExp),
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['static', 'inline', 'dialog']),
  inputVariant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
  loading: PropTypes.bool,
  format: PropTypes.string,
  autoOk: PropTypes.bool,
  disabled: PropTypes.bool,
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  size: PropTypes.string,
  isStatic: PropTypes.bool,
  sx: PropTypes.any,
  margin: PropTypes.any,
  color: PropTypes.string,
};

const defaultProps = {
  className: undefined,
  value: undefined,
  icon: undefined,
  filter: undefined,
  onChange: () => {},
  variant: 'inline',
  inputVariant: 'outlined',
  loading: false,
  // format: 'MM/dd/yyyy',
  format: 'dd/MM/yyyy',
  autoOk: true,
  disabled: false,
  disablePast: false,
  disableFuture: false,
  size: 'medium',
  isStatic: false,
  sx: () => {},
  margin: 'normal',
  color: 'secondary',
};

const Datepicker = ({
  value,
  variant,
  inputVariant,
  format,
  label,
  onChange,
  autoOk,
  disabled,
  disablePast,
  disableFuture,
  fullWidth,
  size,
  isStatic,
  color,
  sx,
  margin,
  InputProps,
  error,
  ...props
}) => {
  const handleDateChange = (value) => {
    onChange(value);
  };

  return (
    <FormControl fullWidth={fullWidth} margin={margin}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {isStatic ? (
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            openTo="day"
            variant={variant}
            label={label}
            value={value}
            disabled={disabled}
            disablePast={disablePast}
            disableFuture={disableFuture}
            onChange={handleDateChange}
            format={format}
            sx={sx}
            renderInput={(inputProps) => (
              <TextField
                {...inputProps}
                {...props}
                {...InputProps}
                sx={sx}
                size={size}
                variant={inputVariant}
                helperText={props?.helperText || null}
                error={error}
                color={color}
              />
            )}
          />
        ) : (
          <DatePicker
            {...props}
            autoOk={autoOk}
            disableToolbar
            variant={variant}
            fullWidth
            inputVariant={inputVariant}
            format={format}
            inputFormat={format}
            margin={margin}
            id="date-picker-inline"
            label={label}
            value={value}
            disabled={disabled}
            disablePast={disablePast}
            disableFuture={disableFuture}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            sx={sx}
            renderInput={(inputProps) => (
              <>
                <TextField
                  color={color}
                  {...props}
                  {...inputProps}
                  InputProps={{
                    ...inputProps.InputProps,
                    ...InputProps,
                  }}
                  sx={sx}
                  size={size}
                  helperText={props?.helperText || null}
                  error={error}
                  variant={inputVariant}
                />
              </>
            )}
          />
        )}
      </LocalizationProvider>
    </FormControl>
  );
};

Datepicker.propTypes = propTypes;
Datepicker.defaultProps = defaultProps;

export default Datepicker;
