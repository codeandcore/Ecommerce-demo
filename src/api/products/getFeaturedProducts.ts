import { customAxios } from '@/lib/axios';
import { Product, StrapiResponse } from '@/types';

export const getFeaturedProducts = async () => {
  const { data } = await customAxios.get(
    '/products?featured=true&per_page=8'
  );
  return data;
};
