import React, { ReactNode, useEffect, useRef, useState, createContext, useContext } from 'react';
import type { OptionProps, SelectContextProps, SelectType } from './types';

import cls from './Select.module.scss';
import Icon from '../Icon';
import clsx from 'clsx';
import { Mods } from '../../app/@types/types';

const SelectContext = createContext<SelectContextProps | undefined>(undefined);

const Select: SelectType = (props) => {
  const {
    children,
    placeholder = 'Drop Down',
    fullWidth = false,
    onChange,
    className,
    withShadow,
    themeReverse,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | ReactNode>('');

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleSelect = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (value: string | ReactNode) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (onChange) onChange(selectedValue);
  }, [selectedValue, onChange]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const mods: Mods = {
    [cls.fullWidth]: fullWidth,
    [cls.withShadow]: withShadow,
    [cls.themeReverse]: themeReverse,
  };

  return (
    <SelectContext.Provider value={{ selectedValue, handleOptionClick }}>
      <div className={clsx(cls.select, mods, className)} ref={dropdownRef}>
        <div
          className={clsx(cls.select_field, 'select_field', { [cls.select_field_active]: isOpen })}
          onClick={toggleSelect}>
          {selectedValue || placeholder}
          <Icon.SelectToggler />
        </div>
        {isOpen && <div className={cls.select_dropdown}>{children}</div>}
      </div>
    </SelectContext.Provider>
  );
};

const Option: React.FC<OptionProps> = ({ value, onSelect, children }) => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error('Option must be used within a Select component');
  }

  const { handleOptionClick } = context;

  const handleClick = () => {
    handleOptionClick(children);
    if (onSelect) onSelect(value);
  };

  return (
    <div onClick={handleClick} className={cls.select_option}>
      {children}
    </div>
  );
};

Select.Option = Option;

export default Select;
