import React from 'react';

import { AbridgedCardProps, CardProps, isCardProps } from './context/types';
import { PaymentModal } from '../../widgets/Modals/PaymentModal';
import { useWindowWidth } from '../../app/hooks/useWindowWidth';
import { DEFAULT_SCREEN_WIDTH } from '../../app/constants';
import { Button, EButtonView } from '../../shared/Button';
import { CardProvider } from './context/Provider';
import { CardContext } from './context/context';
import { Mods } from '../../app/@types/types';
import { useContext } from 'react';

import Icon from '../../shared/Icon';
import cls from './Card.module.scss';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectCurrency } from '../../app/redux/info/selectors';
import { formatNumberWithDelimiter } from '../../app/utils/formatNumberWithDelimiter';
import { ProductModal } from '../../widgets/Modals/ProductModal';

interface CardContentProps {
  type: 'abridged' | 'normal' | 'inline';
}

const CardContent: React.FC<CardContentProps> = ({ type }) => {
  const [isInfoModalOpened, setIsInfoModalOpened] = React.useState<boolean>(false);

  const { symbol: currencySymbol } = useSelector(selectCurrency);
  const { openModal, cardData } = useContext(CardContext);
  const { name, price } = cardData;

  const isMobile = useWindowWidth(DEFAULT_SCREEN_WIDTH.S);

  const onCloseInfoModal = () => {
    setIsInfoModalOpened(false);
  };

  const onOpenInfoModal = () => {
    cardData.date && setIsInfoModalOpened(true);
  };

  const mods: Mods = {
    [cls.card_abridged]: type === 'abridged',
    [cls.card_inline]: type === 'inline',
    [cls.card_info]: cardData.date,
  };

  return (
    <>
      <div onClick={onOpenInfoModal} className={clsx(cls.card, mods)}>
        {isCardProps(cardData) && type === 'normal' ? (
          <div className={cls.card_head}>
            <div className={cls.card_breadcrumbs}>
              <span>{cardData.showcase_name}</span>
              <span> / </span>
              <span>{cardData.category_name}</span>
              <span> / </span>
              <span>{cardData.section_name}</span>
            </div>
            <div className={cls.card_title}>{name}</div>
          </div>
        ) : (
          <div className={cls.card_title}>{name}</div>
        )}

        {isCardProps(cardData) && type === 'normal' && cardData.image && (
          <div className={cls.card_image}>
            <img src={cardData.image} alt="" />
          </div>
        )}

        <div className={cls.card_footer}>
          <div className={cls.card_price}>
            {formatNumberWithDelimiter(price)} {currencySymbol}
          </div>
          {cardData.date ? (
            <div className={cls.card_date}>{cardData.date}</div>
          ) : (
            <Button
              className={cls.card_button}
              fullWidth={!isMobile}
              isNotCetered={isMobile}
              onClick={openModal}
              view={type === 'inline' ? EButtonView.outlined : EButtonView.default}>
              {!isMobile ? 'Купить' : <Icon.Cart />}
            </Button>
          )}
        </div>
      </div>
      <PaymentModal />
      {cardData.date && (
        <ProductModal onRequestClose={onCloseInfoModal} isOpen={isInfoModalOpened} />
      )}
    </>
  );
};

export const Card: React.FC<CardProps> = (props) => {
  return (
    <CardProvider cardData={props}>
      <CardContent type="normal" />
    </CardProvider>
  );
};

export const AbridgedCard: React.FC<AbridgedCardProps> = (props) => {
  return (
    <CardProvider cardData={props}>
      <CardContent type="abridged" />
    </CardProvider>
  );
};
export const InlineCard: React.FC<AbridgedCardProps> = (props) => {
  return (
    <CardProvider cardData={props}>
      <CardContent type="inline" />
    </CardProvider>
  );
};
