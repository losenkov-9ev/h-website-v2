import { useSelector } from 'react-redux';
import { Id, Slide, toast, ToastContent, ToastOptions } from 'react-toastify';
import { selectTheme } from '../redux/theme/selectors';
import { ETheme } from '../redux/theme/types';

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

export const useToast = () => {
  const { theme } = useSelector(selectTheme);

  const notify = (message: ToastContent, type: ToastType) => {
    const options: ToastOptions = {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: theme === ETheme.light ? 'light' : 'dark',
      transition: Slide,
    };

    toast[type](message, options);
  };

  const loading = (message: ToastContent): Id => {
    const loadingToastId = toast.loading(message, {
      position: 'top-right',
      hideProgressBar: false,
      theme: theme === ETheme.light ? 'light' : 'dark',
      transition: Slide,
    });
    return loadingToastId; // Возвращаем ID уведомления для обновления
  };

  const updateLoading = (id: Id, message: ToastContent, type: ToastType) => {
    toast.update(id, {
      render: message,
      type: type,
      isLoading: false,
      autoClose: 3000,
      closeOnClick: true,
    });
  };

  return { notify, loading, updateLoading };
};
