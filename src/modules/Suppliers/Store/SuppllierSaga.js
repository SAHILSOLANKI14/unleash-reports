// // src/modules/Suppliers/Store/SupplierSaga.js

// import { call, put, takeEvery } from 'redux-saga/effects';
// import { fetchSupplierSuccess, fetchSupplierFailure } from './SupplierAction';
// import { fetchSupplierData } from '../api/SupplierApi';
// import { FETCH_SUPPLIER_REQUEST } from './SupplierTypes';
// // Saga to handle fetching supplier data
// export function* fetchSupplierSaga() {
//   try {
//     const response = yield call(fetchSupplierData()); // Call the API
//     if (response && response.data) {
//       yield put(fetchSupplierSuccess(response));
//       console.log('response', response); // Dispatch success action with data
//     } else {
//       throw new Error('No data found');
//     }
//   } catch (error) {
//     yield put(fetchSupplierFailure(error.message)); // Dispatch failure action with error message
//   }
// }

// // Root saga that watches for FETCH_SUPPLIER_REQUEST actions
// function* rootSaga() {
//   yield takeEvery(FETCH_SUPPLIER_REQUEST, fetchSupplierSaga);
// }

// export default rootSaga;
