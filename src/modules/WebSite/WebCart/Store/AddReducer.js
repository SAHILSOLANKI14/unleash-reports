import {
  FETCH_ADDRESS_REQUEST,
  FETCH_ADDRESS_SUCCESS,
  FETCH_ADDRESS_FAILURE,
} from '../Store/Addaction';

const initialState = {
  addressData: null,
  loading: false,
  error: null,
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADDRESS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ADDRESS_SUCCESS:
      return { ...state, loading: false, addressData: action.payload };
    case FETCH_ADDRESS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default addressReducer;
