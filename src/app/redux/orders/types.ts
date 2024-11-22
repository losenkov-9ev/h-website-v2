import { ELoadingStatus } from '../../@types/types';

interface IOrderListItem {
  amount: number;
  datetime: string;
  id: number;
  title: string;
}

interface IOrder {
  id: number;
  product_id: number;
  product_name: string;
  products: string[];
  review_exists: boolean;
}

export type IResponseAllOrders = {
  ok: boolean;
  page: number;
  pages: number;
  orders: IOrderListItem[];
};

export type fetchOrderParams = { order_id: number };
export type postOrderParams = { product_id: number; count?: number };

export interface IOrdersState {
  allOrders: {
    data: IResponseAllOrders | null;
    status: ELoadingStatus;
  };
  order: {
    data: IOrder | null;
    status: ELoadingStatus;
  };
  pay: {
    error: string | null;
    status: ELoadingStatus;
  };
}

export type PayAPIResponce = { ok: true; products: string[] };
