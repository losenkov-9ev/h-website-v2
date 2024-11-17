import { IProduct } from '../redux/products/types';

type Products = {
  [section: string]: IProduct[];
};

export function findProductById(
  products: Products,
  id: number,
): { product: IProduct; section: string } | null {
  for (const [section, items] of Object.entries(products)) {
    const product = items.find((item) => item.id === id);

    if (product) {
      return { product, section };
    }
  }
  return null;
}
