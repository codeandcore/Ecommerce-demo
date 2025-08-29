import { Product } from '@/types';

type Filter = {
  isNew: boolean;
  types: string[];
  brands: string[];
  price: {
    minPrice: number | '';
    maxPrice: number | '';
  };
  sizes: string[];
};

const filterMethods = [
  (product: any, filter: Filter) =>
    filter.isNew ? product.attributes.isNew : true,

  (product: any, filter: Filter) =>
    filter.types.length > 0
      ? filter.types.includes(product.name)
      : true,

  (product: any, filter: Filter) =>
    filter.brands.length > 0
      ? filter.brands.includes(product.name)
      : true,

  (product: any, filter: Filter) => {
    const { minPrice, maxPrice } = filter.price;

    const min = typeof minPrice === 'number' ? minPrice : 0;
    const max = typeof maxPrice === 'number' ? maxPrice : Infinity;

    if (product.prices?.price >= min && product.prices?.price <= max) {
      return true;
    }

    return false;
  },

  (product: any, filter: Filter) =>
    filter.sizes.length > 0
      ? filter.sizes.some((s) => product.attributes.sizes.includes(s))
      : true,
];

export const filterProducts = (products: Product[], filter: Filter) => {
  
  const { isNew, types, brands, price, sizes } = filter;

  if (
    isNew === false &&
    types.length === 0 &&
    brands.length === 0 &&
    price.minPrice === '' &&
    price.maxPrice === '' &&
    sizes.length === 0
  ) {
    return products;
  }

  return products.filter((product) => {
    for (let i = 0; i < filterMethods.length; i++) {
      if (!filterMethods[i](product, filter)) {
        return false;
      }
    }
    return true;
  });
};
