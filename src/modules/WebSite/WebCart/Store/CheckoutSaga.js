import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { CHECKOUT_REQUEST, checkoutSuccess, checkoutFailure } from '../Store/CheckoutAction';
import api from 'src/api';
function* handleCheckout(action) {
  try {
    const response = yield call(
      axios.post,
      `https://dev.unleashpos.com/api/v1/sales?api-key=kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos`,
      action.payload,
    ); // Replace with your API endpoint
    yield put(checkoutSuccess(response.data));
    console.log('first');
  } catch (error) {
    yield put(checkoutFailure(error.message || 'Checkout failed.'));
  }
}

export default function* watchCheckoutSaga() {
  yield takeLatest(CHECKOUT_REQUEST, handleCheckout);
}
