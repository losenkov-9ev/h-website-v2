import { ELoadingStatus } from '../../@types/types';

export interface IAuthParams {
  login: string;
  password: string;
}

export interface IChangePasswordParams {
  old_password: string;
  new_password: string;
}

interface IAuthStateItem {
  status: ELoadingStatus;
  error: string | null;
}

export interface IAuthState {
  user: IAuthStateItem;
  password: IAuthStateItem;
}

export type AuthAPIResponce = { ok: true };
