import customers from 'src/modules/Customer/Container/CustomerContainer';

export default [
  {
    title: 'customers',
    component: customers,
    url: '/customers',
    exact: true,
    auth: false,
  },
];
