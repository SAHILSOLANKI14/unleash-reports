// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

// Load cart items from local storage, if available
const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : initialState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(state)); // Persist to storage
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state)); // Persist to storage
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(state)); // Persist to storage
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
      localStorage.setItem('cart', JSON.stringify(state)); // Persist to storage
    },
    restoreSession: (state) => {
      const savedCart = loadCartFromStorage();
      return { ...state, ...savedCart }; // Restore cart state
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, restoreSession } =
  cartSlice.actions;
export default cartSlice.reducer;
