import { ReactNode } from 'react';

export interface SelectProps {
  children: ReactNode;
  placeholder?: string | ReactNode;
  fullWidth?: boolean;
  withShadow?: boolean;
  onChange?: (value: string | ReactNode) => void;
  className?: string;
  themeReverse?: boolean;
}

export interface OptionProps {
  value: string;
  onSelect?: (value: string | ReactNode) => void;
  children: ReactNode;
}

export interface SelectContextProps {
  selectedValue: string | ReactNode;
  handleOptionClick: (value: string | ReactNode) => void;
}

export type SelectType = React.FC<SelectProps> & { Option: React.FC<OptionProps> };
