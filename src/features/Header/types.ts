import { useLocation } from 'react-router-dom';
import { EFormType } from '../../widgets/Modals/FormModal';

export interface MobileHeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  location: ReturnType<typeof useLocation>;
  onOpenModal: (type: EFormType) => void;
}

export interface HeaderProps {
  location?: ReturnType<typeof useLocation>;
  onOpenModal: (type: EFormType) => void;
}
