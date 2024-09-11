import SalesContainer from 'src/modules/Sales/components/SalesContainer';
import AddSalescontainer from '../container/AddSalescontainer';
export default [
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
];
