import { createContext } from 'react';
import { CardContextProps } from './types';

const defaultCardData: CardContextProps['cardData'] = {
  id: 0,
  name: '',
  price: 0,
  showcase_name: '',
  category_name: '',
  section_name: '',
  image: '',
};

export const CardContext = createContext<CardContextProps>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  cardData: defaultCardData,
});
