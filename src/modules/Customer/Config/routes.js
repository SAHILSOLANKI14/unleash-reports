import customers from 'src/modules/Customer/Container/CustomerContainer';
import AddCustomer from 'src/modules/Sales/components/AddCustomer';
export default [
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
];
