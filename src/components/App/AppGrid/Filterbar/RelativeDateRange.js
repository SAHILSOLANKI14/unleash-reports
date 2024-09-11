import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Menu,
  Box,
  ButtonGroup,
  ListItemButton,
  Grid,
  Typography,
  useTheme,
  IconButton,
} from '@mui/material';
import { DateRangePickerAlt } from 'src/components/shared';
import moment from 'moment';
import { dateFormat } from 'src/config';
import { Button } from 'src/components/shared';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import { RoundedButton, RoundedButtonGroup } from './styles';
import { isEmpty } from 'lodash';

function DateRangeFilter({
  custom,
  customOptions,
  filter,
  filters,
  value,
  onChange,
  type,
  options,
  disabled,
}) {
  const [fieldVal, setFieldVal] = useState(type === 'button' ? filter.title : '');
  const [anchorEl, setAnchorEl] = useState(null);
  const [showCustom, setShowCustom] = useState(false);
  const open = Boolean(anchorEl);
  const inputRef = useRef(null);

  const { palette } = useTheme();

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

  const isSelected = value && !isEmpty(value);
  const otherProps = {
    ...(filter.icon && { startIcon: filter.icon }),
  };

  return (
    <>
      <Box onClick={!disabled && handleFocus}>
        {type === 'button' ? (
          <RoundedButtonGroup selected={isSelected}>
            <Button
              onClick={!disabled && handleFocus}
              variant={isSelected ? 'contained' : 'outlined'}
              color={isSelected ? 'secondary' : 'primary'}
              {...otherProps}
            >
              {fieldVal}
            </Button>
            {fieldVal !== filter.title && (
              <IconButton
                title="Clear filter"
                color="secondary"
                onClick={(e) => {
                  onChange(undefined);
                  e.stopPropagation();
                }}
              >
                <CloseIcon sx={{ fontSize: '20px' }} />
              </IconButton>
            )}
          </RoundedButtonGroup>
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
        key={showCustom}
        open={open}
        sx={{ zIndex: 1000000 }}
        onClose={handleClose}
      >
        <Grid container>
          <Grid item xs={custom && showCustom ? 3 : 12}>
            {options.map((item, index) => {
              return (
                <ListItemButton onClick={() => onChange(item)} key={`rel-dropdown-option-${index}`}>
                  <Typography color="textPrimary" variant="body2">
                    {item.name}
                  </Typography>
                </ListItemButton>
              );
            })}

            <ListItemButton
              onClick={() => {
                setShowCustom(!showCustom);
              }}
            >
              <Typography color="textPrimary" variant="body2">
                Custom
              </Typography>
            </ListItemButton>
          </Grid>
          {custom && showCustom && (
            <Grid item xs={9}>
              <DateRangePickerAlt
                {...customOptions}
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
  options: PropTypes.any,
  custom: PropTypes.bool,
  disabled: PropTypes.bool,
};

DateRangeFilter.defaultProps = {
  value: () => {},
  type: 'input',
  options: [],
  custom: true,
  disabled: false,
};

export default DateRangeFilter;
