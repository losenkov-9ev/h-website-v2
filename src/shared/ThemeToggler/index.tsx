import React from 'react';

import { useAppDispatch } from '../../app/redux/store';
import { useSelector } from 'react-redux';

import { selectTheme } from '../../app/redux/theme/selectors';
import { ETheme } from '../../app/redux/theme/types';
import { switchTheme } from '../../app/redux/theme/slice';
import Icon from '../Icon';

import { Button, EButtonView } from '../Button';

export const ThemeToggler: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useSelector(selectTheme);

  const handleThemeChange = () => {
    theme === ETheme.light
      ? dispatch(switchTheme(ETheme.dark))
      : dispatch(switchTheme(ETheme.light));
  };

  return (
    <Button view={EButtonView.square} onClick={handleThemeChange} fullWidth={false}>
      {theme === ETheme.dark ? <Icon.ThemeLight /> : <Icon.ThemeDark />}
    </Button>
  );
};
