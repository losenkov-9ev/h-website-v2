import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

interface fetchReviewsParams {
  page?: number;
}

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async ({ page }: fetchReviewsParams) => {
    const { data } = await axios.get(`/reviews/get?page=${page}`);
    return data;
  },
);
