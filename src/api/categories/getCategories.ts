import { customAxios } from '@/lib/axios';
import { Category, StrapiResponse } from '@/types';

export const getCategories = async () => {
  const { data } = await customAxios.get<StrapiResponse<Category[]>>(
    '/categories'
  );
  console.log("data",data);
  
  return data;
};
