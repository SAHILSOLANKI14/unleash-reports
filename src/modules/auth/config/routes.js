
import LoginContainer from "../container/LoginContainer";

export default [
  {
    title: "Login",
    component: LoginContainer,
    url: "/auth/login",
    exact: true,
    auth: false,
  },
];
