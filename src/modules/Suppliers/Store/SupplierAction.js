import {
  FETCH_SUPPLIER_REQUEST,
  FETCH_SUPPLIER_SUCCESS,
  FETCH_SUPPLIER_FAILURE,
} from './SupplierTypes';
// Action Creators
export const fetchSupplierRequest = () => ({
  type: FETCH_SUPPLIER_REQUEST,
});

export const fetchSupplierSuccess = (data) => ({
  type: FETCH_SUPPLIER_SUCCESS,
  payload: data,
});

export const fetchSupplierFailure = (error) => ({
  type: FETCH_SUPPLIER_FAILURE,
  payload: error,
});
