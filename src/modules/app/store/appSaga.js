import { all, fork, put, call, select, takeLatest } from 'redux-saga/effects';
import * as appTypes from './appTypes';
import * as appActions from './appActions';

export function* watchSagas() {}
export default function* runSagas() {
  yield all([fork(watchSagas)]);
}
