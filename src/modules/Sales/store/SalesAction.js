// SalesAction.js
import { SALES_SUCCESS, SALES_FAILURE, SALES_REQUEST } from './SalesTypes';

// Action creator for loading state
export const setSalesDataLoading = (loading) => ({
  type: SALES_REQUEST,
  payload: loading,
});

// Action creator for successful data fetch
export const setSalesData = (data) => ({
  type: SALES_SUCCESS,
  payload: data,
});

// Action creator for failed data fetch
export const fetchSalesDataFailure = (error) => ({
  type: SALES_FAILURE,
  payload: error,
});
