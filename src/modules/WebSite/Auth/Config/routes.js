import LoginForm from 'src/modules/WebSite/Auth/Container/AuthLayout';

export default [
  {
    title: 'LoginForm',
    component: LoginForm,
    url: '/login',
    exact: true,
    auth: false,
  },
];
