import DashboardContainer from '../container/DashboardContainer';
import AppointmentContainer from '../container/AppointmentContainer';
import SalesContainer from '../../Sales/container/SalesContainer';
import ProductsContainer from '../../Categories/Container/ProductsContainer';
import supplier from 'src/modules/Suppliers/Container/supplier';
import customers from 'src/modules/Customer/Container/CustomerContainer';
import PurchaseContainer from 'src/modules/Purchase/Container/PurchaseContainer';
import addPurchaseContainer from 'src/modules/Purchase/Container/AddPurchaseContainer';
import AddSalescontainer from 'src/modules/Sales/container/AddSalescontainer';
import POS from 'src/modules/POS/Container/POSContainer';
import AddProductContainer from 'src/modules/Categories/Container/AddProductContainer';
import AddCustomer from 'src/modules/Sales/components/AddCustomer';
import WebHome from 'src/modules/WebSite/WebHome/Container/HomeDash';
import LoginForm from 'src/modules/WebSite/Auth/Component/LoginForm';
import Checkout from 'src/modules/WebSite/WebCart/Component/Checkout';
import SingleProductPage from 'src/modules/WebSite/Product/component/SingleProductPage';
import categoryContainer from 'src/modules/WebSite/Category/container.js/categoryContainer';
import AbbreviationsContainer from 'src/modules/WebSite/Abbreviation/Component/AbbreviationsContainer';
import PromotionContainer from 'src/modules/WebSite/Promotion/Container/PromotionContainer';
export default [
  {
    title: 'dashboard',
    component: DashboardContainer,
    url: '/',
    exact: true,
    auth: false,
  },
  {
    title: 'appointment',
    component: AppointmentContainer,
    url: '/appointment',
    exact: true,
    auth: false,
  },
  {
    title: 'suppliers',
    component: supplier,
    url: '/suppliers',
    exact: true,
    auth: false,
  },
  {
    title: 'customers',
    component: customers,
    url: '/customers',
    exact: true,
    auth: false,
  },
  {
    title: 'addcustomers',
    component: AddCustomer,
    url: '/add-customers',
    exact: true,
    auth: false,
  },
  {
    title: 'sales',
    component: SalesContainer,
    url: '/sales',
    exact: true,
    auth: false,
  },
  {
    title: 'addsales',
    component: AddSalescontainer,
    url: '/sales/add',
    exact: true,
    auth: false,
  },
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
    url: '/products/add',
    exact: true,
    auth: false,
  },
  {
    title: 'purchases',
    component: PurchaseContainer,
    url: '/purchases',
    exact: true,
    auth: false,
  },
  {
    title: 'AddPurchases',
    component: addPurchaseContainer,
    url: '/purchases/add',
    exact: true,
    auth: false,
  },
  {
    title: 'pos',
    component: POS,
    url: '/pos',
    exact: true,
    auth: false,
  },
  {
    title: 'Home',
    component: WebHome,
    url: '/home',
    exact: true,
    auth: false,
  },
  {
    title: 'LoginForm',
    component: LoginForm,
    url: '/login',
    exact: true,
    auth: false,
  },
  {
    title: 'Checkout',
    component: Checkout,
    url: '/checkout',
    exact: true,
    auth: false,
  },
  {
    title: 'productpage',
    component: SingleProductPage,
    url: '/product/:id',
    exact: true,
    auth: false,
  },
  {
    title: 'category',
    component: categoryContainer,
    url: '/category/:id',
    exact: true,
    auth: false,
  },
  {
    title: 'abbreviations',
    component: AbbreviationsContainer,
    url: '/abbreviations',
    exact: true,
    auth: false,
  },
  {
    title: 'promotion',
    component: PromotionContainer,
    url: '/promotion',
    exact: true,
    auth: false,
  },
];
