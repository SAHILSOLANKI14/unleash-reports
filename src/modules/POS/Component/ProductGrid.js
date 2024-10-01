import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import image from 'src/modules/Categories/images/no_image.png';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { fetchproductData } from '../../Categories/API/ProductsApi';

export default function ProductGrid({ selectedProduct }) {
  const [productGridData, setProductGridData] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [clickedProduct, setClickedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 28;

  const fetchProductGrid = async (page) => {
    const data = {
      limit: productsPerPage,
      start: page,
    };

    const res = await fetchproductData(data);
    if (res && res.data) {
      setProductGridData(res.data);
      setCurrentProducts(res.data);
      setTotalPages(res.total);
    }
  };

  useEffect(() => {
    fetchProductGrid(currentPage);
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + productsPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - productsPerPage);
    }
  };

  const handleProductClick = (product) => {
    selectedProduct(product);
  };

  return (
    <Box sx={{ p: 0 }}>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mt: 0, mb: 2, color: '#1a79ff' }}
      >
        <Button
          variant="outlined"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          sx={{ border: '1px solid' }}
        >
          <KeyboardArrowLeftIcon /> Previous
        </Button>
        <Typography variant="body2" sx={{ alignSelf: 'center' }}>
          Record {currentPage} Out of {totalPages}
        </Typography>
        <Button
          variant="outlined"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          sx={{ border: '1px solid' }}
        >
          Next <KeyboardArrowRightIcon />
        </Button>
      </Box>

      <Grid container spacing={1} sx={{ height: '600px', overflowY: 'auto' }}>
        {currentProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              onClick={() => handleProductClick(product)}
              sx={{
                height: '185px',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                background: '#f1f1f1',
                p: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100px',
                }}
              >
                <CardMedia
                  component="img"
                  image={product.img || image}
                  alt={product.name}
                  sx={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
              <CardContent>
                <Typography variant="body1" sx={{ fontSize: '11px' }}>
                  {product.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
