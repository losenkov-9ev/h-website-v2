import { Middleware } from '@reduxjs/toolkit';
import { fetchAuthData, fetchAuthRegister, fetchLogout } from './thunks';
import { fetchInfo } from '../info/thunks';
import { AppDispatch } from '../store';

const authMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const dispatch = store.dispatch as AppDispatch;

  if (
    ((action as { type: string }).type &&
      [
        fetchAuthData.fulfilled.type,
        fetchAuthRegister.fulfilled.type,
        fetchLogout.fulfilled.type,
      ].includes((action as { type: string }).type)) ||
    [
      fetchAuthData.rejected.type,
      fetchAuthRegister.rejected.type,
      fetchLogout.rejected.type,
    ].includes((action as { type: string }).type)
  ) {
    dispatch(fetchInfo());
  }

  return result;
};

export default authMiddleware;
