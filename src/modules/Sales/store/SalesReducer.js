// reducers.js
import { LoadingContainer } from 'src/layout/AppLoader';
import * as types from '../store/SalesTypes';

const initialState = {
  salesData: [],
  total: 0,
  detailData: [],
  error: null,
};

export const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SALES_SUCCESS:
      return {
        ...state,
        salesData: action.payload.data,
        Loading: false,
        total: action.payload.total,
      };
    case types.FETCH_SALES_FAILURE:
      return {
        ...state,
        salesData: [],
        Loading: false,
        total: 0,

        error: action.payload,
      };
    case types.FETCH_DETAIL_SUCCESS:
      return {
        ...state,
        detailData: action.payload,
      };
    case types.FETCH_DETAIL_FAILURE:
      return {
        ...state,
        detailData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
