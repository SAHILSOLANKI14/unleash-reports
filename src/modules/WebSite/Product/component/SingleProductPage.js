import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchproductDetailData } from 'src/modules/Categories/API/ProductDetail';
import { Box, Typography, Grid, CircularProgress, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import noimg from 'src/modules/Categories/images/no_image.png';
const SingleProductPage = () => {
  const { slug } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { product } = useSelector((state) => state.singlepage);
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
                maxWidth: 300,
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
                  Unit: {product.category_id || 'N/A'}
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
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SingleProductPage;