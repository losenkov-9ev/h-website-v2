import React from 'react';
import { AccontSettings } from '../../widgets/AccountSettings';
import { AccontPurchaseHistory } from '../../widgets/AccontPurchaseHistory';
import { AccountDepositHistory } from '../../widgets/AccountDepositHistory';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ELocation } from '../../app/@types/types';
import { selectIsAuth } from '../../app/redux/info/selectors';

export const Profile: React.FC = () => {
  const { data: isAuth } = useSelector(selectIsAuth);

  return isAuth ? (
    <>
      <AccontSettings />
      <AccontPurchaseHistory />
      <AccountDepositHistory />
    </>
  ) : (
    <Navigate to={ELocation.home} />
  );
};
