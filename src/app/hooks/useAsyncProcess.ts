import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ELoadingStatus } from '../@types/types';
import { RootState, useAppDispatch } from '../redux/store';
import { ToastType, useToast } from './useToast';

type UseAsyncProcessProps = {
  statusSelector: (state: RootState) => ELoadingStatus; // Селектор статуса (например, authStatus или changePasswordStatus)
  errorSelector: (state: RootState) => string | null; // Селектор ошибки (например, authError или changePasswordError)
  successMessage?: string; // Сообщение при успехе
  onComplete?: () => void; // Колбэк на успешное завершение (например, onRequestClose)
};

export const useAsyncProcess = (props: UseAsyncProcessProps) => {
  const { statusSelector, errorSelector, successMessage, onComplete } = props;

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { notify } = useToast();

  const status = useSelector(statusSelector);
  const error = useSelector(errorSelector);

  useEffect(() => {
    if (isProcessing && status !== ELoadingStatus.loading) {
      if (error === null) {
        successMessage && notify(successMessage, ToastType.Success);
        onComplete && onComplete();
      } else {
        notify(error, ToastType.Error);
      }
      setIsProcessing(false);
    }
  }, [status, isProcessing]);

  const startProcess = () => setIsProcessing(true);

  return { dispatch, isProcessing, startProcess };
};
