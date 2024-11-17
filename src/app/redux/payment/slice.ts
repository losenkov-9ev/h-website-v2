import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ELoadingStatus } from '../../@types/types';
import { ErrorPayload } from '../../@types/errors';
import { createPayment } from './thunks';
import { IPaymentsState, IResponse } from './types';
import { convertToUserTimeZone } from '../../utils/timeUtils';

const initialState: IPaymentsState = {
  data: null,
  status: ELoadingStatus.loading,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state: IPaymentsState) => {
        state.status = ELoadingStatus.loading;
      })
      .addCase(
        createPayment.fulfilled,
        (state: IPaymentsState, action: PayloadAction<IResponse>) => {
          state.status = ELoadingStatus.fulfilled;
          state.data = action.payload;
          state.data.payment.datetime = convertToUserTimeZone(action.payload.payment.datetime);
        },
      )
      .addCase(createPayment.rejected, (state: IPaymentsState, action: ErrorPayload) => {
        state.status = ELoadingStatus.rejected;
        state.error = action.payload?.message || null;
      });
  },
});

export const paymentReducer = paymentSlice.reducer;
