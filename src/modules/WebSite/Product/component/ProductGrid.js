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
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCartRequest,
  removeFromCartRequest,
  incrementQuantityRequest,
  decrementQuantityRequest,
} from '../../WebCart/Store/CartAction';
import { fetchproductData } from '../../../Categories/API/ProductsApi';
import noimg from '../../../Categories/images/no_image.png';
import { useNavigate } from 'react-router-dom';
import { fetchCategoriesRequest } from '../../Category/store/categoriesAction';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(8);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  // Check if the user is authenticated
  const isAuthenticated = useSelector((state) => state.WebAuth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  // Increment product quantity in state
  const handleIncrement = (productId, product) => {
    const currentQuantity = productQuantities[productId] || 0;
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: currentQuantity + 1,
    }));
    if (currentQuantity === 0) {
      dispatch(addToCartRequest({ ...product, quantity: 1 }));
    } else {
      dispatch(incrementQuantityRequest(productId));
    }
  };
  useEffect(() => {
    const quantities = {};
    cartItems.forEach((item) => {
      quantities[item.id] = item.quantity;
    });
    setProductQuantities(quantities);
  }, [cartItems]);

  // Decrement product quantity in state
  const handleDecrement = (productId) => {
    const currentQuantity = productQuantities[productId];
    if (currentQuantity > 1) {
      setProductQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: currentQuantity - 1,
      }));
      dispatch(decrementQuantityRequest(productId));
    } else {
      setProductQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: 1,
      }));
      dispatch(decrementQuantityRequest(productId));
    }
  };

  // Add product to cart
  const handleAddToCart = (product) => {
    dispatch(addToCartRequest({ ...product, quantity: productQuantities[product.id] || 1 }));
  };

  // Redirect to the login page
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  // Increase the products limit
  const handleAddMore = () => {
    setLimit((prevLimit) => prevLimit + 8);
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const data = {
        start: 1,
        limit: limit,
      };
      const response = await fetchproductData(data);
      setProducts(response.data);
    } catch (error) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [limit]);

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
      <hr />
      <Grid container spacing={4} sx={{ mt: 0 }}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={4} md={3} sx={{ mb: 0 }}>
            <Card
              sx={{
                height: '360px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
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
                  {isAuthenticated ? (
                    <>
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
                        ${product.price}
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
                          value={productQuantities[product.id] || 1}
                          variant="outlined"
                          inputProps={{
                            style: { textAlign: 'center', width: '40px', padding: '5px ' },
                            readOnly: true,
                          }}
                        />

                        <Button
                          onClick={() => handleIncrement(product.id, product)}
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
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleLoginRedirect}
                      sx={{
                        fontWeight: '600',
                        textAlign: 'center',
                        background: '#5341f9',
                        color: '#fff',
                        mt: 1,
                      }}
                    >
                      Login to Preview
                    </Button>
                  )}
                </Stack>
              </CardContent>
              {isAuthenticated && (
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
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, mb: 2 }}>
        <Button
          sx={{
            fontWeight: '600',
            textAlign: 'center',
            background: '#5341f9',
            color: '#fff',
            paddingLeft: '30px',
            paddingRight: '30px',
          }}
          onClick={handleAddMore}
        >
          Add More
        </Button>
      </Box>
    </>
  );
};

export default ProductPage;
