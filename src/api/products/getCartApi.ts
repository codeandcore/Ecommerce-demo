import { customAxios } from '@/lib/axios';
import { Product, StrapiResponse } from '@/types';

export const getCart = async () => {
  const data= await customAxios.get(
    '/cart'
  );
  
  return data;
};
