import { RootState } from '../store';

export const selectAuthError = (state: RootState) => state.auth.user.error;
export const selectAuthStatus = (state: RootState) => state.auth.user.status;
export const selectChangePasswordStatus = (state: RootState) => state.auth.password.status;
export const selectChangePasswordError = (state: RootState) => state.auth.password.error;
