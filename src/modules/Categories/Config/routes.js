import ProductsContainer from 'src/modules/categories/components/ProductsContainer';
import AddProductContainer from '../Container/AddProductContainer';
export default [
  {
    title: 'products',
    component: ProductsContainer,
    url: '/products',
    exact: true,
    auth: false,
  },
  {
    title: 'addproducts',
    component: AddProductContainer,
    url: '/add-products',
    exact: true,
    auth: false,
  },
];
