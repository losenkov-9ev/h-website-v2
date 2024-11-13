import clsx from 'clsx';
import React from 'react';
import cls from './PaymentStatus.module.scss';
import { Mods } from '../../app/@types/types';

export interface PaymentStatusProps {
  statusID: number;
}

const orderStatusText = (orderStatus: number) => {
  switch (orderStatus) {
    case 2:
      return 'Оплачено';
    case 1:
      return 'Ожидается оплата';
    case 0:
      return 'Отказано';
    default:
      return 'Отказано';
  }
};

export const PaymentStatus: React.FC<PaymentStatusProps> = ({ statusID }) => {
  const mods: Mods = {
    [cls.orderPayed]: statusID === 2,
    [cls.orderWarning]: statusID === 1,
    [cls.orderFail]: statusID === 0,
  };

  return <div className={clsx(cls.status, mods)}>{orderStatusText(statusID)}</div>;
};
