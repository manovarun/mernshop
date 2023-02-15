import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrderService from './OrderService';

const initialState = {
  order: {},
  orders: [],
  orderDetails: null,
  isSuccess: false,
  isSuccessPay: false,
  isSuccessOrders: false,
  isError: false,
  isErrorOrders: false,
  isLoading: false,
  message: '',
  messageOrders: '',
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
  async ({ orderId, paymentResult }, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().Auth;
      return await OrderService.payOrder(token, { orderId, paymentResult });
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

export const getMyOrders = createAsyncThunk(
  'order/myOrders',
  async (_, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().Auth;
      return await OrderService.getMyOrders(token);
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

export const OrderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    orderReset: (state) => initialState,
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
        state.isSuccess = false;
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
      })
      .addCase(payOrder.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccessPay = false;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.orderDetails = action.payload.order;
        state.isLoading = false;
        state.isSuccessPay = true;
        state.isError = false;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.orderDetails = {};
        state.isLoading = false;
        state.isSuccessPay = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMyOrders.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccessOrders = false;
        state.isErrorOrders = false;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.isLoading = false;
        state.isSuccessOrders = true;
        state.isErrorOrders = false;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.orders = [];
        state.isLoading = false;
        state.isSuccessOrders = false;
        state.isErrorOrders = true;
        state.messageOrders = action.payload;
      });
  },
});

export const { orderReset } = OrderSlice.actions;

export default OrderSlice.reducer;
