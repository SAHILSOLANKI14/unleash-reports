import React from 'react';
import FullWidthImageSlider from '../../slider/homeSlider';
import ProductGrid from '../../Product/component/ProductGrid';
import { Container } from '@mui/material';
import ProductContainer from '../../Product/Container/productContainer';
import Breadcrumbs from 'src/components/shared/BreadCrumbs/Breadcrumb';
const HomeDash = () => {
  return (
    <>
      <Container>
       
        <FullWidthImageSlider />
        <ProductContainer />
      </Container>
    </>
  );
};

export default HomeDash;
