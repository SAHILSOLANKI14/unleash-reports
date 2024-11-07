import * as authTypes from './authTypes';

export const STATUS = Object.freeze({
  success: 'Success',
  Loading: 'Loading',
  error: 'error',
});
const initialState = {
  token: '',
  isAuthenticated: false,
  loading: false,
  data: {},
  error: null,
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case authTypes.LOGIN:
      return { ...state, isAuthenticated: true, status: STATUS.success, data: payload.data };
    case authTypes.RESTORE_SESSION:
      return { ...state, isAuthenticated: true, status: STATUS.success, data: payload.data };
    case authTypes.LOGOUT:
      return { ...state, isAuthenticated: false, data: {}, token: '', loading: false };
    case authTypes.SET_LOADING:
      return { ...state, loading: payload.loading };
    default:
      return state;
  }
};
