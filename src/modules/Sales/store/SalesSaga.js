// sagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../store/SalesTypes';
import { fetchSalesData } from '../api/SalesApi';
import { fetchDetailData } from '../api/DetailsApi';
import {
  fetchSalesSuccess,
  fetchSalesFailure,
  fetchDetailSuccess,
  fetchDetailFailure,
} from '../store/SalesAction';

function* fetchSalesSaga(action) {
  try {
    const { status, pageNo, perPage } = action.payload;
    const start = pageNo * perPage + 1;
    const limit = perPage;
    const data = { start, limit, status: status || '' };
    const response = yield call(fetchSalesData, data);
    if (response.status === true) {
      yield put(fetchSalesSuccess(response.data, response.total));
    } else {
      yield put(fetchSalesFailure('Error fetching sales data'));
    }
  } catch (error) {
    yield put(fetchSalesFailure(error));
  }
}

function* fetchDetailSaga(action) {
  try {
    const { reference } = action.payload;
    const data = { reference, include: 'items' };
    const response = yield call(fetchDetailData, data);
    yield put(fetchDetailSuccess(response));
  } catch (error) {
    yield put(fetchDetailFailure(error));
  }
}

export default function* SalesSaga() {
  yield takeLatest(types.FETCH_SALES_REQUEST, fetchSalesSaga);
  yield takeLatest(types.FETCH_DETAIL_REQUEST, fetchDetailSaga);
}
