import React from 'react';
import Header from '../../Header/header';
import FullWidthImageSlider from '../../slider/homeSlider';
import ProductGrid from '../../Product/component/ProductGrid';
import { Container } from '@mui/material';
const HomeDash = () => {
  return (
    <>
      <Container>
        {/* <Header /> */}
        <FullWidthImageSlider />
        <ProductGrid />
      </Container>
    </>
  );
};

export default HomeDash;
