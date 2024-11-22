import { ELoadingStatus } from '../../@types/types';

type TInfoLinks = {
  link: string;
  text: string;
}[];
type TInfoCurrency = {
  name: string;
  symbol: string;
};
type TInfoSupport = string;
type TInfoSupportChat = boolean;

export interface INotiffication {
  title: string;
  image: string | null;
  text: string;
  link: null;
}
type TInfoNotifications = {
  count: number;
  items: INotiffication[];
};
type TInfoRating = {
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
interface IPayments {
  page: number;
  all: boolean;
  items: IPaymentItem[];
}

interface IPurchaseItem {
  amount: number;
  datetime: string;
  id: number;
  title: string;
}
interface IPurchases {
  page: number;
  all: boolean;
  items: IPurchaseItem[];
}

interface IAccountData {
  login: string;
  balance: number;
  payments: IPayments;
  purchases: IPurchases;
}
type TInfoAccount = {
  auth: boolean;
  data: IAccountData | Record<string, never>;
};

type TInfoMethods = {
  [key in EPaymentType]: boolean;
};

type TInfoReviews = {
  count: number;
  columns: unknown;
  all: boolean;
  show: boolean;
};

type TFilterItem = { id: number; name: string };
type TInfoShowcases = {
  status: boolean;
  items: TFilterItem[];
};

type TInfoSections = TFilterItem[];

type TInfoPromocodes = boolean;

type TInfoSite = {
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
