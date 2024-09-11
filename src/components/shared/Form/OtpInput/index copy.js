import React, { forwardRef } from 'react';
import PropTypes from 'prop-types'

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.string,
  invalid: PropTypes.bool,
  filter: PropTypes.instanceOf(RegExp),
  onChange: PropTypes.func,
};

const defaultProps = {
  className: undefined,
  value: undefined,
  icon: undefined,
  invalid: false,
  filter: undefined,
  onChange: () => {},
};

const OtpInput = forwardRef(({ icon, className, filter, onChange, ...inputProps }, ref) => {
  const handleChange = event => {
    if (!filter || filter.test(event.target.value)) {
      onChange(event.target.value, event);
    }
  };

  return (
    <input {...inputProps} onChange={handleChange} ref={ref} />
  );
});

OtpInput.propTypes = propTypes;
OtpInput.defaultProps = defaultProps;

export default OtpInput;
