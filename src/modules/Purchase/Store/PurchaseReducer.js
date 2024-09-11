import { PURCHASE_REQUEST, PURCHASE_SUCCESS, PURCHASE_FAILURE } from '../Store/PurchaseTypes';

const initialState = {
  data: [],
  error: null,
  loading: false,
};

const PurchaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_REQUEST:
      return { ...state, loading: true, error: null };
    case PURCHASE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };

    case PURCHASE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
export default PurchaseReducer;
