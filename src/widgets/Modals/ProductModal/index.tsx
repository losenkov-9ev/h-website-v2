import React, { useContext } from 'react';
import { ModalWrapper } from '..';
import { TDefaultProps } from '../types';

import cls from './ProductModal.module.scss';
import Icon from '../../../shared/Icon';
import { CardContext } from '../../../features/Card/context/context';
import { useSelector } from 'react-redux';
import { selectCurrency } from '../../../app/redux/info/selectors';
import { Button, EButtonView } from '../../../shared/Button';

type ProductModalProps = TDefaultProps;

export const ProductModal: React.FC<ProductModalProps> = (props) => {
  const { symbol } = useSelector(selectCurrency);
  const {
    cardData: { date, id, price, name },
  } = useContext(CardContext);

  return (
    <ModalWrapper
      {...props}
      content={
        <div className={cls.productModal}>
          <div className={cls.productModal_title}>Заказ #{id}</div>
          <div className={cls.productModal_box}>
            <div className={cls.productModal_value} style={{ marginTop: 32 }}>
              <span>Номер заказа</span>
              <span></span>
              <span>{id}</span>
            </div>
            <div className={cls.productModal_value}>
              <span>Наименование</span>
              <span></span>
              <span>{name}</span>
            </div>
            <div className={cls.productModal_value}>
              <span>Стоимость</span>
              <span></span>
              <span>
                {price} {symbol}
              </span>
            </div>
            <div className={cls.productModal_value}>
              <span>Дата</span>
              <span></span>
              <span>{date}</span>
            </div>
          </div>
          <Button
            onClick={props.onRequestClose}
            className={cls.orderModal_button}
            view={EButtonView.outlined}>
            Закрыть
          </Button>
          <div className={cls.productModal_rip}>
            <Icon.ModalRip />
          </div>
        </div>
      }
    />
  );
};
