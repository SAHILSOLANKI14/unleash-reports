import * as authTypes from './authTypes';

export const login = (data, resolve, reject) => ({
  type: authTypes.LOGIN,
  data,
  resolve,
  reject,
});
export const sessionData = (data, resolve, reject) => ({
  type: authTypes.RESTORE_SESSION,
  data,
  resolve,
  reject,
});

export const restoreSession = () => ({ type: authTypes.RESTORE_SESSION });

export const setAuthUser = (user) => ({ type: authTypes.SET_AUTH_USER, user });

