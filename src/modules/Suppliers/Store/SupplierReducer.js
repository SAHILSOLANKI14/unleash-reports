// src/redux/reducer.js
import {
  FETCH_SUPPLIER_REQUEST,
  FETCH_SUPPLIER_SUCCESS,
  FETCH_SUPPLIER_FAILURE,
} from './SupplierTypes';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const supplierReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUPPLIER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SUPPLIER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case FETCH_SUPPLIER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default supplierReducer;
