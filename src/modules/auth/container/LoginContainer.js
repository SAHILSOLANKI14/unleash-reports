import React from "react";
import { Form } from "src/components/shared";
import LoginForm from "../components/LoginForm";
import { Typography } from "@mui/material";
import Spacer from "src/components/shared/Spacer";

function LoginContainer() {
  return (
    <>
      <Typography variant="h3" color="secondary" textAlign='center'>
        Log in to UnleshPOS
      </Typography>
      <Spacer x={2} y={2} />
      <LoginForm />
      <Spacer x={2} y={2} />
      <Typography
        variant="body1"
        color="textPrimary"
        component="div"
        textAlign="center"
      >
        Not a member?{" "}
        <Typography variant="body1" color="secondary" component="span">
          Register Now
        </Typography>
      </Typography>
    </>
  );
}

export default LoginContainer;
