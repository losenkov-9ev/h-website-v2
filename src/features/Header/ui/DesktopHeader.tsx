import { HeaderProps } from '../types';
import cls from '../Header.module.scss';
import Icon from '../../../shared/Icon';
import { Link, useLocation } from 'react-router-dom';
import { ELoadingStatus, ELocation, Mods } from '../../../app/@types/types';
import { UserControls } from './UserControls';
import { EFormType } from '../../../widgets/Modals/FormModal';
import { HeaderSkeleton } from './HeaderSkeleton';
import { ThemeToggler } from '../../../shared/ThemeToggler';
import { useSelector } from 'react-redux';
import { Button, EButtonView } from '../../../shared/Button';
import clsx from 'clsx';
import { selectIsAuth, selectLinks, selectSupportLink } from '../../../app/redux/info/selectors';

export const DesktopHeader: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const { data: isAuthorized, status: authStatus } = useSelector(selectIsAuth);
  const { data: links, status: linksStatus } = useSelector(selectLinks);

  const supportLink = useSelector(selectSupportLink);

  const location = useLocation();

  const mods: Mods = {
    [cls.header_absolutePosition]: location.pathname === ELocation.home,
  };

  return (
    <div className={clsx(cls.header, mods)}>
      <Link to={ELocation.home} className={cls.header_logo}>
        <Icon.Logo />
      </Link>
      <div className={cls.header_menu}>
        {linksStatus === ELoadingStatus.loading ? (
          <HeaderSkeleton />
        ) : (
          <>
            <Link to={ELocation.home} className={cls.header_menuLink}>
              Товары
            </Link>
            <Link to={ELocation.reviews} className={cls.header_menuLink}>
              Отзывы
            </Link>
            {supportLink && (
              <Link to={supportLink} target="_blank" className={cls.header_menuLink}>
                Поддержка
              </Link>
            )}
            {links.map(({ link, text }) => {
              if (text) {
                return (
                  <Link to={link} className={cls.header_menuLink}>
                    {text}
                  </Link>
                );
              }
            })}
          </>
        )}
      </div>
      <div className={cls.header_controlsWrapper}>
        {authStatus === ELoadingStatus.loading ? (
          <HeaderSkeleton />
        ) : !isAuthorized ? (
          <>
            <Button
              view={location.pathname === ELocation.home ? EButtonView.empty : EButtonView.default}
              onClick={() => onOpenModal(EFormType.SignUp)}>
              Создать&nbsp;аккаунт
            </Button>
            <Button
              view={
                location.pathname === ELocation.home ? EButtonView.outlined : EButtonView.default
              }
              onClick={() => onOpenModal(EFormType.SignIn)}>
              Войти
            </Button>
          </>
        ) : (
          <UserControls />
        )}
        <ThemeToggler />
      </div>
    </div>
  );
};
