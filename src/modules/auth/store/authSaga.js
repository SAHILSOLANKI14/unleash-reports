import { all, fork, put, call, select, takeLatest } from 'redux-saga/effects';
import * as authTypes from './authTypes';
import { setAppLoading } from 'src/modules/app/store/appActions';
import * as authApi from '../api/authApi';
import storage from 'src/utils/storageUtils';
import toast from 'src/utils/toast';
import { WindPower } from '@mui/icons-material';
import { push } from 'connected-react-router';

function* handleLogin({ data, resolve, reject }) {
  try {
    const res = yield call(authApi.loginUser, {
      ...data,
      identity: data.email,
      password: data.password,
    });
    console.log('response :', res.data);
    const Response = res.data;
    console.log('data :', data);
    if (Response.company_id) {
      localStorage.setItem('company_id', Response.company_id);
      console.log('company_id stored: ', Response.company_id);
    } else {
      console.log('company_id not found in response');
    }
    // if (res.token) {
    //   console.log('tokennnnn :', res.token);
    //   storage.set('TOKEN', JSON.stringify(res.token));
    //   console.log('token', res.token);
    // } else {
    //   toast.error('Error occured! Please try again.');
    // }
  } catch (error) {
    console.log(error);
    storage.del('TOKEN');
    reject(error);
  }
}

function* restoreSession({ data, resolve, reject }) {
  try {
    yield put(setAppLoading(true));
    const token = storage.get('TOKEN');
    const userId = localStorage.getItem('company_id');
    // const userIdObj = JSON.parse(token);
    const userIdObj = JSON.parse(userId);
    console.log(userIdObj, 'TOKEN');
    console.log(userIdObj, 'company_id');
    if (userId && userId !== '') {
      const res = yield call(authApi.getProfile, { ...data, token, company_id: userId });
      console.log('getProfileRes :', res);
      resolve(res);
    } else {
      toast.error('User ID not found in local storage');
    }
    if (userIdObj && userIdObj !== '') {
      const res = yield call(authApi.getProfile, { ...data, token: userIdObj });
      console.log('getProfileRes :', res);
      if (userIdObj === '') {
        toast.error('User ID not found in local storage');
      }
    }
    yield put(setAppLoading(false));
  } catch (error) {
    // console.log();
    console.log('error', error);
    yield put(setAppLoading(false));
  }
}
export function* watchSagas() {
  yield takeLatest(authTypes.LOGIN, handleLogin);
  yield takeLatest(authTypes.RESTORE_SESSION, restoreSession);
}

export default function* runSagas() {
  yield all([fork(watchSagas)]);
}
