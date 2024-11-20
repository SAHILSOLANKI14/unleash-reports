import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_PRODUCT_REQUEST,
  fetchProductSuccess,
  fetchProductFailure,
} from '../Store/productAction';
import { fetchproductDetailData } from 'src/modules/Categories/API/ProductDetail';
import { fetchproductData } from 'src/modules/Categories/API/ProductsApi';

function* fetchProductSaga(action) {
  try {
    const product = yield call(fetchproductDetailData, action.payload); // Fetch product by ID
    yield put(fetchProductSuccess(product));
  } catch (error) {
    yield put(fetchProductFailure(error.message));
  }
}

// function* fetchProduct(action) {
//   try {
//     const product = yield call(fetchproductData, action.payload); // Fetch product by ID
//     yield put(fetchProductSuccess(product));
//   } catch (error) {
//     yield put(fetchProductFailure(error.message));
//   }
// }

export function* productWatcherSaga() {
  yield takeLatest(FETCH_PRODUCT_REQUEST, fetchProductSaga);
}

export { fetchProductSaga };
