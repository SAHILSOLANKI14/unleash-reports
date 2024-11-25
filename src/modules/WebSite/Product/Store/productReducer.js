import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCTCATE_REQUEST,
  FETCH_PRODUCTCATE_SUCCESS,
  FETCH_PRODUCTCATE_FAILURE,
} from '../Store/productAction';

// Retrieve initial state from localStorage
const getInitialState = (key, defaultValue) => {
  const storedState = localStorage.getItem(key);
  return storedState ? JSON.parse(storedState) : defaultValue;
};

const initialState = {
  product: null,
  data: null,
  loading: false,
  error: null,
};

// Product Reducer
export const productReducer = (state = getInitialState('productState', initialState), action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCT_SUCCESS:
      const updatedState = { ...state, loading: false, product: action.payload };
      localStorage.setItem('productState', JSON.stringify(updatedState)); // Save to localStorage
      return updatedState;
    case FETCH_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Category Product Reducer
export const CateproductReducer = (
  state = getInitialState('SingleProduct', initialState),
  action,
) => {
  switch (action.type) {
    case FETCH_PRODUCTCATE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTCATE_SUCCESS:
      const updatedCateState = { ...state, loading: false, product: action.payload };
      localStorage.setItem('SingleProduct', JSON.stringify(updatedCateState)); // Save to localStorage
      return updatedCateState;
    case FETCH_PRODUCTCATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
