// src/ProductPage.js
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from '../Store/productSlice';
import { fetchproductData } from '../../../Categories/API/ProductsApi';
import noimg from '../../../Categories/images/no_image.png';
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState(2);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = {
          start: 1,
          limit: 8,
        };
        const response = await fetchproductData(data);
        setProducts(response.data);
      } catch (error) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h2" color="primary" sx={{ mt: 4, mb: 2 }}>
        Latest Product
      </Typography>
      <hr></hr>
      <Grid container spacing={4} sx={{ mt: 0 }}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={8} md={3} sx={{ mb: 0 }}>
            <Card
              sx={{
                height: 'auto',
                width: '100%',
              }}
            >
              <CardMedia
                component="img"
                alt={product.name}
                sx={{
                  objectFit: 'contain',
                  height: 'auto',
                  width: '50%',
                  alignSelf: 'center',
                  display: 'flex',
                  justifySelf: 'center',
                  p: 2,
                }}
                image={product.imageUrl || noimg}
              />
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Stack
                  direction="column"
                  spacing={0}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: '600', textAlign: 'center' }}>
                    {product.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: '600',
                      fontSize: '16px',
                      textAlign: 'center',
                      p: 1,
                      color: '#2277f5',
                    }}
                  >
                    ${product.price}{' '}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: '-8px' }}>
                    <Button
                      onClick={() => handleDecrement(product.id)}
                      variant="outlined"
                      sx={{
                        minWidth: '30px',
                        minHeight: '30px',
                        borderRadius: '50%',
                        bgcolor: '#f4f4f4',
                      }}
                    >
                      -
                    </Button>

                    <TextField
                      value={count}
                      variant="outlined"
                      inputProps={{
                        style: {
                          textAlign: 'center',
                          width: '40px',
                          padding: '5px ',
                        },
                        readOnly: true,
                      }}
                    />

                    <Button
                      onClick={() => handleIncrement(product.id)}
                      variant="outlined"
                      sx={{
                        minWidth: '30px',
                        minHeight: '30px',
                        borderRadius: '50%',
                        bgcolor: '#f4f4f4',
                      }}
                    >
                      +
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    fontWeight: '600',
                    textAlign: 'center',
                    background: '#5341f9',
                    color: '#fff',
                  }}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductPage;
