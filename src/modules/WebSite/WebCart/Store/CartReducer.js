// src/store/cartReducer.js
import { SET_CART_ITEMS } from '../Store/CartAction';
const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};
