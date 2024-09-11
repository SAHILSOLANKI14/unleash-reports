import React, { useState } from 'react';
import { Box, Popper } from '@mui/material';
import PropTypes from 'prop-types';
import { TwitterPicker, SketchPicker } from 'react-color';
import { styles, Swatch, Color } from './styles';

const ColorPicker = ({ value, onChange, width, variant }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [color, setColor] = useState(value);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleChange = (color) => {
    onChange(color.hex);
  };

  return (
    <Box position={'relative'}>
      {variant === 'inline' ? (
        <TwitterPicker color={value} onChange={handleChange} triangle="hide" width={width} />
      ) : null}

      {variant === 'popper' ? (
        <>
          <Swatch onClick={togglePicker}>
            <Color color={value} />
          </Swatch>
          {showPicker ? (
            <Box style={styles.popover}>
              <div style={styles.cover} onClick={togglePicker} />
              <TwitterPicker color={value} onChange={handleChange} />
            </Box>
          ) : null}
          {/* <Popper id={id} open={open} anchorEl={anchorEl}>
            <TwitterPicker color={value} onChange={handleChange} />
          </Popper> */}
        </>
      ) : null}
    </Box>
  );
};

ColorPicker.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  width: PropTypes.number,
  variant: PropTypes.oneOf(['inline', 'popper']),
};

ColorPicker.defaultProps = {
  value: '',
  onChange: () => {},
  width: 276,
  variant: 'inline',
};

export default ColorPicker;
