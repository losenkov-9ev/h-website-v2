import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectPaymentStatus = (state: RootState) => state.payment.status;
export const selectPaymentError = (state: RootState) => state.payment.error;

export const selectAccountPaymentItems = (state: RootState) =>
  state.info.data.account.data.payments.items;

export const selectPayment = (state: RootState) => state.payment.data?.payment;

export const selectAccountPayment = (paymentID: number | undefined) =>
  createSelector([selectAccountPaymentItems], (items) => {
    return items.find((item) => item.id === paymentID);
  });
