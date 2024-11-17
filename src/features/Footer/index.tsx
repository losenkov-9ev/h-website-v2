import React from 'react';
import cls from './Footer.module.scss';
import Icon from '../../shared/Icon';
import { useSelector } from 'react-redux';
import { selectSiteInfo } from '../../app/redux/info/selectors';

export const Footer: React.FC = () => {
  const { siteInfo } = useSelector(selectSiteInfo);
  const currentYear = new Date().getFullYear();

  return (
    <div className={cls.footer}>
      <div className="container">
        <div className={cls.footer_inner}>
          <div className={cls.footer_copy}>
            © {currentYear} {siteInfo.title}. All rights reserved
          </div>
          <a href="#" className={cls.footer_up}>
            <Icon.GoUp />
          </a>
        </div>
      </div>
    </div>
  );
};
