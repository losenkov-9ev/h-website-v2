import React, { useCallback, useState } from 'react';
import { Input } from '../../../shared/Input';
import { FormProps } from '../types/types';
import { setPayment, setPaymentCurrency } from '../state/actions';
import { Button } from '../../../shared/Button';
import { content } from '../content';
import { useSelector } from 'react-redux';
import { selectCurrency, selectPaymetMethods } from '../../../app/redux/info/selectors';

import Select from '../../../shared/Select';
import cls from '../AccountControl.module.scss';
import { useAsyncProcess } from '../../../app/hooks/useAsyncProcess';
import { selectPaymentError, selectPaymentStatus } from '../../../app/redux/payment/selectors';
import { createPayment } from '../../../app/redux/payment/thunks';
import { EPaymentType } from '../../../app/redux/info/types';
import { OrderModal } from '../../../widgets/Modals/OrderModal';
import clsx from 'clsx';
import { fetchInfoPayments } from '../../../app/redux/info/thunks';
import { useAppDispatch } from '../../../app/redux/store';

export const BalanceForm: React.FC<FormProps> = (props) => {
  const { dispatch, switchTheme, state } = props;
  const methods = useSelector(selectPaymetMethods);
  const { symbol } = useSelector(selectCurrency);
  const reduxDispatch = useAppDispatch();

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const onRequestClose = () => {
    setIsModalOpened(false);
  };

  const handleSelectChange = useCallback(
    (currency: string | React.ReactNode) => {
      dispatch(setPaymentCurrency(currency as string));
    },
    [dispatch],
  );

  const onComplete = () => {
    setIsModalOpened(true);
    reduxDispatch(fetchInfoPayments());
  };

  const { startProcess } = useAsyncProcess({
    statusSelector: selectPaymentStatus,
    errorSelector: selectPaymentError,
    onComplete,
  });

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPayment({ ...state.payment, value: Number(e.target.value) }));
  };

  const balanceHandler = () => {
    reduxDispatch(
      createPayment({
        amount: state.payment.value,
        method: state.payment.currency as EPaymentType,
      }),
    );

    startProcess();
  };

  return (
    <>
      <div className={cls.accountControl_box}>
        <div className={cls.accountControl_inputWrapper}>
          <Input
            onChange={handleValueChange}
            className={clsx(cls.accountControl_input, cls.accountControl_balanceInput)}
            placeholder="Сумма"
            type="number"
            themeReverse={switchTheme}
          />
          <span>{symbol}</span>
        </div>

        <Select
          onChange={handleSelectChange}
          className={cls.accountControl_select}
          placeholder="Валюта"
          themeReverse={switchTheme}
          fullWidth>
          {methods.map((method, idx) => (
            <Select.Option key={`${method}_${idx}`} value={method}>
              {method}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Button onClick={balanceHandler} themeReverse={switchTheme}>
        {content.balance.button}
      </Button>
      <OrderModal isOpen={isModalOpened} onRequestClose={onRequestClose} />
    </>
  );
};
