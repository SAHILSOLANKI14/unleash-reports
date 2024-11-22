import React, { useState } from 'react';
import ProductGrid from 'src/modules/WebSite/Product/component/ProductGrid';
import { Button, Box, Typography } from '@mui/material';

const ProductContainer = () => {
  const [limit, setLimit] = useState(8);

  const handleAddMore = () => {
    setLimit((prevLimit) => prevLimit + 8); // Increase the limit dynamically
  };

  return (
    <div>
      <Typography variant="h2" color="primary" sx={{ mt: 4, mb: 2 }}>
        Latest Product
      </Typography>
      <hr />
      <ProductGrid limit={limit} />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontWeight: '600', paddingLeft: '30px', paddingRight: '30px' }}
          onClick={handleAddMore}
        >
          Load More Products
        </Button>
      </Box>
    </div>
  );
};

export default ProductContainer;
