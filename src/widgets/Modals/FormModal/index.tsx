import cls from './FormModal.module.scss';
import React, { useState, useCallback, useMemo } from 'react';

import { ModalWrapper } from '..';
import { Input } from '../../../shared/Input';
import { Button, EButtonView } from '../../../shared/Button';
import { TDefaultProps } from '../types';

import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchAuthData, fetchAuthRegister } from '../../../app/redux/auth/thunks';
import { IAuthParams } from '../../../app/redux/auth/types';
import { selectAuthError, selectAuthStatus } from '../../../app/redux/auth/selectors';
import { useAsyncProcess } from '../../../app/hooks/useAsyncProcess';

export type FormModalProps = TDefaultProps & {
  type: EFormType;
};

export enum EFormType {
  SignIn = 'sign_in',
  SignUp = 'sign_up',
}

const content = {
  [EFormType.SignIn]: {
    title: 'Вход в аккаунт',
    submitButton: 'Войти',
    toggleButton: 'Создать аккаунт',
  },
  [EFormType.SignUp]: {
    title: 'Создание аккаунта',
    submitButton: 'Создать',
    toggleButton: 'Войти в аккаунт',
  },
};

export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onRequestClose,
  type: initialType,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<IAuthParams>({
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onChange',
  });

  const { dispatch: reduxDispatch, startProcess } = useAsyncProcess({
    statusSelector: selectAuthStatus,
    errorSelector: selectAuthError,
    successMessage: 'Вы вошли в аккаунт',
    onComplete: onRequestClose,
  });

  const [type, setType] = useState<EFormType>(initialType);

  const onSubmit: SubmitHandler<IAuthParams> = async (data) => {
    startProcess();
    try {
      type === EFormType.SignIn
        ? await reduxDispatch(fetchAuthData(data))
        : await reduxDispatch(fetchAuthRegister(data));
    } catch (error) {
      console.error(error);
      setError('login', { type: 'manual', message: 'Ошибка регистрации' });
    }
  };

  const onToggleFormType = useCallback(() => {
    setType((prevType) => (prevType === EFormType.SignUp ? EFormType.SignIn : EFormType.SignUp));
  }, []);

  const formContent = useMemo(() => content[type], [type]);

  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      content={
        <form onSubmit={handleSubmit(onSubmit)} className={cls.formModal}>
          <div className={cls.formModal_title}>{formContent.title}</div>
          <div className={cls.formModal_box}>
            <Input
              placeholder="Логин"
              className={cls.formModal_input}
              {...register('login', { required: 'Email обязателен' })}
              isError={Boolean(errors.login?.message)}
            />
            <Input
              placeholder="Пароль"
              className={cls.formModal_input}
              type="password"
              isPassword={true}
              {...register('password', { required: 'Пароль обязателен' })}
              isError={Boolean(errors.password?.message)}
            />
          </div>
          <div className={cls.formModal_footer}>
            <Button
              className={cls.formModal_footerButton}
              type="submit"
              fullWidth={true}
              disabled={!isValid}>
              {formContent.submitButton}
            </Button>
            <Button
              className={cls.formModal_footerButton}
              onClick={onToggleFormType}
              view={EButtonView.outlined}>
              {formContent.toggleButton}
            </Button>
          </div>
        </form>
      }
    />
  );
};
