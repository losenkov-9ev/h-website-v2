import React from 'react';
import cls from './AccontPurchaseHistory.module.scss';
import { AbridgedCard, InlineCard } from '../../features/Card';
import { useAppDispatch } from '../../app/redux/store';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { useWindowWidth } from '../../app/hooks/useWindowWidth';
import { DEFAULT_SCREEN_WIDTH } from '../../app/constants';
import { fetchAllOrders } from '../../app/redux/orders/thunks';
import { selectAllOrders, selectAllOrdersStatus } from '../../app/redux/orders/selectors';
import { ELoadingStatus } from '../../app/@types/types';
import { CardLoader } from '../../features/Card/CardLoader';
import { InlineCardLoader } from '../../features/Card/InlineCardLoader';

export const AccontPurchaseHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const isMobile = useWindowWidth(DEFAULT_SCREEN_WIDTH.L);

  const products = useSelector(selectAllOrders);
  const productsStatus = useSelector(selectAllOrdersStatus);

  React.useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);

  return (
    <div className={cls.accontPurchaseHistory}>
      <div className="container">
        <div className={cls.accontPurchaseHistory_inner}>
          <div className={clsx(cls.accontPurchaseHistory_title, 'h-1')}>История покупок</div>
          <div className={cls.accontPurchaseHistory_box}>
            {productsStatus !== ELoadingStatus.fulfilled
              ? new Array(6)
                  .fill('')
                  .map((_, idx) =>
                    !isMobile ? <InlineCardLoader key={idx} /> : <CardLoader key={idx} />,
                  )
              : products?.orders.map(({ title: name, id, amount: price, datetime }, idx) =>
                  !isMobile ? (
                    <InlineCard
                      key={`${id}_${idx}`}
                      date={datetime}
                      name={name}
                      id={id}
                      price={price}
                    />
                  ) : (
                    <AbridgedCard
                      key={`${id}_${idx}`}
                      date={datetime}
                      name={name}
                      id={id}
                      price={price}
                    />
                  ),
                )}
          </div>
        </div>
      </div>
    </div>
  );
};
