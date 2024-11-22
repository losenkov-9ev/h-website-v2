import React from 'react';
import cls from './Notiffications.module.scss';
import Icon from '../Icon';

interface NotifficationItemProps {
  title: string;
  text: string;
  image?: string | null;
}

export const NotifficationItem: React.FC<NotifficationItemProps> = ({ title, text, image }) => {
  return (
    <div className={cls.notifficationItem}>
      <div className={cls.notifficationItem_title}>{title}</div>
      {image && <img src={`${import.meta.env.VITE_API_URL}/${image}`} alt="" />}
      <div className={cls.notifficationItem_text}>{text}</div>
      <div className={cls.notifficationItem_close}>
        <Icon.CloseNotiffication />
      </div>
    </div>
  );
};
