import {
  FETCH_PURCHASE_DATA_REQUEST,
  FETCH_PURCHASE_DATA_SUCCESS,
  FETCH_PURCHASE_DATA_FAILURE,
  FETCH_DETAIL_DATA_REQUEST,
  FETCH_DETAIL_DATA_SUCCESS,
  FETCH_DETAIL_DATA_FAILURE,
} from '../Store/PurchaseAction';

const initialState = {
  purchaseData: [],
  total: 0,
  detailData: null,
  addressData: {},
  loading: false,
  error: null,
};

const purchaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PURCHASE_DATA_REQUEST:
    case FETCH_DETAIL_DATA_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_PURCHASE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        purchaseData: action.payload.data,
        total: action.payload.total,
      };

    case FETCH_DETAIL_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        detailData: action.payload.detailData,
        addressData: action.payload.addressData,
      };

    case FETCH_PURCHASE_DATA_FAILURE:
    case FETCH_DETAIL_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default purchaseReducer;
