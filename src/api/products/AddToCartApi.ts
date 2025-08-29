import { customAxiosCS } from '@/lib/axios';


export const AddToCartProduct = async (id: any) => {

  const { data } = await customAxiosCS.post(
    `/cart/add-item?id=${id}&quantity=1`
  );

  return data;
};