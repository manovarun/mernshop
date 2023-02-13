import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrderService from './OrderService';

const initialState = {
  order: {},
  orderDetails: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
};

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (order, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().Auth;
      return await OrderService.createOrder(token, order);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  'orders/getOrder',
  async (orderId, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().Auth;
      return await OrderService.getOrderDetails(token, orderId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const payOrder = createAsyncThunk(
  'order/payOrder',
  async (orderId) => {}
);

export const OrderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOrderDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.orderDetails = action.payload.order;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.orderDetails = {};
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default OrderSlice.reducer;
