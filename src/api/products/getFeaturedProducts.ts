import { customAxios } from '@/lib/axios';
import { Product, StrapiResponse } from '@/types';

export const getFeaturedProducts = async () => {
  const { data } = await customAxios.get(
    '/products?type=simple&stock_status=instock'
  );
  return data;
};
