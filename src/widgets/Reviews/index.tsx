import React from 'react';

import { selectReviews, selectReviewsStatus } from '../../app/redux/reviews/selectors';
import { ReviewCard } from '../../features/ReviewCard';
import { fetchReviews } from '../../app/redux/reviews/thunks';
import { useAppDispatch } from '../../app/redux/store';
import { ReviewsProvider } from './context/provider';
import { useSelector } from 'react-redux';

import cls from './Reviews.module.scss';
import clsx from 'clsx';
import { Button } from '../../shared/Button';
import { ELoadingStatus, Mods } from '../../app/@types/types';
import { ReviewCardLoader } from '../../features/ReviewCard/ReviewCardLoader';
import { useWindowWidth } from '../../app/hooks/useWindowWidth';
import { DEFAULT_SCREEN_WIDTH } from '../../app/constants';

export interface ReviewsProps {
  title?: string;
  type?: 'default' | 'masonry';
  isReviewsPage?: boolean;
}

export const Reviews: React.FC<ReviewsProps> = ({
  title = '',
  type = 'default',
  isReviewsPage = false,
}) => {
  const [page, setPage] = React.useState<number>(1);

  const dispatch = useAppDispatch();

  const items = useSelector(selectReviews);
  const status = useSelector(selectReviewsStatus);

  const isMobileReviews = useWindowWidth(DEFAULT_SCREEN_WIDTH.L);

  React.useEffect(() => {
    dispatch(fetchReviews({ page }));
  }, [page]);

  const mods: Mods = {
    [cls.reviews_page]: isReviewsPage,
  };

  return (
    <ReviewsProvider title={title} type={type}>
      <div className={clsx(cls.reviews, mods)}>
        <div className="container">
          {title && <div className={clsx(cls.reviews_title, 'h-1')}>{title}</div>}

          {status === ELoadingStatus.fulfilled ? (
            <div
              className={
                type === 'masonry' && !isMobileReviews ? cls.reviews_masonry : cls.reviews_box
              }>
              {items.map((item, idx) => (
                <ReviewCard key={`${item.title}_${idx}`} {...item} />
              ))}
            </div>
          ) : (
            <div className={cls.reviews_box}>
              {new Array(6).fill('').map((_, idx) => (
                <ReviewCardLoader key={idx} />
              ))}
            </div>
          )}
          <Button
            fullWidth={false}
            className={cls.reviews_loadMore}
            onClick={() => setPage((prev) => prev + 1)}>
            Смотреть все
          </Button>
        </div>
      </div>
    </ReviewsProvider>
  );
};
