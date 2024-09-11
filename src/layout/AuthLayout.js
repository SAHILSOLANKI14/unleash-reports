import React from "react";

import Grid from "@mui/material/Grid";
import {
  AuthBg,
  Left,
  Right,
  Logo,
  Icon1,
  Icon2,
  AuthContent,
  AuthContainer,
} from "./styles";

function AuthLayout({ children, ...props }) {
  return (
    <AuthContainer maxWidth="xl">
      <AuthBg>
        <Grid container>
          <Left item xs={12}>
            <Logo />
            <Icon1 />
            <AuthContent>
              <div>{children}</div>
            </AuthContent>
          </Left>
        </Grid>
      </AuthBg>
    </AuthContainer>
  );
}

export default AuthLayout;
