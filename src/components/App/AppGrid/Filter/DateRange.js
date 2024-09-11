import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Menu, Box, ButtonGroup } from '@mui/material';
// import { DateRangePicker } from 'mui-daterange-picker';
import { DateRangePicker } from 'src/components/shared';
import moment from 'moment';
import { dateFormat } from 'src/config';
import { Button } from 'src/components/shared';
import { menuStyles, buttonStyles } from './styles';
import { getDifferenceBetweenDates } from 'src/utils/dateUtils';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';

function DateRangeFilter({ filter, value, onChange, type }) {
  const [fieldVal, setFieldVal] = useState(type === 'button' ? filter.title : '');
  const classes = menuStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const inputRef = useRef(null);

  useEffect(() => {
    if (value && value?.startDate && value?.endDate) {
      const startDate = moment(value?.startDate).format(dateFormat);
      const endDate = moment(value?.endDate).format(dateFormat);
      setFieldVal(`${startDate} ${startDate !== endDate ? 'to ' + endDate : ''}`);
    } else if (type === 'button') {
      setFieldVal(filter.title);
    } else {
      setFieldVal('');
    }
  }, [value]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFocus = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (value) => {
    onChange({
      startDate: moment(value.startDate).format('YYYY-MM-DD'),
      endDate: moment(value.endDate).format('YYYY-MM-DD'),
    });
    handleClose();
  };

  const onPrevClick = (event) => {
    const difference = getDifferenceBetweenDates(value.startDate, value.endDate);
    onChange({
      startDate: moment(value.startDate).subtract(difference, 'days').format('YYYY-MM-DD'),
      endDate: moment(value.startDate).format('YYYY-MM-DD'),
    });
    event.preventDefault();
  };

  const onNextClick = (event) => {
    const difference = getDifferenceBetweenDates(value.startDate, value.endDate);
    if (difference === 0) {
      onChange({
        startDate: moment(value.endDate).add(1, 'days').format('YYYY-MM-DD'),
        endDate: moment(value.endDate).add(1, 'days').format('YYYY-MM-DD'),
      });
    } else {
      onChange({
        startDate: moment(value.endDate).format('YYYY-MM-DD'),
        endDate: moment(value.endDate).add(difference, 'days').format('YYYY-MM-DD'),
      });
    }

    event.preventDefault();
  };

  return (
    <>
      <Box onClick={handleFocus} mt={1} mb={1}>
        {type === 'button' ? (
          <ButtonGroup>
            {fieldVal !== filter.title ? (
              <Button variant="contained" onClick={onPrevClick} sx={buttonStyles} color="secondary">
                <KeyboardArrowLeftIcon />
              </Button>
            ) : null}
            <Button variant="contained" onClick={handleFocus} sx={buttonStyles} color="secondary">
              {fieldVal}
            </Button>
            {fieldVal !== filter.title && (
              <Button
                title="Clear filter"
                variant="contained"
                sx={buttonStyles}
                color="secondary"
                onClick={() => {
                  onChange(undefined);
                }}
              >
                <CloseIcon sx={{ fontSize: '20px', fill: '#ff0000' }} />
              </Button>
            )}
            {fieldVal !== filter.title ? (
              <Button variant="contained" onClick={onNextClick} sx={buttonStyles} color="secondary">
                <KeyboardArrowRightIcon />
              </Button>
            ) : null}
          </ButtonGroup>
        ) : null}
        {type === 'input' ? (
          <TextField
            variant="standard"
            placeholder="Choose Date range"
            ref={inputRef}
            readOnly
            fullWidth={true}
            value={fieldVal}
            size="small"
          />
        ) : null}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.paper }}
      >
        <DateRangePicker
          open={open}
          toggle={handleClose}
          onChange={handleChange}
          wrapperClassName="mui-date-range-picker"
        />
      </Menu>
    </>
  );
}

DateRangeFilter.propTypes = {
  value: PropTypes.any,
  type: PropTypes.string,
};

DateRangeFilter.defaultProps = {
  value: () => {},
  type: 'input',
};

export default DateRangeFilter;
