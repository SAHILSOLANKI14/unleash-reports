import React, { useEffect, useState } from 'react';
import ProductGrid from '../../Product/component/ProductGrid';
import { Box, Container, Pagination } from '@mui/material';
import { fetchProductCateRequest } from '../../Product/Store/productAction';
import { useDispatch, useSelector } from 'react-redux';
const PromotionContainer = () => {
  const product = useSelector((state) => state.cateProduct.product || { total: 0, data: [] });

  const [limit, setLimit] = useState(16);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();

  const handlePageChange = (event, page) => {
    console.log('page', page);
    setCurrentPage(page);
    const start = page * limit + 1;
    const requestData = { start, limit };
    dispatch(fetchProductCateRequest(requestData));
  };

  useEffect(() => {
    setTotalPages(Math.ceil(product.total / limit || []));
  }, [limit, product]);
  return (
    <Container>
      <ProductGrid page={page} limit={limit} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          sx={{
            '& .MuiPaginationItem-root': {
              fontSize: '1rem',
              fontWeight: '500',
            },
            '& .Mui-selected': {
              backgroundColor: '#2277f5 !important',
              color: '#fff',
              fontWeight: 'bold',
            },
            '& .MuiPaginationItem-ellipsis': {
              color: 'black',
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default PromotionContainer;
