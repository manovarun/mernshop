import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from './UserService';

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isUpdated: false,
  isLoading: false,
  message: '',
  token: '',
};

//Get User Profile
export const getUserProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().Auth.token;
      return await UserService.getUserProfile(token);
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

export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().Auth.token;
      return await UserService.updateUserProfile(token, user);
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

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isUpdated = false;
      state.message = '';
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
        state.user = null;
        state.token = '';
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isUpdated = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdated = true;
        state.user = action.payload.user;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isUpdated = false;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = UserSlice.actions;

export default UserSlice.reducer;
