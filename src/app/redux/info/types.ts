import { ELoadingStatus } from '../../@types/types';

export type TInfoLinks = {
  link: string;
  text: string;
}[];
export type TInfoCurrency = {
  name: string;
  symbol: string;
};
export type TInfoSupport = string;
export type TInfoSupportChat = boolean;

export interface INotiffication {
  title: string;
  image: string | null;
  text: string;
  link: null;
}
export type TInfoNotifications = {
  count: number;
  items: INotiffication[];
};
export type TInfoRating = {
  count: number;
  stars: number;
};

export enum EPaymentType {
  CARD = 'card',
  SBP = 'sbp',
  SBER = 'sber',
  BTC = 'btc',
  USDT = 'usdt',
  LTC = 'ltc',
}
export interface IPaymentItem {
  fiat: number;
  id: number;
  datetime: string;
  status: number;
  txid: string | null;
  amount: number;
  type: EPaymentType;
}
export interface IPayments {
  page: number;
  all: boolean;
  items: IPaymentItem[];
}

export interface IPurchaseItem {
  amount: number;
  datetime: string;
  id: number;
  title: string;
}
export interface IPurchases {
  page: number;
  all: boolean;
  items: IPurchaseItem[];
}

export interface IAccountData {
  login: string;
  balance: number;
  payments: IPayments;
  purchases: IPurchases;
}
export type TInfoAccount = {
  auth: boolean;
  data: IAccountData | Record<string, never>;
};

export type TInfoMethods = {
  [key in EPaymentType]: boolean;
};

export type TInfoReviews = {
  count: number;
  columns: unknown;
  all: boolean;
  show: boolean;
};

export type TFilterItem = { id: number; name: string };
export type TInfoShowcases = {
  status: boolean;
  items: TFilterItem[];
};

export type TInfoSections = TFilterItem[];

export type TInfoPromocodes = boolean;

export type TInfoSite = {
  newyear: boolean;
  background_opacity: number;
  style: string;
  title: string;
  description: string;
  bg: string;
  logo: string;
};

export type IResponse = {
  links: TInfoLinks; // +
  currency: TInfoCurrency; // +
  support: TInfoSupport; // +
  support_chat: TInfoSupportChat; // +
  notifications: TInfoNotifications;
  rating: TInfoRating; // +
  account: TInfoAccount; // +
  methods: TInfoMethods | Record<string, never>; // +
  reviews: TInfoReviews; // лишнее
  showcases: TInfoShowcases; // +
  sections: TInfoSections; // +
  promocodes: TInfoPromocodes; // +
  site: TInfoSite; // + // Нужно лого для мобильных, пока только desctop , потому не добавлено
};

export interface IInfoState {
  data: IResponse;
  status: ELoadingStatus;
}
