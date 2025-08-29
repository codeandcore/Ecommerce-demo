import { customAxios } from '@/lib/axios';
import { Product, StrapiResponse } from '@/types';
import axios from 'axios';

export const getCart = async () => {
  const data= await axios.get(
    '/api/cart'
  );
  
  return data;
};
