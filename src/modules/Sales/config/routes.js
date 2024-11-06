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
    url: '/sales/add',
    exact: true,
    auth: false,
  },
];
