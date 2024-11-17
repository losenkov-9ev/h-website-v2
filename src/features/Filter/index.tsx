import React from 'react';
import Select from '../../shared/Select';
import cls from './Filter.module.scss';
import { useSelector } from 'react-redux';
import { ELoadingStatus } from '../../app/@types/types';
import { FilterLoader } from './FilterLoader';
import { TFilterType } from '../../app/redux/products/types';
import { fetchProducts } from '../../app/redux/products/thunks';
import { useAppDispatch } from '../../app/redux/store';
import { selectFilters } from '../../app/redux/info/selectors';

enum EFilterNames {
  showcases = 'Витрины',
  sections = 'Разделы',
}

export const Filter: React.FC = () => {
  const dispatch = useAppDispatch();

  const { filters, status: filtersStatus } = useSelector(selectFilters);

  const handleFilterBy = (name: string, id: string) => {
    dispatch(fetchProducts([{ filter: name, id: Number(id) }]));
  };

  return filtersStatus === ELoadingStatus.fulfilled ? (
    <div className={cls.filter}>
      {Object.entries(filters).map(([filterName, items], idx) => (
        <Select
          className={cls.filter_select}
          key={`${filterName}_${idx}`}
          withShadow={false}
          isDropdownFullWidth={true}
          placeholder={EFilterNames[filterName as keyof typeof EFilterNames]}>
          {(items as TFilterType[]).map(({ id, name }: TFilterType, idx: number) => (
            <Select.Option
              key={`${name}_${idx}_${id}`}
              onSelect={(value) => handleFilterBy(filterName, String(value))}
              value={String(id)}>
              {name}
            </Select.Option>
          ))}
        </Select>
      ))}
    </div>
  ) : (
    <FilterLoader />
  );
};
