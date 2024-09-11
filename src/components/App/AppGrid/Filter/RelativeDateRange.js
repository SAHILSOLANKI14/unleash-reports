import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Menu,
  Box,
  ButtonGroup,
  MenuItem,
  ListItemText,
  ListItem,
  ListItemButton,
  Grid,
} from '@mui/material';
// import { DateRangePickerAlt } from 'mui-daterange-picker';
import { DateRangePickerAlt } from 'src/components/shared';
import moment from 'moment';
import { dateFormat } from 'src/config';
import { Button } from 'src/components/shared';
import { menuStyles, buttonStyles } from './styles';
import { getDifferenceBetweenDates } from 'src/utils/dateUtils';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';

function DateRangeFilter({ filter, filters, value, onChange, type }) {
  const [fieldVal, setFieldVal] = useState(type === 'button' ? filter.title : '');
  const classes = menuStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showCustom, setShowCustom] = useState(false);
  const open = Boolean(anchorEl);
  const inputRef = useRef(null);

  const status = filters?.status || {};

  useEffect(() => {
    if (value && value?.id && value?.name) {
      setFieldVal(value?.name || '');
    } else if (value && value?.startDate && value?.endDate) {
      const startDate = moment(value?.startDate).format(dateFormat);
      const endDate = moment(value?.endDate).format(dateFormat);
      setFieldVal(`${startDate} ${startDate !== endDate ? 'to ' + endDate : ''}`);
    } else if (type === 'button') {
      setFieldVal(filter.title);
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
        // classes={{ paper: classes.paper }}
      >
        <Grid container>
          <Grid item xs={showCustom ? 3 : 12}>
            <ListItemButton onClick={() => onChange({ id: 'today', name: 'Today' })}>
              <ListItemText secondary="Today" />
            </ListItemButton>
            <ListItemButton onClick={() => onChange({ id: 'tomorrow', name: 'Tomorrow' })}>
              <ListItemText secondary="Tomorrow" />
            </ListItemButton>
            {status.id === 'completed' && (
              <>
                <ListItemButton onClick={() => onChange({ id: 'last7days', name: 'Last 7 days' })}>
                  <ListItemText secondary="Last 7 Days" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => onChange({ id: 'last10days', name: 'Last 10 days' })}
                >
                  <ListItemText secondary="Last 10 Days" />
                </ListItemButton>
              </>
            )}

            {status.id === 'due' && (
              <>
                <ListItemButton onClick={() => onChange({ id: 'next7days', name: 'Next 7 days' })}>
                  <ListItemText secondary="Next 7 Days" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => onChange({ id: 'next10days', name: 'Next 10 days' })}
                >
                  <ListItemText secondary="Next 10 Days" />
                </ListItemButton>
              </>
            )}

            <ListItemButton
              onClick={() => {
                setShowCustom(!showCustom);
              }}
            >
              <ListItemText secondary="Custom" />
            </ListItemButton>
          </Grid>
          {showCustom && (
            <Grid item xs={9}>
              <DateRangePickerAlt
                open={open}
                toggle={handleClose}
                onChange={handleChange}
                wrapperClassName="mui-date-range-picker"
              />
            </Grid>
          )}
        </Grid>
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
