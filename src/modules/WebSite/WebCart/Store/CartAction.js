// src/store/cartActions.js

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';
export const SET_CART_ITEMS = 'SET_CART_ITEMS';

export const addToCartRequest = (product) => ({ type: ADD_TO_CART, payload: product });
export const removeFromCartRequest = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});
export const incrementQuantityRequest = (productId) => ({
  type: INCREMENT_QUANTITY,
  payload: productId,
});
export const decrementQuantityRequest = (productId) => ({
  type: DECREMENT_QUANTITY,
  payload: productId,
});
export const setCartItems = (items) => ({ type: SET_CART_ITEMS, payload: items });
