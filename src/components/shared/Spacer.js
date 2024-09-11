import React from 'react';
import { Box, BoxProps, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  basis: PropTypes.number,
};

const defaultProps = {
  x: 0,
  y: 0,
  basis: 0,
};

const Spacer = ({ x, y, basis, ...restProps }) => {
  const theme = useTheme();
  return (
    <Box
      data-testid="Spacer"
      width={x ? theme.spacing(x) : undefined}
      height={y ? theme.spacing(y) : undefined}
      flexBasis={basis ? theme.spacing(basis) : undefined}
      flexGrow={0}
      flexShrink={0}
      {...restProps}
    />
  );
};

Spacer.propTypes = propTypes;
Spacer.defaultProps = defaultProps;

export default Spacer;
