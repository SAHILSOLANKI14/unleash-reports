// import { takeLatest, call, put } from 'redux-saga/effects';
// import * as SalesTypes from './SalesTypes';
// import { fetchSalesData } from '../api/SalesApi';
// import { setSalesData, fetchSalesDataFailure } from './SalesAction';

// function* handleSalesRequest(action, resolve, reject) {
//   console.log('123');
//   try {
//     const { data } = action.payload;
//     // const response = yield call(fetchSalesData(data));
//     // yield put(setSalesData(response));
//   } catch (error) {
//     yield put(fetchSalesDataFailure(error));
//     reject(error);
//   }
// }

// export function* watchSales() {
//   yield takeLatest(SalesTypes.SALES_REQUEST, handleSalesRequest);
// }
// export default function* runSagas() {
//   yield all([fork(watchSagas)]);
// }
