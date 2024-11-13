import { State } from '../types/types';

export const initialState: State = {
  payment: { value: 10, currency: 'sbp' },
  password: { old_password: '', new_password: '' },
};
