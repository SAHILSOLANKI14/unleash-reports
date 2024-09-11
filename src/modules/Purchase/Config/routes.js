import Purchase from 'src/modules/Purchase/Container/PurchaseContainer';

export default [
  {
    title: 'purchases',
    component: Purchase,
    url: '/purchases',
    exact: true,
    auth: false,
  },
];
