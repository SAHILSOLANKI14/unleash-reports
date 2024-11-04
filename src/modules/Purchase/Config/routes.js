import Purchase from 'src/modules/Purchase/Container/PurchaseContainer';
import AddPurchase from 'src/modules/Purchase/Container/AddPurchaseContainer';

export default [
  {
    title: 'purchases',
    component: Purchase,
    url: '/purchases',
    exact: true,
    auth: false,
  },
  {
    title: 'purchases',
    component: AddPurchase,
    url: '/add-purchases',
    exact: true,
    auth: false,
  },
];
