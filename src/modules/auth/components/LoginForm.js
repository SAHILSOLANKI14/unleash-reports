import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Box, Typography } from '@mui/material';
import { Form, Button } from 'src/components/shared';
import { palette } from 'src/config/theme';
import { login, sessionData, salesData } from '../store/authActions';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data, form) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      dispatch(
        login(
          data,
          (response) => {
            console.log('Login successful:', response);
            setLoading(false); // Stop loading on success
            navigate('/');
            resolve(response);
          },
          (error) => {
            console.log('Login error:', error);
            setLoading(false); // Stop loading on error
            reject(error);
          },
        ),
      );
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
        try {
          setLoading(true);
          const res = await handleSubmit(values, form);
          console.log('res', res);
        } catch (error) {
          console.error('Error during form submission:', error);
        } finally {
          setLoading(false); // Ensure loading is stopped after submit completes
        }
      }}
    >
      {(props) => {
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.submitForm();
              navigate('/');
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
            />

            <Box display="flex" alignItems="flex-end" justifyContent="flex-end">
              <Typography>Forgot password?</Typography>
            </Box>

            <Form.Field.Checkbox name="remember" label="Remember me" />

            <Box mt={2}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                loading={loading}
                fullWidth
                size="large"
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
