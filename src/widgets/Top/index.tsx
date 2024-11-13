import React from 'react';
import cls from './Top.module.scss';
import { Rate } from '../../shared/Rate';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../app/redux/theme/selectors';
import { selectSiteInfo } from '../../app/redux/info/selectors';
import { ELoadingStatus } from '../../app/@types/types';
import { TopSkeleton } from './TopSkeleton';

export const Top: React.FC = () => {
  const { theme } = useSelector(selectTheme);
  const { siteInfo, siteRate, status } = useSelector(selectSiteInfo);

  return (
    <div className={cls.top} style={{ backgroundImage: `url('/top-${theme}.webp')` }}>
      <div className="container">
        <div className={cls.top_inner}>
          {status === ELoadingStatus.loading ? (
            <TopSkeleton />
          ) : (
            <>
              <div className={cls.top_head}>
                <Rate value={siteRate.stars} />
                <span>{siteRate.count} отзывов</span>
              </div>
              <h1 className={cls.top_title}>{siteInfo.title}</h1>
              <div className={cls.top_desription}>{siteInfo.description}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
