// src/store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../api/AuthApi'; // Adjust path as needed
import { loginUser } from 'src/modules/auth/api/authApi';

// Async action for login
export const login = createAsyncThunk('/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginUser(credentials);
    console.log('response', response);
    const Response = response.data;
    if (Response.company_id) {
      localStorage.setItem('Company_id', Response.company_id);
      localStorage.setItem('token', Response.token); // Save token to local storage
      return response.data;
    } else {
      return console.log('Company ID not found');
    }
  } catch (error) {
    return rejectWithValue(error.message || 'Login failed');
  }
});

// Async action for logout
export const logout = createAsyncThunk('/logout', async (_, { rejectWithValue }) => {
  try {
    localStorage.removeItem('Company_id');
    localStorage.removeItem('token');
    localStorage.removeItem('cartItems');
    window.location.reload();
    return {}; // Return an empty object on success
  } catch (error) {
    return rejectWithValue(error.message || 'Logout failed');
  }
});
// Async action for restoring session
export const webrestoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const companyId = localStorage.getItem('Company_id');
      console.log('Restoring session:', { token, companyId });

      if (token && companyId) {
        return { token, company_id: companyId };
      } else {
        return rejectWithValue('No session found');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to restore session');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(webrestoreSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(webrestoreSession.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(webrestoreSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Do not set isAuthenticated to false if company_id exists in localStorage
        if (!localStorage.getItem('Company_id')) {
          state.isAuthenticated = false;
        }
      });
  },
});

export default authSlice.reducer;
