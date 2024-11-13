import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ELoadingStatus } from '../../@types/types';
import { INotifficationsState, IResponse } from './types';
import { getNotiffications } from './thunks';

const initialState: INotifficationsState = {
  data: {
    ok: false,
    unread_count: 0,
    notifications: [],
  },
  status: ELoadingStatus.loading,
};

const notifficationsSlice = createSlice({
  name: 'notiffications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotiffications.pending, (state: INotifficationsState) => {
        state.status = ELoadingStatus.loading;
      })
      .addCase(
        getNotiffications.fulfilled,
        (state: INotifficationsState, action: PayloadAction<IResponse>) => {
          state.status = ELoadingStatus.fulfilled;
          state.data = action.payload;
        },
      )
      .addCase(getNotiffications.rejected, (state: INotifficationsState) => {
        state.status = ELoadingStatus.rejected;
      });
  },
});

export const notifficationsReducer = notifficationsSlice.reducer;
