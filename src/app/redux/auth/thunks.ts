import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { AuthAPIResponce, IAuthParams, IChangePasswordParams } from './types';
import { handleAxiosError, RejectType } from '../../utils/handleAxiosError';

export const fetchAuthData = createAsyncThunk<AuthAPIResponce, IAuthParams, RejectType>(
  'auth/fetchAuthData',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/sign-in/', params);
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error, 'Ошибка авторизации'));
    }
  },
);

export const fetchAuthRegister = createAsyncThunk<AuthAPIResponce, IAuthParams, RejectType>(
  'auth/fetchAuthRegister',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/sign-up/', params);
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error, 'Ошибка регистрации'));
    }
  },
);

export const fetchChangePassword = createAsyncThunk<
  AuthAPIResponce,
  IChangePasswordParams,
  RejectType
>('auth/fetchChangePassword', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/account/change-password/', params);
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error, 'Произошла ошибка'));
  }
});

export const fetchLogout = createAsyncThunk('auth/fetchLogout', async () => {
  const { data } = await axios.post('/account/exit/');
  return data;
});
