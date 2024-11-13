import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { IResponse, PaymentParams } from './types';
import { handleAxiosError, RejectType } from '../../utils/handleAxiosError';

export const createPayment = createAsyncThunk<IResponse, PaymentParams, RejectType>(
  'payments/createPayment',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/payments/create/`, params);
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error, 'Ошибка оплаты'));
    }
  },
);
