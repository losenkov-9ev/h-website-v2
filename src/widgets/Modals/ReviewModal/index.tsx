import React from 'react';
import { ModalWrapper } from '..';
import cls from './ReviewModal.module.scss';
import { Rate } from '../../../shared/Rate';
import { TDefaultProps } from '../types';
import { useSelector } from 'react-redux';
import { selectCurrency } from '../../../app/redux/info/selectors';
import { formatNumberWithDelimiter } from '../../../app/utils/formatNumberWithDelimiter';

type ReviewModalProps = TDefaultProps & {
  title: string;
  price: number;
  rate: number;
  text: string;
};

export const ReviewModal: React.FC<ReviewModalProps> = ({
  title,
  price,
  rate,
  text,
  onRequestClose,
  isOpen,
}) => {
  const { symbol: currencySymbol } = useSelector(selectCurrency);

  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      content={
        <div className={cls.reviewModal}>
          <div className={cls.reviewModal_head}>
            <div className={cls.reviewModal_title}>{title}</div>
            <div className={cls.reviewModal_price}>
              ({formatNumberWithDelimiter(price)} {currencySymbol})
            </div>
          </div>
          <Rate value={rate} />
          <div className={cls.reviewModal_content}>{text}</div>
        </div>
      }
    />
  );
};
