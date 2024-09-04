import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import themeReducer from './slices/themeSlice';
import { productsApi } from '../services/products';
import { ordersApi } from '../services/orders';
import { authApi } from '../services/auth';
import Reactotron from '../../ReactotronConfig';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    user: userReducer,
    orders: orderReducer,
    theme: themeReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, ordersApi.middleware, authApi.middleware),
  enhancers: (getDefaultEnhancers) => {
    // Add Reactotron enhancer for development
    const reactotronEnhancer = __DEV__ ? [Reactotron.createEnhancer!()] : [];
    return getDefaultEnhancers().concat(reactotronEnhancer);
  },
});

// Export types for the state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
