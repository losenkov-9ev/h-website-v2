import React, { useEffect, useState } from 'react';
import { Filter } from '../../features/Filter';
import { ELoadingStatus, Mods } from '../../app/@types/types';
import { useSelector } from 'react-redux';
import Icon from '../../shared/Icon';
import cls from './Products.module.scss';
import clsx from 'clsx';
import { selectTheme } from '../../app/redux/theme/selectors';
import { useAppDispatch } from '../../app/redux/store';
import { fetchProducts } from '../../app/redux/products/thunks';
import { selectProducts, selectProductsStatus } from '../../app/redux/products/selectors';
import { AbridgedCard, InlineCard } from '../../features/Card';
import { CardLoader } from '../../features/Card/CardLoader';
import { useWindowWidth } from '../../app/hooks/useWindowWidth';
import { DEFAULT_SCREEN_WIDTH } from '../../app/constants';

export const Products: React.FC = () => {
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const isMobileCards = useWindowWidth(DEFAULT_SCREEN_WIDTH.L);
  const dispatch = useAppDispatch();
  const { theme } = useSelector(selectTheme);

  const [openAccordeons, setOpenAccordeons] = useState<Record<string, boolean>>({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    // Устанавливаем все аккордеоны открытыми при загрузке продуктов
    if (status === ELoadingStatus.fulfilled) {
      const initialState = Object.keys(products).reduce(
        (acc, key) => {
          acc[key] = true;
          return acc;
        },
        {} as Record<string, boolean>,
      );
      setOpenAccordeons(initialState);
    }
  }, [status, products]);

  const handleToggle = (key: string) => {
    setOpenAccordeons((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className={cls.products}>
      <div className="container">
        <div className={cls.products_head}>
          <h1 className={clsx(cls.products_title, 'h-1')}>Товары</h1>
          <Filter />
        </div>
        {status === ELoadingStatus.fulfilled ? (
          Object.entries(products).map(([key, value], idx) => {
            const isOpen = openAccordeons[key];
            const accordeonMods: Mods = {
              [cls.products_accordeon_opened]: isOpen,
            };
            return (
              <React.Fragment key={`${key}_${idx}`}>
                <div
                  className={cls.products_accordeon}
                  onClick={() => handleToggle(key)}
                  style={{ backgroundImage: `url('/top-${theme}.webp')` }}>
                  <div className={cls.products_accordeonInfo}>{key}</div>
                  <div className={clsx(cls.products_accordeonArrow, accordeonMods)}>
                    <Icon.Up />
                  </div>
                </div>
                <div
                  className={clsx(cls.products_toggleBox, accordeonMods)}
                  style={{ height: isOpen ? 'auto' : '0px' }}>
                  <div className={cls.products_cards}>
                    {value.map((product, idx) =>
                      !isMobileCards ? (
                        <InlineCard {...product} key={`${product.name}_${idx}`} />
                      ) : (
                        <AbridgedCard {...product} key={`${product.name}_${idx}`} />
                      ),
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <div className={cls.products_cards}>
            {new Array(6).fill('').map((_, idx) => (
              <CardLoader key={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
