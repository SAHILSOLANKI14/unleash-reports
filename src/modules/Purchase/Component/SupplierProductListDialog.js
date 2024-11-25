import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Typography, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function SupplierProductListDialog({ open, onClose, onAddProduct, onRemove }) {
  const [products, setProducts] = React.useState([]);
  const [addedProducts, setAddedProducts] = React.useState([]); // Track added products
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchProducts = React.useCallback(async () => {
    const supplierID = localStorage.getItem('Supplier_id');

    if (!supplierID) {
      setError('Supplier ID not found. Please set a valid Supplier ID.');
      setProducts([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://dev.unleashpos.com/api/v1/products?api-key=kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos&supplier_id=${supplierID}&limit=1000`,
      );
      const data = await response.json();

      if (response.ok) {
        setProducts(data.data || []);
        setError(null);
      } else {
        setError(data.message || 'Failed to fetch products.');
        setProducts([]);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('An error occurred while fetching products.');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (open) {
      fetchProducts();
    }
  }, [open, fetchProducts]);

  const handleAdd = (product) => {
    if (onAddProduct) {
      onAddProduct(product); // Call the function passed as a prop to add product
    }
    setAddedProducts((prev) => [...prev, product.id]); // Track added product
    console.log('Product added:', product);
  };

  const handleRemove = (productId) => {
    if (onRemove) {
      onRemove(productId);
    }
    setAddedProducts((prev) => prev.filter((id) => id !== productId));
    console.log('Product removed:', productId);
  };

  // Sort products: added products first
  const sortedProducts = React.useMemo(() => {
    return products.slice().sort((a, b) => {
      const aIsAdded = addedProducts.includes(a.id);
      const bIsAdded = addedProducts.includes(b.id);
      return bIsAdded - aIsAdded; // Sort by added status
    });
  }, [products, addedProducts]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      maxWidth="lg"
      fullWidth
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Supplier Products</DialogTitle>
      <DialogContent dividers>
        {isLoading && (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        )}
        {error && <Typography color="error">{error}</Typography>}
        {!isLoading && !error && sortedProducts.length > 0 && (
          <Grid container spacing={2}>
            {/* Header Row */}
            <Grid
              container
              item
              spacing={2}
              sx={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: 1 }}
            >
              <Grid item xs={6} md={4}>
                <Typography variant="subtitle1">Product Name</Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="subtitle1">Available Stock</Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="subtitle1">Pending P.o (Qty)</Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="subtitle1">Price</Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="subtitle1">Actions</Typography>
              </Grid>
            </Grid>

            {/* Product Rows */}
            {sortedProducts.map((product, index) => (
              <Grid key={index} container item spacing={2} alignItems="center">
                <Grid item xs={6} md={4}>
                  <Typography variant="body2">{product.name || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Typography variant="body2">{product.quantity || '0'}</Typography>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Typography variant="body2">{product.productTax || '0'}</Typography>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Typography variant="body2">{product.price || '$0.00'}</Typography>
                </Grid>
                <Grid item xs={6} md={2}>
                  {addedProducts.includes(product.id) ? (
                    <>
                      <Button variant="contained" color="success" disabled>
                        Added
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleRemove(product.id)}
                        sx={{ marginLeft: 1 }}
                      >
                        Remove
                      </Button>
                    </>
                  ) : (
                    <Button variant="contained" color="primary" onClick={() => handleAdd(product)}>
                      <AddIcon />
                      Add
                    </Button>
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}

        {!isLoading && !error && sortedProducts.length === 0 && (
          <Typography>No products found.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}
