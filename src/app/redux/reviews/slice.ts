import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ELoadingStatus } from '../../@types/types';
import { IResponse, IReviewsState } from './types';
import { fetchReviews } from './thunks';

const initialStateData: IReviewsState['data'] = {
  ok: false,
  pages: 0,
  page: 0,
  reviews: [],
};

const initialState: IReviewsState = {
  data: initialStateData,
  status: ELoadingStatus.loading,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state: IReviewsState) => {
        state.data = initialStateData;
        state.status = ELoadingStatus.loading;
      })
      .addCase(fetchReviews.fulfilled, (state: IReviewsState, action: PayloadAction<IResponse>) => {
        state.status = ELoadingStatus.fulfilled;
        state.data = action.payload;
      })
      .addCase(fetchReviews.rejected, (state: IReviewsState) => {
        state.data = initialStateData;
        state.status = ELoadingStatus.rejected;
      });
  },
});

export const reviewsReducer = reviewsSlice.reducer;
