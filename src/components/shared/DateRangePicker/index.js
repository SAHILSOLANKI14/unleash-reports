import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { DateRangePicker } from 'mui-daterange-picker';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
      dark: '#1565C0',
      light: '#3686D6',
    },
  },
});

const DateRangePickerApp = ({ open, toggle, onChange, initialDateRange, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <DateRangePicker
        open={open}
        toggle={toggle}
        onChange={onChange}
        wrapperClassName="mui-date-range-picker"
        initialDateRange={initialDateRange}
        {...props}
      />
    </ThemeProvider>
  );
};

DateRangePickerApp.propTypes = {
  open: PropTypes.bool,
  onChange: PropTypes.func,
  toggle: PropTypes.func,
  initialDateRange: PropTypes.any,
};

DateRangePickerApp.defaultTypes = {
  open: false,
  onChange: () => {},
  toggle: () => {},
  initialDateRange: {},
};

export default DateRangePickerApp;
