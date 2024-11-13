import { PayloadAction } from '@reduxjs/toolkit';

export enum ErrorCodes {
  code_200 = 'Успешно',
  code_400 = 'Некорректный запрос',
  code_401 = 'Требуется авторизация',
  code_402 = 'Требуется оплата',
  code_403 = 'Требуется авторизация.',
  code_405 = 'Ожидаемая ошибка на сервере. [Закончились товары/Нет доступных реквизитов/Пустой каталог]',
  code_429 = 'Требуется подождать некоторое время перед повторным запросом',
}

export enum ESignInErrors {
  INVALID_CREDENTIALS = 'Неверный логин или пароль',
}

export enum ESignUpErrors {
  INVALID_USERNAME = 'Некорректный логин',
  USERNAME_TOO_SHORT = 'Логин должен быть от 4-ех символов',
  USERNAME_TOO_LONG = 'Макс. длина логина: 16 символов',
  PASSWORD_TOO_SHORT = 'Пароль должен быть от 5-и символов',
  PASSWORD_TOO_LONG = 'Макс. длина пароля: 32 символа',
  ACCOUNT_ALREADY_REGISTERED = 'Данный аккаунт уже зарегистрирован',
}

export enum EReviewSendErrors {
  INVALID_ORDER_ID = 'Неверный ID заказа',
  REVIEW_ALREADY_SUBMITTED = 'Отзыв к этому заказу уже был оставлен',
}

export enum EOrdersErrors {
  ORDER_NOT_FOUND = 'Ордер не найден',
}

export enum EOrderCreateErrors {
  MAX_LIMIT_EXCEEDED = 'Максимальное кол-во: 5 ед. товара',
  MIN_LIMIT_NOT_MET = 'Минимальное кол-во: 1 ед. товара',
  INVALID_PRODUCT_ID = 'Неверный ID товара',
  INVALID_PROMO_CODE = 'Данный промокод не существует',
  PROMO_CODE_INVALID = 'Данный промокод не является действительным',
  PROMO_CODE_EXPIRED = 'Данный промокод больше не действителен',
  PROMO_CODE_ALREADY_USED = 'Вы уже использовали ранее данный промокод',
}

export enum EPaymentErrors {
  ORDER_NOT_FOUND = 'Ордер не найден',
  INVALID_AMOUNT = 'Передано неверное значение суммы',
  INVALID_MINIMUM_RECHARGE_AMOUNT = 'Минимальная сумма пополнения: - 1$',
  INVALID_METHOD_NOT_SELECTED = 'Не выбран нужный метод оплаты',
}

export enum EChangePasswordErrors {
  INVALID_OLD_PASSWORD = 'Неверный старый пароль',
  PASSWORD_TOO_SHORT = 'Пароль должен быть от 5-и символов',
  PASSWORD_TOO_LONG = 'Макс. длина пароля: 32 символа',
}

export interface ApiError {
  ok: false;
  error: {
    code: string;
    description: string;
  };
}

export type ErrorPayload = PayloadAction<
  { status: number; message: string | undefined } | undefined
>;
