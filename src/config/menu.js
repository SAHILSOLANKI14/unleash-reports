import Icon from 'src/components/App/Icon';

export const menuItems = [
  {
    title: 'Dashboard',
    link: '/',
    icon: <Icon name="dashboard" />,
  },
  {
    key: 'products',
    title: 'products',
    // link: '/products',
    icon: <Icon name="Product" />,
    children: [
      { title: 'List Product', link: '/products', icon: '-' },
      { title: 'Add Product', link: '/products/add', icon: '-' },
      { title: 'Import Product', link: '/products/c', icon: '-' },
      { title: 'Print Barcode/Label', link: '/products/d', icon: '-' },
      { title: 'Print Catalog', link: '/products/e', icon: '-' },
      { title: 'Draft Products', link: '/products/f', icon: '-' },
      { title: 'Private Product', link: '/products/', icon: '-' },
    ],
  },
  {
    key: 'Orders',
    title: 'Orders',
    // link: '/sales',
    icon: <Icon name="orders" />,
    children: [
      { title: 'List Orders', link: '/sales', icon: '-' },
      { title: 'Add Orders', link: '/sales/add', icon: '-' },
      { title: 'Completed Orders', link: 'add-products', icon: '-' },
      { title: 'Pending Orders', link: 'add-products', icon: '-' },
      { title: 'Promotion List', link: 'add-products', icon: '-' },
      { title: 'Import Sales', link: 'add-products', icon: '-' },
    ],
  },
  {
    key: 'purcahses',
    title: 'purcahses',
    // link: '/purcahses',
    icon: <Icon name="purchases" />,
    children: [
      { title: 'List Purcahses', link: '/purchases', icon: '-' },
      { title: 'Add Purcahses', link: '/purchases/add', icon: '-' },
    ],
  },
  {
    key: 'people',
    title: 'people',
    // link: '/suppliers',
    icon: <Icon name="people" />,
    children: [
      { title: 'List Users', link: '/users', icon: '-' },
      { title: 'Add Users', link: '/products/4', icon: '-' },
      { title: 'List Billers', link: '/biller', icon: '-' },
      { title: 'Add Billers', link: '/products/5', icon: '-' },
      { title: 'List Customer', link: '/customers', icon: '-' },
      { title: 'Add Customer', link: '/add-customers', icon: '-' },
      { title: 'List Suppliers', link: '/suppliers', icon: '-' },
      { title: 'Add Suppliers', link: '/products/8', icon: '-' },
    ],
  },
  {
    key: 'settings',
    title: 'Settings',
    link: '/settings',
    icon: <Icon name="settings" />,
    children: [
      { title: 'Product A', link: '/products/a', icon: '-' },
      { title: 'Product B', link: '/products/b', icon: '-' },
    ],
  },
  {
    key: 'billing',
    title: 'Billing & payments',
    link: '/billing',
    icon: <Icon name="billing" />,
    children: [
      { title: 'Product A', link: '/products/a', icon: '-' },
      { title: 'Product B', link: '/products/b', icon: '-' },
    ],
  },
  {
    key: 'Account',
    title: 'Account',
    link: '/myaccount',
    icon: <Icon name="myaccount" />,
    children: [
      { title: 'Product A', link: '/products/a', icon: '-' },
      { title: 'Product B', link: '/products/b', icon: '-' },
    ],
  },
];
