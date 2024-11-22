import React from 'react';

import { ELocation } from '../../../app/@types/types';
import { ModalWrapper } from '..';
import { useCopyToClipboard } from '../../../app/hooks/useCopyToClipboard';
import { TDefaultProps } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/redux/store';
import { useSelector } from 'react-redux';
import { Button, EButtonView } from '../../../shared/Button';
import { formatNumberWithDelimiter } from '../../../app/utils/formatNumberWithDelimiter';
import { selectAccountPayment, selectPayment } from '../../../app/redux/payment/selectors';
import { PaymentStatus } from '../../../shared/PaymentStatus';
import { selectCurrency } from '../../../app/redux/info/selectors';

import cls from './OrderModal.module.scss';
import Icon from '../../../shared/Icon';
import clsx from 'clsx';

type OrderModalProps = TDefaultProps & {
  orderId?: number;
};

interface ModalInfoProps {
  handleFooterButtonClick: (goHome: boolean) => void;

  id: number;
  orderStaus?: number;
  wallet?: string;
  amount: number;
  txID?: string | null;
  name?: string;
  count?: number;
  datetime: string;
  expire?: string;
  type?: string;
}

const ModalInfo: React.FC<ModalInfoProps> = (props) => {
  const {
    id,
    orderStaus = 1,
    wallet,
    amount,
    expire,
    txID,
    name,
    count,
    datetime,
    type,
    handleFooterButtonClick,
  } = props;

  const {
    isCopied: isCopiedWallet,
    isButtonDisabled: isWalletButtonDisabled,
    copyToClipboard: copyWalletToClipboard,
  } = useCopyToClipboard();

  const { isCopied: isCopiedTXID, copyToClipboard: copyTXIDToClipboard } = useCopyToClipboard();
  const { isCopied: isCopiedAmount, copyToClipboard: copyAmountToClipboard } = useCopyToClipboard();

  const { symbol } = useSelector(selectCurrency);

  return (
    <>
      <div className={cls.orderModal_title}>Пополнение #{id}</div>
      <PaymentStatus statusID={orderStaus} />
      {wallet && (
        <div className={cls.orderModal_details}>
          <div className={cls.orderModal_detailsTitle}>Реквизиты для перевода:</div>
          <div className={cls.orderModal_detailsField}>
            <input
              type="text"
              value={wallet}
              disabled={true}
              className={cls.orderModal_detailsInput}
            />
            <button disabled={isWalletButtonDisabled} onClick={() => copyWalletToClipboard(wallet)}>
              {isCopiedWallet ? <Icon.Checked /> : <Icon.Copy />}
            </button>
          </div>

          <div
            onClick={() =>
              copyAmountToClipboard(String(amount).slice(0, String(amount).length - 1))
            }
            className={clsx(cls.orderModal_value, cls.orderModal_value_withCopy)}>
            <span>
              К оплате
              <div className={cls.orderModal_copySmall}>
                {isCopiedAmount ? <Icon.Checked /> : <Icon.Copy />}
              </div>
            </span>
            <span></span>
            <span>{formatNumberWithDelimiter(amount)}</span>
          </div>
        </div>
      )}
      <div className={cls.orderModal_box}>
        {!wallet && (
          <div className={cls.orderModal_value} style={{ marginTop: 32 }}>
            <span>К оплате</span>
            <span></span>
            <span>
              {formatNumberWithDelimiter(amount)} {symbol}
            </span>
          </div>
        )}
        <div className={cls.orderModal_value}>
          <span>Номер пополнения</span>
          <span></span>
          <span>{id}</span>
        </div>
        {expire && (
          <div className={cls.orderModal_value}>
            <span>Истекает через:</span>
            <span></span>
            {expire}
          </div>
        )}
        {txID && (
          <div
            onClick={() => copyTXIDToClipboard(txID)}
            className={clsx(cls.orderModal_value, cls.orderModal_value_withCopy)}>
            <span>
              TxID
              <div className={cls.orderModal_copySmall}>
                {isCopiedTXID ? <Icon.Checked /> : <Icon.Copy />}
              </div>
            </span>
            <span></span>
            <span>{txID}</span>
          </div>
        )}
        {name && (
          <div className={cls.orderModal_value}>
            <span>Наименование</span>
            <span></span>
            <span>{name}</span>
          </div>
        )}
        {count && (
          <div className={cls.orderModal_value}>
            <span>Количество</span>
            <span></span>
            <span>{count} шт</span>
          </div>
        )}
        {type && (
          <div className={cls.orderModal_value}>
            <span>Метод</span>
            <span></span>
            <span>{type}</span>
          </div>
        )}
        <div className={cls.orderModal_value}>
          <span>Дата</span>
          <span></span>
          <span>{datetime}</span>
        </div>
      </div>
      <Button
        onClick={() => handleFooterButtonClick(false)}
        className={cls.orderModal_button}
        view={EButtonView.outlined}>
        {orderStaus === 2 && 'На главную'}
        {orderStaus === 1 && 'Отменить покупку'}
        {orderStaus === 0 && 'Закрыть'}
      </Button>
    </>
  );
};

export const OrderModal: React.FC<OrderModalProps> = (props) => {
  const { onRequestClose, orderId } = props;

  const paymentData = useSelector((state: RootState) => selectAccountPayment(orderId)(state));
  const paymentFormData = useSelector(selectPayment);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (paymentData || paymentFormData) {
    const handleFooterButtonClick = (goHome: boolean) => {
      goHome && pathname !== ELocation.home && navigate(ELocation.home);
      onRequestClose();
    };

    return (
      <ModalWrapper
        closeOnBgClick={false}
        {...props}
        content={
          <div className={cls.orderModal}>
            {orderId
              ? paymentData && (
                  <ModalInfo
                    id={paymentData.id}
                    datetime={paymentData.datetime}
                    amount={paymentData.fiat}
                    orderStaus={paymentData.status}
                    txID={paymentData.txid}
                    type={paymentData.type}
                    handleFooterButtonClick={handleFooterButtonClick}
                  />
                )
              : paymentFormData && (
                  <ModalInfo
                    {...paymentFormData}
                    wallet={paymentFormData.requisites}
                    txID={paymentFormData.txid}
                    handleFooterButtonClick={handleFooterButtonClick}
                  />
                )}

            <div className={cls.orderModal_rip}>
              <Icon.ModalRip />
            </div>
          </div>
        }
      />
    );
  }
};
