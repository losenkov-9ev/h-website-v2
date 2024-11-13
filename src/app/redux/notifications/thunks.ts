import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { resetNotiffications } from '../info/slice';

export const getNotiffications = createAsyncThunk('notifications/getNotiffications', async () => {
  const { data } = await axios.post(`/notifications/get/`);
  return data;
});

export const checkNotiffications = createAsyncThunk(
  'notifications/checkNotiffications',
  async (_, { dispatch }) => {
    try {
      await axios.post(`/notifications/check/`);
      dispatch(resetNotiffications());
    } catch (error) {
      console.error(error);
    }
  },
);
