import { ELoadingStatus } from '../../@types/types';
import { EPaymentType } from '../info/types';

export interface IResponse {
  ok: true;
  payment: {
    id: number;
    amount: number;
    requisites: string;
    expire: string;
    datetime: string;
    txid?: string;
  };
}

export interface IPaymentsState {
  data: IResponse | null;
  status: ELoadingStatus;
  error: string | null;
}

export type PaymentParams = {
  method: EPaymentType;
  amount?: number;
  order_id?: number;
};
