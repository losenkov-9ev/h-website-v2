import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from './types';
import { fetchAuthData, fetchAuthRegister, fetchChangePassword, fetchLogout } from './thunks';
import { ELoadingStatus } from '../../@types/types';
import { ErrorPayload } from '../../@types/errors';

const initialState: IAuthState = {
  user: {
    error: null,
    status: ELoadingStatus.loading,
  },
  password: {
    status: ELoadingStatus.loading,
    error: null,
  },
};

const onLogout = () => {
  document.cookie = 'sessionid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthData.pending, (state: IAuthState) => {
      state.user.error = null;
      state.user.status = ELoadingStatus.loading;
    });
    builder.addCase(fetchAuthData.fulfilled, (state: IAuthState) => {
      state.user.error = null;
      state.user.status = ELoadingStatus.fulfilled;
    });
    builder.addCase(fetchAuthData.rejected, (state: IAuthState, action: ErrorPayload) => {
      state.user.error = action.payload?.message || null;
      state.user.status = ELoadingStatus.rejected;
    });
    builder.addCase(fetchAuthRegister.pending, (state: IAuthState) => {
      state.user.error = null;
      state.user.status = ELoadingStatus.loading;
    });
    builder.addCase(fetchAuthRegister.fulfilled, (state: IAuthState) => {
      state.user.error = null;
      state.user.status = ELoadingStatus.fulfilled;
    });
    builder.addCase(fetchAuthRegister.rejected, (state: IAuthState, action: ErrorPayload) => {
      state.user.error = action.payload?.message || null;
      state.user.status = ELoadingStatus.rejected;
    });

    builder.addCase(fetchChangePassword.pending, (state: IAuthState) => {
      state.password.status = ELoadingStatus.loading;
      state.password.error = null;
    });
    builder.addCase(fetchChangePassword.fulfilled, (state: IAuthState) => {
      state.password.status = ELoadingStatus.fulfilled;
      state.password.error = null;
    });
    builder.addCase(fetchChangePassword.rejected, (state: IAuthState, action: ErrorPayload) => {
      state.password.status = ELoadingStatus.rejected;
      state.password.error = action.payload?.message || null;
    });
    builder.addCase(fetchLogout.pending, onLogout);
    builder.addCase(fetchLogout.fulfilled, onLogout);
    builder.addCase(fetchLogout.rejected, onLogout);
  },
});

export const authReducer = authSlice.reducer;
