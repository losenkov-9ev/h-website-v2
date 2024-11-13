import { RootState } from '../store';

export const selectNotiffications = (state: RootState) => state.notiffications.data.notifications;
