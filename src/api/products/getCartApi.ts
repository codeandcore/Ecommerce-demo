import { customAxiosCS } from '@/lib/axios';

export const getCart = async () => {
  const data= await customAxiosCS.get(
    '/cart'
  );
  
  return data;
};
