import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchproductDetailData } from 'src/modules/Categories/API/ProductDetail';
import {
  FETCH_PRODUCT_REQUEST,
  fetchProductFailure,
  fetchProductSuccess,
  FETCH_PRODUCTCATE_REQUEST,
  fetchProductCateSuccess,
  fetchProductCateFailure,
} from '../Store/productAction';
import { fetchproductData } from 'src/modules/Categories/API/ProductsApi';

function* fetchProductSaga(action) {
  try {
    const product = yield call(fetchproductDetailData, action.payload); // Fetch product by ID
    yield put(fetchProductSuccess(product));
  } catch (error) {
    yield put(fetchProductFailure(error.message));
  }
}
function* fetchProductcateSaga(action) {
  try {
    const Cateproduct = yield call(fetchproductData, action.payload); // Fetch product by ID
    yield put(fetchProductCateSuccess(Cateproduct));
  } catch (error) {
    yield put(fetchProductCateFailure(error.message));
  }
}

export function* productWatcherSaga() {
  yield takeLatest(FETCH_PRODUCT_REQUEST, fetchProductSaga);
}
export function* CateproductWatcherSaga() {
  yield takeLatest(FETCH_PRODUCTCATE_REQUEST, fetchProductcateSaga);
}

export { fetchProductSaga };
export { fetchProductcateSaga };
