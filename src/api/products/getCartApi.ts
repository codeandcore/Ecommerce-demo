import { customAxiosCS } from '@/lib/axios';

export const getCart = async () => {
  const data= await customAxiosCS.get(
    '/api/cart'
  );
  
  return data;
};
