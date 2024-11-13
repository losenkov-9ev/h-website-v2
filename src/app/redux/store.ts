import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import theme from './theme/slice';
import chat from './chat/slice';
import window from './window/slice';

import { authReducer } from './auth/slice';
import { reviewsReducer } from './reviews/slice';
import { productsReducer } from './products/slice';
import { ordersReducer } from './orders/slice';
import { infoReducer } from './info/slice';
import { notifficationsReducer } from './notifications/slice';

import authMiddleware from './auth/middleware';
import { paymentReducer } from './payment/slice';

export const store = configureStore({
  reducer: {
    theme,
    chat,
    window,
    auth: authReducer,
    products: productsReducer,
    reviews: reviewsReducer,
    orders: ordersReducer,
    info: infoReducer,
    notiffications: notifficationsReducer,
    payment: paymentReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
