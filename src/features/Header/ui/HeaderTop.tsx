import cls from '../Header.module.scss';
import { ThemeToggler } from '../../../shared/ThemeToggler';
import { EFormType } from '../../../widgets/Modals/FormModal';
import { HeaderProps } from '../types';
import { UserControls } from './UserControls';
import { useSelector } from 'react-redux';
import { HeaderSkeleton } from './HeaderSkeleton';
import Icon from '../../../shared/Icon';
import { ELoadingStatus } from '../../../app/@types/types';
import { Button } from '../../../shared/Button';
import { selectIsAuth } from '../../../app/redux/info/selectors';

export const HeaderTop: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const { data: isAuthorized, status: authStatus } = useSelector(selectIsAuth);

  return (
    <div className={cls.header_top}>
      <ThemeToggler />
      {authStatus === ELoadingStatus.loading ? (
        <HeaderSkeleton />
      ) : !isAuthorized ? (
        <div className={cls.header_controls}>
          <Button onClick={() => onOpenModal(EFormType.SignIn)}>
            Вход <Icon.SignIn />
          </Button>
          <Button onClick={() => onOpenModal(EFormType.SignUp)}>
            Регистрация <Icon.SignUp />
          </Button>
        </div>
      ) : (
        <UserControls />
      )}
    </div>
  );
};
