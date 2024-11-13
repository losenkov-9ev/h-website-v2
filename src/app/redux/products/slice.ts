import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from './thunks';
import { ELoadingStatus } from '../../@types/types';
import { IProductsState, IResponse } from './types';

const initialState: IProductsState = {
  products: {},
  filters: {
    sections: [],
    categories: [],
  },
  status: ELoadingStatus.loading,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state: IProductsState) => {
        state.status = ELoadingStatus.loading;
        state.products = {};
        state.filters = {
          sections: [],
          categories: [],
        };
      })
      .addCase(
        fetchProducts.fulfilled,
        (state: IProductsState, action: PayloadAction<IResponse>) => {
          state.status = ELoadingStatus.fulfilled;
          state.products = action.payload.products;
          state.filters = action.payload.filters;
        },
      )
      .addCase(fetchProducts.rejected, (state: IProductsState) => {
        state.status = ELoadingStatus.rejected;
        state.products = {};
        state.filters = {
          sections: [],
          categories: [],
        };
      });
  },
});

export const productsReducer = productsSlice.reducer;
