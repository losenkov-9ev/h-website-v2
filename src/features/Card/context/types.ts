import { ReactNode } from 'react';

export interface CardContextProps {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  cardData: CardProps | AbridgedCardProps;
}

export interface CardProviderProps {
  children: ReactNode;
  cardData: CardProps | AbridgedCardProps;
}

export interface CardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  date?: string;
  category_name: string;
  showcase_name: string;
  section_name: string;
}

export interface AbridgedCardProps {
  id: number;
  name: string;
  price: number;
  date?: string;
}

// Type Guard для проверки типа
export function isCardProps(cardData: CardProps | AbridgedCardProps): cardData is CardProps {
  return (
    (cardData as CardProps).showcase_name !== undefined &&
    (cardData as CardProps).category_name !== undefined &&
    (cardData as CardProps).section_name !== undefined
  );
}
