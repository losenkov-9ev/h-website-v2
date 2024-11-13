import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ELoadingStatus } from '../../@types/types';
import { IInfoState, IPaymentItem, IResponse } from './types';
import { fetchInfo, fetchInfoPayments } from './thunks';

const initialState: IInfoState = {
  data: {
    links: [],
    currency: {
      name: '',
      symbol: '',
    },
    support: '',
    support_chat: false,
    notifications: {
      count: -1,
      items: [],
    },
    rating: {
      count: 0,
      stars: 0,
    },
    account: {
      auth: false,
      data: {},
    },
    methods: {},
    reviews: {
      count: 0,
      columns: [],
      all: true,
      show: true,
    },
    showcases: {
      status: true,
      items: [],
    },
    sections: [],
    promocodes: true,
    site: {
      newyear: false,
      background_opacity: 0,
      bg: '',
      style: '',
      title: '',
      description: '',
      logo: '',
    },
  },
  status: ELoadingStatus.loading,
};

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    resetNotiffications: (state: IInfoState) => {
      state.data.notifications = {
        count: -1,
        items: [],
      };
    },
    updateBalance: (state: IInfoState, action: PayloadAction<number>) => {
      state.data.account.data.balance = state.data.account.data.balance - action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfo.pending, (state: IInfoState) => {
        state.status = ELoadingStatus.loading;
      })
      .addCase(fetchInfo.fulfilled, (state: IInfoState, action: PayloadAction<IResponse>) => {
        state.data = { ...action.payload };
        state.status = ELoadingStatus.fulfilled;
      })
      .addCase(fetchInfo.rejected, (state: IInfoState) => {
        state.status = ELoadingStatus.rejected;
      })

      .addCase(
        fetchInfoPayments.fulfilled,
        (state: IInfoState, action: PayloadAction<IPaymentItem[]>) => {
          state.data.account.data.payments.items = action.payload;
        },
      );
  },
});

export const { resetNotiffications, updateBalance } = infoSlice.actions;
export const infoReducer = infoSlice.reducer;
