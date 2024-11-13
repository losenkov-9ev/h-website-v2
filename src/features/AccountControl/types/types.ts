export enum AccountControlType {
  Balance = 'balance',
  Password = 'password',
}

export interface AccountControlProps {
  type: AccountControlType;
  switchTheme?: boolean;
}

export interface FormProps {
  dispatch: React.Dispatch<Action>;
  switchTheme: AccountControlProps['switchTheme'];
  state: State;
}

export interface IPayment {
  value: number;
  currency: string | React.ReactNode;
}

export type TPassword = {
  old_password: string;
  new_password: string;
};

export interface State {
  payment: IPayment;
  password: TPassword;
}

export type Action =
  | { type: 'SET_PAYMENT'; payload: IPayment }
  | { type: 'SET_PASSWORD'; payload: TPassword }
  | { type: 'SET_PAYMENT_CURRENCY'; payload: string | React.ReactNode };
