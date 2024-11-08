import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_PURCHASE_DATA_REQUEST,
  FETCH_PURCHASE_DATA_SUCCESS,
  FETCH_PURCHASE_DATA_FAILURE,
  FETCH_DETAIL_DATA_REQUEST,
  FETCH_DETAIL_DATA_SUCCESS,
  FETCH_DETAIL_DATA_FAILURE,
} from '../Store/PurchaseAction';
import { fetchpurchaseDetailData } from '../api/LatestPurchaseApi';
import { fetchDetailData } from '../api/purchaseDetail';
import axios from 'axios';

function* fetchPurchaseDataSaga(action) {
  const { pageNo, rowsPerPage } = action.payload;
  try {
    const data = {
      start: pageNo * rowsPerPage + 1,
      limit: rowsPerPage,
    };
    const response = yield call(fetchpurchaseDetailData, data);
    yield put({ type: FETCH_PURCHASE_DATA_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: FETCH_PURCHASE_DATA_FAILURE, payload: error.message });
  }
}

function* fetchDetailDataSaga(action) {
  const { reference_no } = action.payload;
  try {
    const detailResponse = yield call(fetchDetailData, { reference: reference_no, include: 'items' });
    const supplier_id = detailResponse?.data?.[0]?.supplier_id;

    const addressResponse = yield call(axios.post, 'https://dev.unleashpos.com/api/v1/companies', {
      'api-key': 'kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos',
      company_id: supplier_id,
    });

    yield put({
      type: FETCH_DETAIL_DATA_SUCCESS,
      payload: {
        detailData: detailResponse,
        addressData: addressResponse?.data?.data?.[0] || {},
      },
    });
  } catch (error) {
    yield put({ type: FETCH_DETAIL_DATA_FAILURE, payload: error.message });
  }
}

export function* watchPurchaseData() {
  yield takeLatest(FETCH_PURCHASE_DATA_REQUEST, fetchPurchaseDataSaga);
  yield takeLatest(FETCH_DETAIL_DATA_REQUEST, fetchDetailDataSaga);
}
