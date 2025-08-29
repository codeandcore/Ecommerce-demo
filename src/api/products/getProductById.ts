import { customAxios } from '@/lib/axios';
import { Product, StrapiResponse } from '@/types';

export const getProductById = async (id: string) => {
  const { data } = await customAxios.get(
    `/products/${id}`
  );
  return data;
};
