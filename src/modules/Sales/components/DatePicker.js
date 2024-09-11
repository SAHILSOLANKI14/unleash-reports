import React from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

const Datepicker = ({ value, onChange }) => {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} />}
      inputFormat="MM/dd/yyyy"
    />
  );
};

export default Datepicker;
