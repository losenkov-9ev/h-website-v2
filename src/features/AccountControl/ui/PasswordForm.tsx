import React from 'react';
import { Input } from '../../../shared/Input';
import cls from '../AccountControl.module.scss';
import { FormProps, TPassword } from '../types/types';
import { setPassword } from '../state/actions';
import { Button } from '../../../shared/Button';
import { content } from '../content';
import {
  selectChangePasswordError,
  selectChangePasswordStatus,
} from '../../../app/redux/auth/selectors';
import { fetchChangePassword } from '../../../app/redux/auth/thunks';
import { useAsyncProcess } from '../../../app/hooks/useAsyncProcess';

export const PasswordForm: React.FC<FormProps> = (props) => {
  const { dispatch, switchTheme, state } = props;

  const { dispatch: reduxDispatch, startProcess } = useAsyncProcess({
    statusSelector: selectChangePasswordStatus,
    errorSelector: selectChangePasswordError,
    successMessage: 'Пароль успешно изменен',
  });

  const passwordHandler = () => {
    reduxDispatch(
      fetchChangePassword({
        old_password: state.password.old_password,
        new_password: state.password.new_password,
      }),
    );
    startProcess();
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>, key: keyof TPassword) => {
    dispatch(setPassword({ ...state.password, [key]: e.target.value }));
  };

  return (
    <>
      <div className={cls.accountControl_box}>
        <Input
          onChange={(e) => handleChangePassword(e, 'old_password')}
          className={cls.accountControl_input}
          placeholder="Старый пароль"
          isPassword
          themeReverse={switchTheme}
        />
        <Input
          onChange={(e) => handleChangePassword(e, 'new_password')}
          className={cls.accountControl_input}
          placeholder="Новый пароль"
          isPassword
          themeReverse={switchTheme}
        />
      </div>
      <Button onClick={passwordHandler} themeReverse={switchTheme}>
        {content.password.button}
      </Button>
    </>
  );
};
