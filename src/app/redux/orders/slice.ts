import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ELoadingStatus } from '../../@types/types';
import { IOrdersState, IResponseAllOrders } from './types';
import { fetchAllOrders, fetchOrder, postOrder } from './thunks';
import { ErrorPayload } from '../../@types/errors';

const initialState: IOrdersState = {
  allOrders: {
    data: null,
    status: ELoadingStatus.loading,
  },
  order: {
    data: null,
    status: ELoadingStatus.loading,
  },
  pay: {
    status: ELoadingStatus.loading,
    error: null,
  },
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state: IOrdersState) => {
        state.allOrders.status = ELoadingStatus.loading;
      })
      .addCase(
        fetchAllOrders.fulfilled,
        (state: IOrdersState, action: PayloadAction<IResponseAllOrders>) => {
          state.allOrders.status = ELoadingStatus.fulfilled;
          state.allOrders.data = action.payload;
        },
      )
      .addCase(fetchAllOrders.rejected, (state: IOrdersState) => {
        state.allOrders.status = ELoadingStatus.rejected;
      })

      .addCase(fetchOrder.pending, (state: IOrdersState) => {
        state.allOrders.status = ELoadingStatus.loading;
      })
      .addCase(
        fetchOrder.fulfilled,
        (state: IOrdersState, action: PayloadAction<IResponseAllOrders>) => {
          state.allOrders.status = ELoadingStatus.fulfilled;
          state.allOrders.data = action.payload;
        },
      )
      .addCase(fetchOrder.rejected, (state: IOrdersState) => {
        state.allOrders.status = ELoadingStatus.rejected;
      })

      .addCase(postOrder.pending, (state: IOrdersState) => {
        state.pay.status = ELoadingStatus.loading;
      })
      .addCase(postOrder.fulfilled, (state: IOrdersState) => {
        state.pay.status = ELoadingStatus.fulfilled;
      })
      .addCase(postOrder.rejected, (state: IOrdersState, action: ErrorPayload) => {
        state.pay.status = ELoadingStatus.rejected;
        state.pay.error = action.payload?.message || null;
      });
  },
});

export const ordersReducer = ordersSlice.reducer;
