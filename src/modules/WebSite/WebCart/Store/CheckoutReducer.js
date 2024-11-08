import { CHECKOUT_REQUEST, CHECKOUT_SUCCESS, CHECKOUT_FAILURE } from '../Store/CheckoutAction';

const initialState = {
  order: null,
  loading: false,
  error: null,
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return { ...state, loading: true, error: null };
    case CHECKOUT_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case CHECKOUT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default checkoutReducer;
