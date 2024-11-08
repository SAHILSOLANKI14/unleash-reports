export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

export const checkoutRequest = (payload) => ({
  type: CHECKOUT_REQUEST,
  payload,
});

export const checkoutSuccess = (order) => ({
  type: CHECKOUT_SUCCESS,
  payload: order,
});

export const checkoutFailure = (error) => ({
  type: CHECKOUT_FAILURE,
  payload: error,
});
