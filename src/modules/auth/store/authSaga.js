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
    console.log('response :', res);
    console.log('data :', data);
    if (res.token) {
      console.log('tokennnnn :', res.token);
      storage.set('TOKEN', JSON.stringify(res.token));
      console.log('token', res.token);
    } else {
      toast.error('Error occured! Please try again.');
    }
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
    const userIdObj = JSON.parse(token);
    console.log(userIdObj, 'TOKEN');
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
