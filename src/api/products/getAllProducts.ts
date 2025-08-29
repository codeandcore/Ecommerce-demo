import { customAxios } from '@/lib/axios';
import { Product, StrapiResponse } from '@/types';

export const getAllProducts = async () => {
  const { data } = await customAxios.get(
    '/products'
  );
  console.log("data",data);
  
  return data;
};
