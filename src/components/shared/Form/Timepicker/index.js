import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControl, TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.string,
  filter: PropTypes.instanceOf(RegExp),
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
  loading: PropTypes.bool,
  format: PropTypes.string,
  autoOk: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
};
//
const defaultProps = {
  className: undefined,
  value: undefined,
  icon: undefined,
  filter: undefined,
  onChange: () => {},
  variant: 'outlined',
  loading: false,
  format: 'MM/dd/yyyy',
  autoOk: true,
  disabled: false,
  fullWidth: false,
  disabled: false,
};

const AppTimePicker = ({ value, variant, label, onChange, props, fullWidth, size, disabled }) => {
  const [inputValue, setInputValue] = useState(null);

  useEffect(() => {
    if (value) {
      setInputValue(moment(moment().format('yyyy-MM-DD') + ' ' + value));
    }
  }, [value]);

  const handleChange = (value) => {
    onChange(dayjs(value).format('HH:mm'));
  };
  const handleDateChange = (event) => {
    event.persist();
    onChange(event.target.value, null);
  };

  return (
    <FormControl fullWidth={fullWidth} margin="normal">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          {...props}
          type="time"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300,
            placeholder: "hh:mm"
          }}
          disabled={disabled}
          format={null}
          variant={variant}
          label={label}
          value={inputValue}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField {...params} size={size} fullWidth />
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

AppTimePicker.propTypes = propTypes;
AppTimePicker.defaultProps = defaultProps;

export default AppTimePicker;
