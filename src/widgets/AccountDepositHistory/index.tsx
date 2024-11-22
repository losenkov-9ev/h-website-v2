import React from 'react';

import cls from './AccountDepositHistory.module.scss';
import clsx from 'clsx';

import { EmptyBlock } from '../../shared/EmptyBlock';
import { useSelector } from 'react-redux';
import { selectAllPayments } from '../../app/redux/info/selectors';
import { DepositCard } from '../../features/DepositCard';
import { CardLoader } from '../../features/Card/CardLoader';
import { ELoadingStatus } from '../../app/@types/types';
import { InlineCardLoader } from '../../features/Card/InlineCardLoader';
import { useWindowWidth } from '../../app/hooks/useWindowWidth';
import { DEFAULT_SCREEN_WIDTH } from '../../app/constants';

export const AccountDepositHistory: React.FC = () => {
  const { items, status } = useSelector(selectAllPayments);
  const isMobile = useWindowWidth(DEFAULT_SCREEN_WIDTH.L);

  return (
    <div className={cls.accountDepositHistory}>
      <div className="container">
        <div className={cls.accountDepositHistory_inner}>
          <div className={clsx(cls.accountDepositHistory_title, 'h-1')}>История пополнений</div>
          <div className={cls.accountDepositHistory_box}>
            {status === ELoadingStatus.fulfilled ? (
              items.length ? (
                items.map((item, idx) => (
                  <DepositCard
                    id={item.id}
                    value={item.fiat}
                    date={item.datetime}
                    status={item.status}
                    currency={item.type}
                    key={`${item.type}_${idx}`}
                  />
                ))
              ) : (
                <EmptyBlock value="Вы пока не пополняли аккаунт" />
              )
            ) : (
              new Array(6)
                .fill('')
                .map((_, idx) =>
                  !isMobile ? <InlineCardLoader key={idx} /> : <CardLoader key={idx} />,
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
