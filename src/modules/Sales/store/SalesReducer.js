// salesReducer.js
import { SALES_SUCCESS, SALES_FAILURE, SALES_REQUEST } from './SalesTypes';

const initialState = {
  data: [],
  error: null,
  loading: false,
};

const salesReducer = (state = initialState, action) => {
  if (!action || !action.type) {
    console.error('Invalid action:', action);
    return state;
  }
  switch (action.type) {
    case SALES_REQUEST:
      return { ...state, loading: action.payload };
    case SALES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case SALES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default salesReducer;
