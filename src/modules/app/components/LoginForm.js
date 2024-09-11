import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Box, Typography } from '@mui/material';
import { Form, Button } from 'src/components/shared';
import { palette } from 'src/config/theme';
import { login } from '../store/authActions';

function LoginForm() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data, form) => {
    return new Promise((resolve, reject) => {
      return dispatch(login(data, resolve, reject));
    });
  };

  return (
    <Form
      initialValues={{
        email: '',
        password: '',
        remember: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .trim()
          .email('Enter a valid email address')
          .required('Please enter your email address!'),
        password: Yup.string().required('Please enter your password!'),
      })}
      onSubmit={async (values, form) => {
        setLoading(true);
        handleSubmit(values , form);
        setLoading(false);
        return false;
      }}
    >
      {(props) => {
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.submitForm();
              return false;
            }}
            noValidate
          >
            <Form.Field.Input
              fullWidth
              variant="outlined"
              name="email"
              placeholder="Email"
              disabled={loading}
              autoComplete="on"
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: palette.secondary.main,
                  color: '#ffffff',
                },
                '& .MuiFormHelperText-root': {
                  color: 'rgba(255,255,255,0.84) !important',
                },
              }}
            />

            <Form.Field.Input
              fullWidth
              variant="outlined"
              type="password"
              name="password"
              placeholder="Password"
              color="secondary"
              disabled={loading}
              autoComplete="current-password"
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: palette.secondary.main,
                  color: '#ffffff',
                },
                '& .MuiFormHelperText-root': {
                  color: 'rgba(255,255,255,0.84) !important',
                },
              }}
            />

            <Box display="flex" alignItems="flex-end" justifyContent="flex-end">
              <Typography color="white">Forgot password?</Typography>
            </Box>

            <Form.Field.Checkbox
              name="remember"
              label="Remember me"
              textColor="#ffffff"
              sx={{
                color: '#ffffff',
                '&.Mui-checked': {
                  color: '#ffffff',
                },
              }}
            />

            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                loading={loading}
                fullWidth
                size="large"
                sx={{ backgroundColor: '#ffffff', color: palette.primary.main }}
              >
                Log in
              </Button>
            </Box>
          </form>
        );
      }}
    </Form>
  );
}

export default LoginForm;
