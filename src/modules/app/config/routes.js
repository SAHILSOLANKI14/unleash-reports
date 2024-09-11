import DashboardContainer from '../container/DashboardContainer';
import AppointmentContainer from '../container/AppointmentContainer';
import SalesContainer from '../../Sales/container/SalesContainer';
import ProductsContainer from '../../Categories/Container/ProductsContainer';
import supplier from 'src/modules/Suppliers/Container/supplier';
import customers from 'src/modules/Customer/Container/CustomerContainer';
import PurchaseContainer from 'src/modules/Purchase/Container/PurchaseContainer';
import AddSalescontainer from 'src/modules/Sales/container/AddSalescontainer';
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
    title: 'sales',
    component: SalesContainer,
    url: '/sales',
    exact: true,
    auth: false,
  },
  {
    title: 'addsales',
    component: AddSalescontainer,
    url: '/add-sales',
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
    title: 'purchases',
    component: PurchaseContainer,
    url: '/purchases',
    exact: true,
    auth: false,
  },
];
