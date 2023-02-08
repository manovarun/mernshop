import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  cartQty: 0,
  shippingAddress: {},
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: () => initialState,
    addToCart: (state, action) => {
      const { product, qty } = action.payload;
      const itemInCart = state.cartItems.find(
        (item) => item._id === product._id
      );
      if (itemInCart) {
        itemInCart.quantity = itemInCart.quantity + Number(qty);
      } else {
        state.cartItems.push({ ...product, quantity: Number(qty) });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeCartItem: (state, action) => {
      const updatedCartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      state.cartItems = updatedCartItems;
    },
    addShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
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
} = CartSlice.actions;

export default CartSlice.reducer;
