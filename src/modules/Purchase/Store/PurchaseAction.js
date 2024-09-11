import { PURCHASE_SUCCESS, PURCHASE_FAILURE, PURCHASE_REQUEST } from './PurchaseTypes';

export const setpurchasedataLoading = (loading) => ({
  type: PURCHASE_REQUEST,
  payload: loading,
});
export const setpurchasedata = (data) => ({
  type: PURCHASE_SUCCESS,
  payload: data,
});

export const fetchpurchasedataFailure = (error) => ({
  type: PURCHASE_FAILURE,
  payload: error,
});
