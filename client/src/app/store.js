import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import AuthReducer from '../features/Auth/AuthSlice';
import ProductReducer from '../features/Product/ProductSlice';
import CartReducer from '../features/Cart/CartSlice';
import UserReducer from '../features/User/UserSlice';
import OrderReducer from '../features/Order/OrderSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Product: ProductReducer,
  Cart: CartReducer,
  User: UserReducer,
  Order: OrderReducer,
});

let PersistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: PersistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
