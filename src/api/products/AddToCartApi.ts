import { customAxios } from '@/lib/axios';


export const AddToCartProduct = async (id: any) => {

  const { data } = await customAxios.post(
    `/cart/add-item?id=${id}&quantity=1`
  );

  return data;
};