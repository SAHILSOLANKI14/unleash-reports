import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductRequest } from '../Product/Store/productAction';
import noimg from '../../Categories/images/no_image.png';
import { fetchproductsearch } from 'src/modules/Categories/API/ProductSearch';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const ProductSearch = () => {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [debouncedValue, setDebouncedValue] = React.useState('');
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Debounce input value changes
  const debouncedInputHandler = React.useMemo(
    () =>
      debounce((newValue) => {
        setDebouncedValue(newValue);
      }, 300),
    [],
  );

  React.useEffect(() => {
    debouncedInputHandler(inputValue);
  }, [inputValue, debouncedInputHandler]);

  // Fetch products when debounced value changes
  const FetchProducts = async () => {
    if (debouncedValue) {
      setLoading(true);
      try {
        const response = await fetchproductsearch(debouncedValue);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setProduct([]);
    }
  };

  React.useEffect(() => {
    FetchProducts();
  }, [debouncedValue]);

  const handleProductClick = (product) => {
    dispatch(fetchProductRequest(product.code));
    navigate(`/product/${product.slug}`);
  };

  return (
    <Autocomplete
      value={value}
      size="small"
      onChange={(event, newValue) => {
        setValue(newValue);
        if (newValue) handleProductClick(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      options={product}
      getOptionLabel={(option) => option.name || ''}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      noOptionsText="No products found"
      freeSolo
      loading={loading}
      loadingText="Loading..."
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Products"
          placeholder="Type to search..."
          sx={{
            width: {
              xs: 'auto', // Full width for mobile
              sm: 'auto', // 80% width for small screens
              md: 'auto', // 60% width for medium screens
              lg: '400px', // 40% width for large screens
            },
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? <Typography variant="body2">Loading...</Typography> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      // sx={{ width: '400px' }}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            padding: '8px',
          }}
        >
          <Avatar src={noimg || option.image} alt={option.name} sx={{ width: 50, height: 50 }} />
          <Box>
            <Typography variant="h5" fontWeight="600">
              {option.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${option.price}
            </Typography>
          </Box>
        </Box>
      )}
    />
  );
};

export default ProductSearch;
