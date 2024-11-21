import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductRequest } from '../Product/Store/productAction'; 
import noimg from '../../Categories/images/no_image.png';
import { fetchproductsearch } from 'src/modules/Categories/API/ProductSearch';

const ProductSearch = () => {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [product, setProduct] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const FetchProducts = async () => {
    if (inputValue) {
      const response = await fetchproductsearch(inputValue); 
      setProduct(response.data);
    } else {
      setProduct([]);
    }
  };

  React.useEffect(() => {
    FetchProducts();
  }, [inputValue]);

  const handleProductClick = async (product) => {
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
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Products"
          placeholder="Type to search..."
          sx={{ width: '400px' }}
        />
      )}
      sx={{ width: '400px' }}
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
          <Avatar src={option.image || noimg} alt={option.name} sx={{ width: 50, height: 50 }} />
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
