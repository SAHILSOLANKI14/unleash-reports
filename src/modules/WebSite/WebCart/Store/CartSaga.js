// src/store/cartSagas.js

import { put, takeLatest, select } from 'redux-saga/effects';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  setCartItems,
} from '../Store/CartAction';

// Helper function to save cart items to localStorage
function saveCartToLocalStorage(cartItems) {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Selector to get the current cart items
const selectCartItems = (state) => state.cart.items;

// Add to Cart Saga
function* addToCartSaga(action) {
  const item = action.payload;
  const items = yield select(selectCartItems);
  const existingItem = items.find((i) => i.id === item.id);

  let updatedCart;
  if (existingItem) {
    updatedCart = items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
  } else {
    updatedCart = [...items, { ...item, quantity: 1 }];
  }

  yield put(setCartItems(updatedCart));
  saveCartToLocalStorage(updatedCart);
}

// Remove from Cart Saga
function* removeFromCartSaga(action) {
  const items = yield select(selectCartItems);
  const updatedCart = items.filter((item) => item.id !== action.payload);

  yield put(setCartItems(updatedCart));
  saveCartToLocalStorage(updatedCart);
}

// Increment Quantity Saga
function* incrementQuantitySaga(action) {
  const items = yield select(selectCartItems);
  const updatedCart = items.map((item) =>
    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item,
  );

  yield put(setCartItems(updatedCart));
  saveCartToLocalStorage(updatedCart);
}

// Decrement Quantity Saga
function* decrementQuantitySaga(action) {
  const items = yield select(selectCartItems);
  const updatedCart = items
    .map((item) =>
      item.id === action.payload && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    )
    .filter((item) => item.quantity > 0);

  yield put(setCartItems(updatedCart));
  saveCartToLocalStorage(updatedCart);
}

// Watcher Saga
function* cartSaga() {
  yield takeLatest(ADD_TO_CART, addToCartSaga);
  yield takeLatest(REMOVE_FROM_CART, removeFromCartSaga);
  yield takeLatest(INCREMENT_QUANTITY, incrementQuantitySaga);
  yield takeLatest(DECREMENT_QUANTITY, decrementQuantitySaga);
}

export default cartSaga;
