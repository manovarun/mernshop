import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: 'PayPal',
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: () => initialState,
    addToCart: (state, action) => {
      const { product } = action.payload;
      const itemInCart = state.cartItems.find(
        (item) => item.product === product.product
      );
      if (itemInCart) {
        itemInCart.qty = itemInCart.qty + Number(product.qty);
      } else {
        state.cartItems.push({ ...product, qty: Number(product.qty) });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.product === action.payload
      );
      item.qty++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.product === action.payload
      );
      if (item.qty === 1) {
        item.qty = 1;
      } else {
        item.qty--;
      }
    },
    removeCartItem: (state, action) => {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );
      state.cartItems = updatedCartItems;
    },
    addShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    addPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeCartItem,
  addShippingAddress,
  addPaymentMethod,
} = CartSlice.actions;

export default CartSlice.reducer;
