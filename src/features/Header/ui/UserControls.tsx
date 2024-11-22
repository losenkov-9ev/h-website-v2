import cls from '../Header.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../app/redux/store';
import { ELocation } from '../../../app/@types/types';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../shared/Icon';
import { useWindowWidth } from '../../../app/hooks/useWindowWidth';
import { DEFAULT_SCREEN_WIDTH } from '../../../app/constants';
import { Button, EButtonView } from '../../../shared/Button';
import { Notiffications } from '../../../shared/Notiffications';
import { fetchLogout } from '../../../app/redux/auth/thunks';
import { selectAccount, selectCurrency, selectIsAuth } from '../../../app/redux/info/selectors';
import { formatNumberWithDelimiter } from '../../../app/utils/formatNumberWithDelimiter';

export const UserControls: React.FC = () => {
  const {
    data: { data: user },
  } = useSelector(selectAccount);
  const isAuth = useSelector(selectIsAuth);

  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const isMobileHeader = useWindowWidth(DEFAULT_SCREEN_WIDTH.L);
  const isVisibleName = !useWindowWidth(DEFAULT_SCREEN_WIDTH.XL);

  const { symbol: currencySymbol } = useSelector(selectCurrency);

  const handleLogout = () => {
    dispath(fetchLogout());
  };

  if (user) {
    const { login: userName, balance } = user;

    return !isMobileHeader ? (
      <div className={cls.header_controls}>
        <Button fullWidth={false} view={EButtonView.empty}>
          {isVisibleName && 'Баланс: '} {formatNumberWithDelimiter(balance)} {currencySymbol}
        </Button>
        <Button fullWidth={false} onClick={() => navigate(ELocation.profile)}>
          <Icon.SignIn />
          {isVisibleName && (userName ? userName : '...')}
        </Button>
        <Button view={EButtonView.square} onClick={handleLogout}>
          <Icon.Logout />
        </Button>
        {isAuth && <Notiffications />}
      </div>
    ) : (
      <>
        <Button onClick={handleLogout} className="link">
          <Icon.Logout />
        </Button>
        <Button onClick={() => navigate(ELocation.profile)} className="link">
          <Icon.SignIn />
          {userName ? userName : '...'}
        </Button>
        <span>
          Баланс: {formatNumberWithDelimiter(balance)} {currencySymbol}
        </span>
      </>
    );
  }
};
