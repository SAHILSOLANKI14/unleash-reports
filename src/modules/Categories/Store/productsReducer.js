import { PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_FAILURE } from '../Store/productsType';

const initialState = {
  data: [],
  error: null,
  loading: false,
};

const CategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case PRODUCTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };

    case PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
export default CategoriesReducer;
