import React, { forwardRef, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { IconButton, Menu, Fade } from '@mui/material';
import { InputAdornment, CircularProgress } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CodeIcon from '@mui/icons-material/Code';

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.string,
  filter: PropTypes.instanceOf(RegExp),
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  loading: PropTypes.bool,
  showPicker: PropTypes.bool,
  pickerIcon: PropTypes.any,
  options: PropTypes.array,
  optLabel: PropTypes.string,
  optValue: PropTypes.string,
  emojiPicker: PropTypes.bool,
  color: PropTypes.string,
};

const defaultProps = {
  className: undefined,
  value: undefined,
  icon: undefined,
  filter: undefined,
  onChange: () => {},
  variant: 'standard',
  loading: false,
  showPicker: false,
  options: [],
  optLabel: 'label',
  optValue: 'value',
  emojiPicker: false,
  pickerIcon: <CodeIcon color="secondary" />,
  color: 'primary',
};

const InputComponent = forwardRef(
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
      showPicker,
      options,
      optLabel,
      optValue,
      emojiPicker,
      pickerIcon,
      color,
      notched,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [cursorPos, setCursorPos] = React.useState(0);
    const positionRef = useRef();
    positionRef.current = cursorPos;

    const inputRef = useRef(null);

    const handleChange = (event) => {
      if (!filter || filter.test(event.target.value)) {
        onChange(event.target.value, event);
      }
    };

    const inputProps = {
      ...InputProps,
      endAdornment: (
        <>
          {loading && (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          )}
          {type === 'password' && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                size="large"
              >
                {showPassword ? <VisibilityOff size={20} /> : <Visibility size={20} />}
              </IconButton>
            </InputAdornment>
          )}
          {InputProps?.endAdornment ? InputProps?.endAdornment : null}
        </>
      ),
    };

    const handleCursorChange = (event) => {
      if (typeof event.target.selectionStart !== 'undefined') {
        setCursorPos(event.target.selectionStart);
      }
    };

    const onKeyUp = (event) => {
      handleCursorChange(event);
    };

    const handleBlur = (event) => {};

    const handleFocus = (event) => {};

    return (
      <>
        <TextField
          className={className}
          type={type === 'password' && showPassword ? 'text' : type}
          onChange={handleChange}
          inputRef={inputRef}
          variant={variant}
          helperText={helperText}
          error={error}
          id={id}
          InputProps={inputProps}
          disabled={loading || disabled}
          color={color}
          onKeyUp={onKeyUp}
          onClick={onKeyUp}
          {...props}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </>
    );
  },
);

InputComponent.propTypes = propTypes;
InputComponent.defaultProps = defaultProps;

export default InputComponent;
