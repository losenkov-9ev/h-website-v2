import React, { useState } from 'react';
import cls from './DepositCard.module.scss';
import { useSelector } from 'react-redux';
import { selectCurrency } from '../../app/redux/info/selectors';
import { PaymentStatus } from '../../shared/PaymentStatus';
import { OrderModal } from '../../widgets/Modals/OrderModal';

export interface DepositCardProps {
  id: number;
  currency: string;
  value: number;
  date: string;
  status: number;
}

export const DepositCard: React.FC<DepositCardProps> = ({ id, currency, value, date, status }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { symbol: currencySymbol } = useSelector(selectCurrency);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const onRequestClose = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <div className={cls.depositCard} onClick={handleOpenModal}>
        <div className={cls.depositCard_value}>
          {value} {currencySymbol} (<span>{currency}</span>)
        </div>
        <div className={cls.depositCard_date}>
          <PaymentStatus statusID={status} />
          <span>{date}</span>
        </div>
      </div>
      <OrderModal isOpen={isOpenModal} onRequestClose={onRequestClose} orderId={id} />
    </>
  );
};
