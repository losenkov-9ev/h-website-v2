import React from 'react';
import cls from './ReviewCard.module.scss';
import { Rate } from '../../shared/Rate';
import { ReadMore } from '../../shared/ReadMore';
import { ReviewModal } from '../../widgets/Modals/ReviewModal';
import { useReviewsContext } from '../../widgets/Reviews/context/context';
import { IReviewData } from '../../app/redux/reviews/types';
import { selectCurrency } from '../../app/redux/info/selectors';
import { useSelector } from 'react-redux';
import { formatNumberWithDelimiter } from '../../app/utils/formatNumberWithDelimiter';

export const ReviewCard: React.FC<IReviewData> = (props) => {
  const { type } = useReviewsContext();
  const { title, sum, stars, text } = props;

  const { symbol: currencySymbol } = useSelector(selectCurrency);

  const [isModalOpened, setIsModalOpened] = React.useState<boolean>(false);

  const onCloseModal = () => {
    setIsModalOpened(false);
  };
  const onOpenModal = () => {
    setIsModalOpened(true);
  };

  return (
    <>
      <div className={cls.reviewCard}>
        <div className={cls.reviewCard_head}>
          <div className={cls.reviewCard_title}>{title}</div>
          <div className={cls.reviewCard_price}>
            ({formatNumberWithDelimiter(sum)} {currencySymbol})
          </div>
        </div>
        <Rate value={stars} gap={8} />
        <div className={cls.reviewCard_content}>
          {type === 'default' ? <ReadMore text={text} onReadMore={onOpenModal} /> : text}
        </div>
      </div>
      {type === 'default' && (
        <ReviewModal
          title={title}
          rate={stars}
          text={text}
          price={sum}
          isOpen={isModalOpened}
          onRequestClose={onCloseModal}
        />
      )}
    </>
  );
};
