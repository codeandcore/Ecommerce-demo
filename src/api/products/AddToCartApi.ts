import { customAxios } from '@/lib/axios';
import { Product, StrapiResponse } from '@/types';

export const AddToCartProduct = async (id:any) => {
  const { data } = await customAxios.post(
    `/cart/add-item?id=${id}&quantity=1`
  );
  
  return data;
};
