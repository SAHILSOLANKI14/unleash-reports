// actions.js
import * as types from '../store/SalesTypes';

export const fetchSalesRequest = (status, pageNo, perPage) => ({
  type: types.FETCH_SALES_REQUEST,
  payload: { status, pageNo, perPage },
});

export const fetchSalesSuccess = (data, total) => ({
  type: types.FETCH_SALES_SUCCESS,
  payload: { data, total },
});

export const fetchSalesFailure = (error) => ({
  type: types.FETCH_SALES_FAILURE,
  payload: error,
});

export const fetchDetailRequest = (reference) => ({
  type: types.FETCH_DETAIL_REQUEST,
  payload: { reference },
});

export const fetchDetailSuccess = (data) => ({
  type: types.FETCH_DETAIL_SUCCESS,
  payload: data,
});

export const fetchDetailFailure = (error) => ({
  type: types.FETCH_DETAIL_FAILURE,
  payload: error,
});
