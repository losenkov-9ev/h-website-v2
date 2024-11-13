import React, { useContext } from 'react';
import cls from './PaymentModal.module.scss';
import { ModalWrapper } from '..';
import { Input } from '../../../shared/Input';
import Select from '../../../shared/Select';
import { Button, EButtonView } from '../../../shared/Button';
import { CardContext } from '../../../features/Card/context/context';
import {
  selectCurrency,
  selectPaymetMethods,
  selectWithPromocodes,
} from '../../../app/redux/info/selectors';
import { useSelector } from 'react-redux';
import { postOrder } from '../../../app/redux/orders/thunks';
import { useAsyncProcess } from '../../../app/hooks/useAsyncProcess';
import { selectPayOrderError, selectPayOrderStatus } from '../../../app/redux/orders/selectors';
import { useAppDispatch } from '../../../app/redux/store';
import { updateBalance } from '../../../app/redux/info/slice';

export const PaymentModal: React.FC = () => {
  const [productCount, setProductCount] = React.useState<number>(1);
  const dispatch = useAppDispatch();
  const { cardData, closeModal: onRequestClose, isModalOpen: isOpen } = useContext(CardContext);

  const { symbol: currencySymbol } = useSelector(selectCurrency);
  const { name, price, id } = cardData;

  const methods = useSelector(selectPaymetMethods);
  const withPromocodes = useSelector(selectWithPromocodes);

  const onSuccessPay = () => {
    dispatch(updateBalance(price * productCount));
    setProductCount(1);
    onRequestClose();
  };

  const { startProcess } = useAsyncProcess({
    statusSelector: selectPayOrderStatus,
    errorSelector: selectPayOrderError,
    successMessage: `Вы купили "${name}" на ${price * productCount} ${currencySymbol}`,
    onComplete: onSuccessPay,
  });

  const handleDecrementProductCount = () => {
    setProductCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrementProductCount = () => {
    setProductCount((prev) => (prev < 20 ? prev + 1 : 20));
  };

  const handlePay = () => {
    dispatch(postOrder({ product_id: id, count: productCount }));
    startProcess();
  };

  return (
    <>
      <ModalWrapper
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        content={
          <div className={cls.paymentModal}>
            <div className={cls.paymentModal_title}>Покупка товара</div>
            <div className={cls.paymentModal_box}>
              <div className={cls.paymentModal_count}>
                <span className={cls.paymentModal_countName}>{name || ''}</span>
                <div className={cls.paymentModal_counter}>
                  <span
                    className={cls.paymentModal_counterItem}
                    onClick={handleDecrementProductCount}>
                    -
                  </span>
                  <input
                    type="number"
                    className={cls.paymentModal_counterField}
                    value={productCount}
                    disabled={true}
                  />
                  <span
                    className={cls.paymentModal_counterItem}
                    onClick={handleIncrementProductCount}>
                    +
                  </span>
                </div>
              </div>
              {withPromocodes && (
                <Input placeholder="Промо-код" className={cls.paymentModal_input} />
              )}
              <Select className={cls.paymentModal_select} fullWidth={true} placeholder="Валюта">
                {methods.map((method, idx) => (
                  <Select.Option key={`${method}_${idx}`} value={method}>
                    {method}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className={cls.paymentModal_footer}>
              <Button fullWidth={true} onClick={handlePay}>
                Оплатить {price * productCount} {currencySymbol}
              </Button>
              <Button
                view={EButtonView.outlined}
                onClick={onRequestClose}
                className={cls.paymentModal_clos}>
                Отмена
              </Button>
            </div>
          </div>
        }
      />
    </>
  );
};
