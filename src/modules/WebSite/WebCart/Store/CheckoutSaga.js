import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { CHECKOUT_REQUEST, checkoutFailure, checkoutSuccess } from '../Store/CheckoutAction';

function* handleCheckout(action) {
  try {
    const response = yield call(
      axios.post,
      `https://dev.unleashpos.com/api/v1/sales`, 
      action.payload,
    );

    // Dispatch success action with the order data
    yield put(checkoutSuccess(response.data));
  } catch (error) {
    yield put(checkoutFailure(error.message || 'Checkout failed.'));
  }
}

export default function* watchCheckoutSaga() {
  yield takeLatest(CHECKOUT_REQUEST, handleCheckout);
}
