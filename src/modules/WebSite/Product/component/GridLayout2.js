import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import noimg from '../../../Categories/images/no_image.png';
import {
  addToCartRequest,
  decrementQuantityRequest,
  incrementQuantityRequest,
} from '../../WebCart/Store/CartAction';
import { fetchProductCateRequest, fetchProductRequest } from '../Store/productAction';
import { palette } from 'src/config/theme';

const GridLayout2 = ({ page, limit }) => {
  const product = useSelector((state) => state.cateProduct.product || { total: 0, data: [] });
  const isAuthenticated = useSelector((state) => state.WebAuth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  const [products, setProducts] = useState([product]);
  const [productQuantities, setProductQuantities] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [limit, setLimit] = useState(8);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const quantities = {};
    cartItems.forEach((item) => {
      quantities[item.id] = item.quantity;
    });
    setProductQuantities(quantities);
  }, [cartItems]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const requestData = { start: (page - 1) * limit, limit };
        await dispatch(fetchProductCateRequest(requestData));
      } catch (err) {
        setError('Failed to load products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit, dispatch]);

  useEffect(() => {
    if (Array.isArray(product) && product.length > 0) {
      setProducts(product);
    } else if (product && product.data) {
      setProducts(product.data);
    } else {
      setProducts([]);
    }
  }, [limit, product]);

  const handleIncrement = (productId, product) => {
    const currentQuantity = productQuantities[productId] || 0;
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: currentQuantity + 1,
    }));
    if (currentQuantity === 0) {
      dispatch(addToCartRequest({ ...product, quantity: 1 }));
      setSuccessMessage(`${product.name} has been added to your cart.`);
    } else {
      dispatch(incrementQuantityRequest(productId));
    }
  };

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

  const handleAddToCart = (product) => {
    dispatch(addToCartRequest({ ...product, quantity: productQuantities[product.id] || 1 }));
    setSuccessMessage(`${product.name} has been added to your cart.`);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleProductClick = async (code, slug) => {
    dispatch(fetchProductRequest(`${code}`));
    navigate(`/product/${slug}`);
  };

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
  const handleSnackbarClose = () => {
    setSuccessMessage(null);
  };
  return (
    <>
      {successMessage && (
        <Snackbar
          open={Boolean(successMessage)}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{
              width: '100%',
              fontSize: '12px',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {successMessage}
          </Alert>
          {/* <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
              {successMessage}
            </Alert> */}
        </Snackbar>
      )}
      <Grid container spacing={4} sx={{ mt: 0 }}>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <Grid item key={product.id} xs={12} sm={12} md={12} lg={6}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 2,
                  boxShadow: 1,
                }}
              >
                {/* Product Image */}
                <CardMedia
                  component="img"
                  image={product?.imageUrl || noimg}
                  alt={product.name}
                  sx={{
                    height: '100px',
                    width: '100px',
                    objectFit: 'contain',
                  }}
                />
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {/* Product Info */}
                  <Stack direction={'column'}>
                    <Link
                      to={`/product/${product.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleProductClick(product.code, product.slug);
                      }}
                      style={{ padding: '0 10px', textDecoration: 'none', color: 'black' }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: '600',
                          textAlign: 'center',
                          mb: 1,
                          width: '150px',
                        }}
                      >
                        {product.name}
                      </Typography>
                    </Link>
                    {/* Quantity Selector */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: '600',
                        fontSize: '16px',
                        textAlign: 'center',
                        p: 1,
                        color: palette.secondary.main,
                      }}
                    >
                      ${product.price}
                    </Typography>
                  </Stack>
                  {isAuthenticated ? (
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{
                        mb: '-8px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
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
                </CardContent>
                {isAuthenticated && (
                  <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        fontWeight: '600',
                        textAlign: 'center',
                        background: palette.secondary.main,
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
          ))
        ) : (
          <Typography variant="h6">No products available</Typography>
        )}
      </Grid>
    </>
  );
};

export default GridLayout2;
