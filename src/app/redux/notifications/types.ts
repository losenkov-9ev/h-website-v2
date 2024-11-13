import { ELoadingStatus } from '../../@types/types';
import { INotiffication } from '../info/types';

export type IResponse = {
  ok: boolean;
  unread_count: number;
  notifications: INotiffication[];
};

export interface INotifficationsState {
  data: IResponse;
  status: ELoadingStatus;
}
