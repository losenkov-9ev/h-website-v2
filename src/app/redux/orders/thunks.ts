import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrderParams, PayAPIResponce, postOrderParams } from './types';

import axios from '../../axios';
import { handleAxiosError, RejectType } from '../../utils/handleAxiosError';

export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders', async () => {
  const { data } = await axios.post(`/orders/get/`);

  return data;
});

export const fetchOrder = createAsyncThunk(
  'orders/fetchOrder',
  async (params: fetchOrderParams) => {
    const { data } = await axios.post(`/orders/get/`, params);
    return data;
  },
);

export const postOrder = createAsyncThunk<PayAPIResponce, postOrderParams, RejectType>(
  'orders/postOrder',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/orders/create/`, params);
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error, 'Ошибка создания заказа'));
    }
  },
);
