import { PRODUCTS_SUCCESS, PRODUCTS_FAILURE, PRODUCTS_REQUEST } from './productsType';

export const setproductsDataLoading = (loading) => ({
  type: PRODUCTS_REQUEST,
  payload: loading,
});
export const setproductsData = (data) => ({
  type: PRODUCTS_SUCCESS,
  payload: data,
});

export const fetchproductsDataFailure = (error) => ({
  type: PRODUCTS_FAILURE,
  payload: error,
});
