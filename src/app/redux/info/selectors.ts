import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { selectAccountPaymentItems } from '../payment/selectors';

const selectInfoStatus = (state: RootState) => state.info.status;

const selectIsAuthState = (state: RootState) => state.info.data.account.auth;
const selectAccountState = (state: RootState) => state.info.data.account;

const selectShowcasesState = (state: RootState) => state.info.data.showcases.items;
const selectSectionsState = (state: RootState) => state.info.data.sections;

const selectLinksState = (state: RootState) => state.info.data.links;
export const selectCurrency = (state: RootState) => state.info.data.currency;

const selectSiteInfoState = (state: RootState) => state.info.data.site;
const selectSiteRateState = (state: RootState) => state.info.data.rating;

const selectPaymetMethodsState = (state: RootState) => state.info.data.methods;

export const selectSupportChat = (state: RootState) => state.info.data.support_chat;
export const selectWithPromocodes = (state: RootState) => state.info.data.promocodes;
export const selectSupportLink = (state: RootState) => state.info.data.support;
export const selectNotifficationsCount = (state: RootState) => state.info.data.notifications.count;

export const selectAccount = createSelector(
  [selectAccountState, selectInfoStatus],
  (data, status) => {
    return {
      data,
      status,
    };
  },
);

export const selectIsAuth = createSelector(
  [selectIsAuthState, selectInfoStatus],
  (data, status) => {
    return {
      data,
      status,
    };
  },
);

export const selectFilters = createSelector(
  [selectShowcasesState, selectSectionsState, selectInfoStatus],
  (showcases, sections, status) => {
    return {
      filters: {
        showcases,
        sections,
      },
      status,
    };
  },
);

export const selectLinks = createSelector([selectLinksState, selectInfoStatus], (data, status) => {
  return {
    data,
    status,
  };
});

export const selectSiteInfo = createSelector(
  [selectSiteInfoState, selectSiteRateState, selectInfoStatus],
  (siteInfo, siteRate, status) => {
    return {
      siteInfo,
      siteRate,
      status,
    };
  },
);

export const selectPaymetMethods = createSelector([selectPaymetMethodsState], (methods) => {
  return Object.entries(methods)
    .filter(([key, value]) => key && value === true)
    .map(([key]) => key);
});

export const selectAllPayments = createSelector(
  [selectAccountPaymentItems, selectInfoStatus],
  (items, status) => {
    return {
      items,
      status,
    };
  },
);
