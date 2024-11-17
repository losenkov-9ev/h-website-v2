import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { findProductById } from '../../utils/findProductById';

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductAndPathById = (id: number) =>
  createSelector([selectProducts], (products) => {
    return findProductById(products, id);
  });
