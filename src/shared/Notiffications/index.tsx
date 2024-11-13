import React from 'react';
import cls from './Notiffications.module.scss';
import clsx from 'clsx';

import { Mods } from '../../app/@types/types';
import { Button, EButtonView } from '../Button';

import Icon from '../Icon';
import { NotifficationItem } from './NotifficationItem';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectNotifficationsCount } from '../../app/redux/info/selectors';
import { selectNotiffications } from '../../app/redux/notifications/selectors';
import { INotiffication } from '../../app/redux/info/types';
import { useAppDispatch } from '../../app/redux/store';
import { getNotiffications } from '../../app/redux/notifications/thunks';

export const Notiffications: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const notifficationsRef = React.useRef<HTMLDivElement | null>(null);

  const notifficationsCount = useSelector(selectNotifficationsCount);
  const notiffications: INotiffication[] = useSelector(selectNotiffications);

  const isAuth = useSelector(selectIsAuth);

  const dispatch = useAppDispatch();

  const mods: Mods = {
    [cls.notiffications_visible]: isVisible,
  };

  const handleButtonClick = () => {
    setIsVisible((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (notifficationsRef.current && !notifficationsRef.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  };

  React.useEffect(() => {
    isVisible
      ? document.addEventListener('mousedown', handleClickOutside)
      : document.removeEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible]);

  React.useEffect(() => {
    isAuth && dispatch(getNotiffications());
  }, [isAuth]);

  return (
    <div ref={notifficationsRef} className={cls.notiffications_wrapper}>
      <Button
        className={cls.notiffications_button}
        view={EButtonView.square}
        onClick={handleButtonClick}>
        <Icon.Notiffication />
        {notifficationsCount > 0 && (
          <span>{notifficationsCount > 9 ? '9+' : notifficationsCount}</span>
        )}
      </Button>
      <div className={clsx(cls.notiffications, mods)}>
        <div className={cls.notiffications_content}>
          {notiffications.map((notiffication, idx) => (
            <NotifficationItem key={`${notiffication.title}_${idx}`} {...notiffication} />
          ))}
        </div>
      </div>
    </div>
  );
};
