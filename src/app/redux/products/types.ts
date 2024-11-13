import { ELoadingStatus } from '../../@types/types';

export type TFilterType = { id: number; name: string };
export type TFilterData = {
  sections: TFilterType[];
  categories: TFilterType[];
};

export interface IProduct {
  id: number;
  status: boolean;
  image: string;
  section_id: number;
  category_id: number;
  name: string;
  price: number;
  description: string;
  datetime: string;
  showcase_name: string;
  section_name: string;
  category_name: string;
  num_product_data: number;
}

export type IResponse = {
  products: Record<string, IProduct[]>;
  filters: TFilterData;
};

export interface IProductsState extends IResponse {
  status: ELoadingStatus;
}
