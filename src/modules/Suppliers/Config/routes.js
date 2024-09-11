import supplier from 'src/modules/Suppliers/Container/supplier';

export default [
  {
    title: 'suppliers',
    component: supplier,
    url: '/suppliers',
    exact: true,
    auth: false,
  },
];
