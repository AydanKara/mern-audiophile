import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  paymentMethod: "",
};

const addDecimals = (num) => {
  return Math.round(num * 100) / 100;
};

const calculatePrices = (state) => {
  // Calculate item price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate shipping charges
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 50);

  // Calculate tax charges
  state.taxPrice = Math.floor(addDecimals(Number(0.19 * state.itemsPrice)));
  // Calculate total price
  state.totalPrice = Math.floor(
    Number(state.itemsPrice) + Number(state.shippingPrice)
  );

  state.totalQuantity = state.cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((i) => i._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === existItem._id ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      calculatePrices(state);
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item && item.qty < item.stock) {
        item.qty += 1;
      }
      calculatePrices(state);
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      } else if (item && item.qty === 1) {
        state.cartItems = state.cartItems.filter((i) => i._id !== item._id);
      }
      calculatePrices(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
      calculatePrices(state);
    },
    removeAllItems: (state) => {
      state.cartItems = [];
      calculatePrices(state);
    }
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  removeAllItems,
} = cartSlice.actions;

export default cartSlice.reducer;
