import { RootState } from '../store';

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsStatus = (state: RootState) => state.products.status;
