import clsx from 'clsx';
import cls from '../Header.module.scss';
import { MobileHeaderProps } from '../types';
import { ThemeToggler } from '../../../shared/ThemeToggler';
import { Link, useLocation } from 'react-router-dom';
import { ELoadingStatus, ELocation, Mods } from '../../../app/@types/types';
import { Button, EButtonView } from '../../../shared/Button';
import { EFormType } from '../../../widgets/Modals/FormModal';
import { useSelector } from 'react-redux';
import { UserControls } from './UserControls';
import Icon from '../../../shared/Icon';
import { Notiffications } from '../../../shared/Notiffications';
import { selectTheme } from '../../../app/redux/theme/selectors';
import { selectIsAuth, selectLinks, selectSupportLink } from '../../../app/redux/info/selectors';
import { HeaderSkeleton } from './HeaderSkeleton';

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  isMenuOpen,
  onToggleMenu,
  onOpenModal,
}) => {
  const { data: isAuthorized } = useSelector(selectIsAuth);
  const { data: links, status: linksStatus } = useSelector(selectLinks);
  const supportLink = useSelector(selectSupportLink);

  const location = useLocation();

  const mods: Mods = {
    [cls.headerMenu_footer_authorized]: isAuthorized,
  };

  const { theme } = useSelector(selectTheme);

  return (
    <>
      <div className={cls.headerMobile}>
        <div className={clsx(cls.headerMobile_inner, 'container')}>
          <Link
            to={ELocation.home}
            className={clsx(cls.headerMobile_logo, {
              [cls.headerMobile_logoHome]: location.pathname === ELocation.home,
            })}>
            <Icon.LogoMobile />
          </Link>
          <div className={cls.headerMobile_controls}>
            <ThemeToggler />
            <Notiffications />
            <Button
              onClick={onToggleMenu}
              className={cls.headerMobile_burger}
              view={EButtonView.square}
              themeReverse={true}
              fullWidth={false}>
              <Icon.Burger />
            </Button>
          </div>
        </div>
      </div>
      <div
        className={clsx(cls.headerMenu, { [cls.opened]: isMenuOpen })}
        style={{ backgroundImage: `url('/top-${theme}.webp')` }}>
        <div className={cls.headerMenu_box}>
          {linksStatus === ELoadingStatus.loading ? (
            <HeaderSkeleton />
          ) : (
            <>
              <Link to={ELocation.home} className={cls.headerMenu_link}>
                Товары
              </Link>
              <Link to={ELocation.reviews} className={cls.headerMenu_link}>
                Отзывы
              </Link>
              {supportLink && (
                <Link to={supportLink} target="_blank" className={cls.headerMenu_link}>
                  Поддержка
                </Link>
              )}
              {links.map(({ link, text }) => {
                if (text) {
                  return (
                    <Link to={link} className={cls.headerMenu_link}>
                      {text}
                    </Link>
                  );
                }
              })}
            </>
          )}
        </div>
        <div className={clsx(cls.headerMenu_footer, mods)}>
          {!isAuthorized ? (
            <>
              <Button
                className={cls.headerMenu_footerButton}
                onClick={() => onOpenModal(EFormType.SignIn)}>
                <Icon.SignIn />
                Войти
              </Button>
              <Button
                className={cls.headerMenu_footerButton}
                onClick={() => onOpenModal(EFormType.SignUp)}
                view={EButtonView.outlined}>
                <Icon.SignUp />
                Создать аккаунт
              </Button>
            </>
          ) : (
            <UserControls />
          )}
        </div>
      </div>
    </>
  );
};
