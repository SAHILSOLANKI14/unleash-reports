// src/ProductPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
} from '@mui/material';
import { fetchproductData } from '../../../Categories/API/ProductsApi';
import noimg from '../../../Categories/images/no_image.png';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <Grid container spacing={0} sx={{ mt: 4 }}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={8} md={3} sx={{ mb: 2 }}>
            <Card
              sx={{
                height: '320px',
                width: '80%',
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
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Stack
                  direction="column"
                  spacing={1}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: '600', textAlign: 'center' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: '600', textAlign: 'center' }}>
                    ${product.price}{' '}
                  </Typography>
                </Stack>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    fontWeight: '600',
                    textAlign: 'center',
                    background: '#5341f9',
                    color: '#fff',
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductPage;
