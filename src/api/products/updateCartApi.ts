import { customAxiosCS } from '@/lib/axios';

export const updateCartItem = async (key: string, quantity: number) => {
  const formData = new FormData();
  formData.append('key', key);
  formData.append('quantity', quantity.toString());

  const { data } = await customAxiosCS.post(
    '/cart/update-item',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return data;
};