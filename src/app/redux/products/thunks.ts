import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import pluralize from 'pluralize';

export type fetchProductsParams = { filter: string; id: number }[];
export type fetchProductsRequestBody = (filters?: fetchProductsParams) => string;

const requestBody: fetchProductsRequestBody = (filters) => {
  // Приведение фильтра к единственному числу
  if (filters && filters.length) {
    return JSON.stringify(
      filters.reduce<Record<string, number>>((acc, { filter, id }) => {
        acc[`${pluralize.singular(filter)}_id`] = id;
        return acc;
      }, {}),
    );
  }

  return '';
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters?: fetchProductsParams) => {
    const { data } = await axios.post(`/catalog/get/`, requestBody(filters));

    return data;
  },
);
