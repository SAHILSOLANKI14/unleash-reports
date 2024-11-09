import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_ADDRESS_REQUEST,
  fetchAddressFailure,
  fetchAddressSuccess,
} from '../Store/Addaction';

function* fetchAddressSaga(action) {
  try {
    const supplier_id = localStorage.getItem('Company_id');
    const addressResponse = yield call(axios.post, 'https://dev.unleashpos.com/api/v1/companies', {
      'api-key': 'kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos', // Your API key
      company_id: supplier_id,
    });

    yield put(fetchAddressSuccess(addressResponse?.data?.data || {}));
  } catch (error) {
    yield put(fetchAddressFailure(error.message || 'Failed to fetch address.'));
  }
}

export default function* watchAddressSaga() {
  yield takeLatest(FETCH_ADDRESS_REQUEST, fetchAddressSaga);
}
