import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchproductDetailData } from 'src/modules/Categories/API/ProductDetail';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Container,
  Stack,
  Button,
  TextField,
} from '@mui/material';
import { useSelector } from 'react-redux';
import noimg from 'src/modules/Categories/images/no_image.png';
import {
  addToCartRequest,
  decrementQuantityRequest,
  incrementQuantityRequest,
} from '../../WebCart/Store/CartAction';
import { useDispatch } from 'react-redux';
const SingleProductPage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productData = useSelector((state) => state.cateProduct.product || { total: 0, data: [] });
  const isAuthenticated = useSelector((state) => state.WebAuth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  const [productQuantities, setProductQuantities] = useState({});
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.singlepage);
  const Unit = product?.unit[0] || [];
  useEffect(() => {
    const fetchProduct = async () => {
      try {
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  useEffect(() => {
    const quantities = {};
    cartItems.forEach((item) => {
      quantities[item.id] = item.quantity;
    });
    setProductQuantities(quantities);
  }, [cartItems]);

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

  const renderUnitLabel = (unitId) => {
    if (unitId == 10) {
      return 'Inner';
    }
    if (unitId == 11) {
      return 'Each';
    }
    if (unitId == 9) {
      return 'Case';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  if (!product) {
    return (
      <Typography variant="h6" color="textSecondary">
        Product not found.
      </Typography>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} display="flex" justifyContent="center">
            <Box
              sx={{
                border: '1px solid lightgray',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                p: 3,
                width: '700px',
                maxWidth: 700,
              }}
            >
              <Box
                component="img"
                alt={product.name || 'Product Image'}
                src={noimg || noimg}
                sx={{ width: '100%', height: 'auto', maxWidth: 300 }}
              />
            </Box>
          </Grid>

          {/* Product Details Section */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h3" gutterBottom sx={{ color: 'black', fontWeight: '600' }}>
              {product.name || 'Product Name'}
            </Typography>
            <Grid xs={12}>
              <Grid item xs={6}>
                <Typography variant="body1" paragraph>
                  Price: {product.price || 'N/A'}
                </Typography>
                <Typography variant="body1" paragraph>
                  Category: {product.category_id || 'N/A'}
                </Typography>
                <Typography variant="body1" paragraph>
                  Unit: {renderUnitLabel(Unit?.unit_id || 'N/A')}
                </Typography>
                <Typography variant="body1" paragraph>
                  Code: {Unit?.product_unit_code || 'N/A'}
                </Typography>
                <Typography variant="body1" paragraph>
                  Sub-Category: {product.subcategory_id || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" paragraph>
                  Pack Size: {product.packSize || 'N/A'}
                </Typography>
                <Typography variant="h4" paragraph>
                  Tax method: {product.tax_method || 'N/A'}
                </Typography>
              </Grid>
            </Grid>
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
            {isAuthenticated && (
              <Box sx={{ p: 2 }}>
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
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SingleProductPage;
