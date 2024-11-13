import React, { useReducer, useState, useCallback } from 'react';

import cls from './AccountControl.module.scss';
import clsx from 'clsx';

import { ConfirmModal } from '../../widgets/Modals/ConfirmModal';

import { AccountControlProps, AccountControlType } from './types/types';
import { initialState } from './state/initialState';

import { reducer } from './state/reducer';
import { content } from './content';
import { PasswordForm } from './ui/PasswordForm';
import { BalanceForm } from './ui/BalanceForm';

export const AccountControl: React.FC<AccountControlProps> = ({ type, switchTheme }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleCloseModal = useCallback(() => {
    setIsConfirmModalOpen(false);
  }, []);

  const renderInputs = () => {
    return type === AccountControlType.Password ? (
      <PasswordForm dispatch={dispatch} switchTheme={switchTheme} state={state} />
    ) : (
      <BalanceForm dispatch={dispatch} switchTheme={switchTheme} state={state} />
    );
  };

  return (
    <>
      <div className={clsx(cls.accountControl, { [cls.switchTheme]: switchTheme })}>
        <div className={cls.accountControl_title}>{content[type].title}</div>
        {renderInputs()}
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onRequestClose={handleCloseModal}
        title={content[type].modalTitle(state.payment)}
        buttonContent={content[type].modalButton}
      />
    </>
  );
};
