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
    console.log('Handling login in saga...');
    const res = yield call(authApi.loginUser, {
      ...data,
      identity: data.email,
      password: data.password,
    });

    const Response = res.data;

    if (Response.company_id && Response.user_id) {
      localStorage.setItem('company_id', Response.company_id);
      localStorage.setItem('user_id', Response.user_id);
      storage.set('TOKEN', JSON.stringify(Response.token));
      console.log('company_id stored:', Response.company_id);

      yield put({ type: authTypes.LOGIN, data: Response });
      resolve(Response);
    } else {
      yield put({ type: authTypes.LOGOUT });
      toast.error('Company ID not found. Login failed.');
      reject(new Error('Company ID not found'));
    }
  } catch (error) {
    console.log('Error in login saga:', error);
    // yield put({ type: authTypes.LOGOUT });
    storage.del('TOKEN');
    // reject(error);
  }
}

function* restoreSession({ data, resolve, reject }) {
  try {
    yield put(setAppLoading(true));

    const token = storage.get('TOKEN');
    const companyId = localStorage.getItem('user_id');

    if (companyId) {
      const res = yield call(authApi.getProfile, { company_id: companyId });
      yield put({ type: authTypes.RESTORE_SESSION, data: res.data });
      resolve(res.data);
    } else {
      // If no valid session, log the user out
      yield put({ type: authTypes.LOGOUT });
      storage.del('TOKEN');
      // localStorage.removeItem('company_id');
      // reject(new Error('Session not found'));
    }
  } catch (error) {
    // yield put({ type: authTypes.LOGOUT });
    storage.del('TOKEN');
    // localStorage.removeItem('company_id');
    // reject(error);
  } finally {
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
