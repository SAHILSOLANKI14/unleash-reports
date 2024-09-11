import { all } from 'redux-saga/effects';
import AuthSagas from 'src/modules/auth/store/authSaga';

function* rootSaga() {
  yield all([AuthSagas()]);
}

export default rootSaga;
