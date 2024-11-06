import React from 'react';
import FullWidthImageSlider from '../../slider/homeSlider';
import ProductGrid from '../../Product/component/ProductGrid';
import { Container } from '@mui/material';

const HomeDash = () => {
  return (
    <>
      <Container>
        <FullWidthImageSlider />
        <ProductGrid />
      </Container>
    </>
  );
};

export default HomeDash;
