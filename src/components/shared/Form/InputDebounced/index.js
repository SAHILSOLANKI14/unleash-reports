import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import Input from '../Input';

const propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  throttle: PropTypes.number,
  color: PropTypes.string,
};

const defaultProps = {
  value: undefined,
  throttle: 500,
  color: 'secondary',
};

const InputDebounced = ({
  onChange,
  throttle,
  value: propsValue,
  color,
  notched = false,
  ...inputProps
}) => {
  const [value, setValue] = useState(propsValue);
  const isControlled = propsValue !== undefined;

  const handleChange = useCallback(
    debounce((newValue) => onChange(newValue), throttle),
    [],
  );

  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => {
    if (propsValue !== valueRef.current) {
      setValue(propsValue);
    }
  }, [propsValue]);

  return (
    <Input
      value={isControlled ? value : undefined}
      onChange={(newValue) => {
        setValue(newValue);
        handleChange(newValue);
      }}
      color={color}
      {...inputProps}
      notched={false}
    />
  );
};

InputDebounced.propTypes = propTypes;
InputDebounced.defaultProps = defaultProps;

export default InputDebounced;
