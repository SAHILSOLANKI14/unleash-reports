import {
  FETCH_CUSTOMER_REQUEST,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CUSTOMER_FAILURE,
} from './CustomerTypes';
// Action Creators
export const fetchcustomerRequest = () => ({
  type: FETCH_CUSTOMER_REQUEST,
});

export const fetchcustomerSuccess = (data) => ({
  type: FETCH_CUSTOMER_SUCCESS,
  payload: data,
});

export const fetchcustomerFailure = (error) => ({
  type: FETCH_CUSTOMER_FAILURE,
  payload: error,
});
