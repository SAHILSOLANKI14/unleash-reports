import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchproductData } from '../../../Categories/API/ProductsApi';
import noimg from '../../../Categories/images/no_image.png';
import {
  addToCartRequest,
  decrementQuantityRequest,
  incrementQuantityRequest,
} from '../../WebCart/Store/CartAction';
import { fetchProductRequest, fetchProductCateRequest } from '../Store/productAction';
import { setproductsData } from 'src/modules/Categories/Store/productsAction';

const ProductPage = ({ limit }) => {
  console.log('limit', limit);
  const product = useSelector((state) => state.cateProduct.product);
  const isAuthenticated = useSelector((state) => state.WebAuth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  const [products, setProducts] = useState([product]);
  const [productQuantities, setProductQuantities] = useState({});
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
        const requestData = { start: 1, limit: limit };
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
  }, [product]);

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
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  // const handleAddMore = () => {
  //   setLimit((prevLimit) => prevLimit + 8);
  // };

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

  return (
    <>
      <Grid container spacing={4} sx={{ mt: 0 }}>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
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
                  alt={product.name || ''}
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
                    <Link
                      to={`/product/${product.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleProductClick(product.code, product.slug);
                      }}
                      style={{ padding: '0 10px', textDecoration: 'none', color: 'black' }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: '600', textAlign: 'center', textDecoration: 'none' }}
                      >
                        {product.name}
                      </Typography>
                    </Link>

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
          ))
        ) : (
          <Typography variant="h6">No products available</Typography>
        )}
      </Grid>
      {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, mb: 2 }}>
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
      </Box> */}
    </>
  );
};

export default ProductPage;
