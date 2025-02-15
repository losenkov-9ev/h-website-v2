import { RootState } from '../store';

export const selectAllOrders = (state: RootState) => state.orders.allOrders.data;
export const selectAllOrdersStatus = (state: RootState) => state.orders.allOrders.status;

export const selectPayOrderError = (state: RootState) => state.orders.pay.error;
export const selectPayOrderStatus = (state: RootState) => state.orders.pay.status;
