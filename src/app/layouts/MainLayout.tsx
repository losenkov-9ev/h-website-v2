import React from 'react';

import { Header } from '../../features/Header';
import { Footer } from '../../features/Footer';

import { Outlet } from 'react-router-dom';
import { Chat } from '../../features/Chat';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectSupportChat } from '../redux/info/selectors';

export const MainLayout: React.FC = () => {
  const { data: isAuth } = useSelector(selectIsAuth);
  const isChatSupport = useSelector(selectSupportChat);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {isAuth && isChatSupport && <Chat />}
    </>
  );
};
