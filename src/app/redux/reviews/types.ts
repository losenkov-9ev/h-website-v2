import { ELoadingStatus } from '../../@types/types';

export interface IReviewData {
  sum: number;
  stars: number;
  datetime: string;
  text: string;
  title: string;
}

export type IResponse = {
  ok: boolean;
  page: number;
  pages: number;
  reviews: IReviewData[];
};

export interface IReviewsState {
  data: IResponse;
  status: ELoadingStatus;
}
