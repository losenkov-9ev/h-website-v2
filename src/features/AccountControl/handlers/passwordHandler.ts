import { Slide, toast } from 'react-toastify';

export const passwordHandler = (setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  toast.error('🦄 Wow so easy!', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Slide,
  });
  setModalIsOpen(false);
};
