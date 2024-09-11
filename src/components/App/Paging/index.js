import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, Box, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import useMediaQuery from 'src/components/hooks/useMediaQuery';

const Paging = ({ size, perPage, page, count, onChange }) => {
  const pages = Math.ceil(count / perPage);

  const { isDesktop, isTablet, isMobile } = useMediaQuery();

  const { palette } = useTheme();

  page = page + 1;

  const handleChange = (data, newPage) => {
    if (page !== newPage) {
      onChange(newPage - 1);
    }
  };

  let other = {
    showFirstButton: true,
    showLastButton: true,
    boundaryCount: 1,
  };
  if (isMobile) {
    other = {
      showFirstButton: false,
      showLastButton: false,
      boundaryCount: 0,
    };
  }
  if (isTablet) {
    other = {
      showFirstButton: false,
      showLastButton: false,
      boundaryCount: 1,
    };
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" width="100%">
      <Stack spacing={2}>
        <Pagination
          count={pages}
          defaultPage={page}
          size={size}
          siblingCount={1}
          {...other}
          onChange={handleChange}
          shape="rounded"
        />
      </Stack>
    </Box>
  );
};

Paging.propTypes = {
  size: PropTypes.string,
  page: PropTypes.number,
  perPage: PropTypes.number,
  count: PropTypes.number,
};

Paging.defaultProps = {
  size: 'medium',
  page: 0,
  perPage: 10,
  count: 0,
};

export default Paging;
