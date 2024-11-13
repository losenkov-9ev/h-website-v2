import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IResponse } from './types';

export const fetchInfo = createAsyncThunk('info/fetchInfo', async () => {
  const { data } = await axios.post(
    `https://sitelabfortest.biz/?dev=true`,
    {},
    { withCredentials: true },
  );

  return data;
});

export const fetchInfoPayments = createAsyncThunk('info/fetchInfoPayments', async () => {
  const { data } = await axios.post<IResponse>(
    `https://sitelabfortest.biz/?dev=true`,
    {},
    { withCredentials: true },
  );

  return data.account.data.payments.items;
});
