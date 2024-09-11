import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { TextareaAutosize } from '@mui/material';
import { FormHelperText, Box } from '@mui/material';
// import { Textarea } from '../Textarea/Textarea';
const propTypes = {
  className: PropTypes.string,
  invalid: PropTypes.bool,
  minRows: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  className: undefined,
  invalid: false,
  minRows: 2,
  value: undefined,
  onChange: () => {},
};

const Textarea = forwardRef(
  ({ className, invalid, onChange, error, helperText, ...textareaProps }, ref) => (
    <div className={className} invalid={invalid}>
      <TextareaAutosize
        {...textareaProps}
        onChange={(event) => onChange(event.target.value, event)}
        inputRef={ref || undefined}
        style={{
          borderRadius: '4px',
          border: '1px solid rgba(0, 0, 0, 0.23)',
          padding: '16.5px 14px',
          fontSize: '16px',
          fontFamily: 'Roboto,sans-serif',
          resize: 'none',
          width: 'calc(100% - 32px)',
          marginTop: '16px',
        }}
      />
      {helperText && helperText !== '' && (
        <Box sx={{ margin: '0px 14px' }}>
          <FormHelperText error={error}>{helperText}</FormHelperText>
        </Box>
      )}
    </div>
  ),
);

Textarea.propTypes = propTypes;
Textarea.defaultProps = defaultProps;

export default Textarea;
