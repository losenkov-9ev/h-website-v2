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
