// src/components/LoginForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { login } from '../Store/authslice'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      identity: '',
      password: '',
    },
    validationSchema: Yup.object({
      identity: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      const resultAction = await dispatch(login(values));
      if (login.fulfilled.match(resultAction)) {
        navigate('/home'); // Navigate to dashboard on successful login
      }
    },
  });

  return (
    <>
      <Box>
        <Typography variant="h3" sx={{ textAlign: 'center', color: '#2277f5', mb: 0 }}>
          Login To UnleashPOS
        </Typography>
      </Box>
      <Box maxWidth="800px" mx="auto" mt={2} p={0} borderRadius="8px">
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            {...formik.getFieldProps('identity')}
            error={formik.touched.identity && Boolean(formik.errors.identity)}
            helperText={formik.touched.identity && formik.errors.identity}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <Typography variant="h5">Forgot Password ?</Typography>
          </Box>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: ' gray',
                    '&.Mui-checked': {
                      color: ' #2277f5',
                    },
                  }}
                />
              }
              color="secondary"
              label="Remember me"
            />
          </FormGroup>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Box mt={2} position="relative">
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Log in'}
            </Button>
            <Typography
              variant="h4"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                p: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Not a member?
              <Typography variant="h4" sx={{ color: ' #2277f5', mr: 1 }}>
                Register Now
              </Typography>
            </Typography>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default LoginForm;
