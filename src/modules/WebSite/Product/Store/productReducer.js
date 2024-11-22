import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCTCATE_REQUEST,
  FETCH_PRODUCTCATE_SUCCESS,
  FETCH_PRODUCTCATE_FAILURE,
} from '../Store/productAction';

const initialState = {
  product: null,
  data: null,
  loading: false,
  error: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCT_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case FETCH_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export const CateproductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTCATE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTCATE_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case FETCH_PRODUCTCATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
