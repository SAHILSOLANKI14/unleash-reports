import React, { useEffect, useState } from 'react';
import ProductGrid from '../../Product/component/ProductGrid';
import GridLayout2 from '../../Product/component/GridLayout2';
import { Box, Container, Pagination, Stack, TextField } from '@mui/material';
import { fetchProductCateRequest } from '../../Product/Store/productAction';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import { palette } from 'src/config/theme';
import banner from 'src/assets/images/banner.png';
const PromotionContainer = () => {
  const product = useSelector((state) => state.cateProduct.product || { total: 0, data: [] });
  const [value, setValue] = useState(0);
  const [limit, setLimit] = useState(16);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    const start = (page - 1) * limit; // Adjusted to fetch correct data range
    const requestData = { start, limit };
    dispatch(fetchProductCateRequest(requestData));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(product.total / limit));
  }, [limit, product]);

  useEffect(() => {
    if (value === 0) {
      const start = (currentPage - 1) * limit;
      const requestData = { start, limit };
      dispatch(fetchProductCateRequest(requestData));
    }
  }, [value, currentPage, limit, dispatch]);
  const options = [
    'Ascending by Name',
    'Descending by Name',
    'Ascending by Price',
    'Descending by Price',
  ];
  return (
    <>
      {/* <Box
        component={'img'}
        sx={{
          objectFit: 'contain',
          height: 'auto',
          width: '100%',
          alignSelf: 'center',
          display: 'flex',
          justifySelf: 'center',
          p: 2,
        }}
        src={banner}
      ></Box> */}
      <Container>
        <Stack
          direction={'row'}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Autocomplete
            disablePortal
            size="small"
            options={options}
            sx={{ width: 250 }}
            defaultValue={[options[0]]}
            renderInput={(params) => <TextField {...params} label="" />}
          />
          <Tabs
            value={value}
            sx={{ float: 'right' }}
            onChange={handleChange}
            aria-label="icon tabs example"
          >
            <Tab
              icon={
                <GridViewIcon
                  sx={{
                    fontSize: '30px',
                    color: palette.secondary.main,
                    border: '1px solid gray',
                    p: 0.5,
                  }}
                />
              }
              aria-label="phone"
            />
            <Tab
              icon={
                <ViewListOutlinedIcon
                  sx={{
                    fontSize: '35px',
                    color: palette.secondary.main,
                    border: '1px solid gray',
                    p: 0.2,
                  }}
                />
              }
              aria-label="favorite"
            />
          </Tabs>
        </Stack>
        {value === 0 && <ProductGrid page={page} limit={limit} />}
        {value === 1 && <GridLayout2 page={page} limit={limit} />}

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
    </>
  );
};

export default PromotionContainer;
