import { customAxios } from '@/lib/axios';
import { Product, StrapiResponse } from '@/types';

export const getFeaturedProducts = async () => {
  const { data } = await customAxios.get(
    '/products'
  );
  return data;
};
