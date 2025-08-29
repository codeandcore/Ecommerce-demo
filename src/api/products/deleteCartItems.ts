import { customAxiosCS } from '@/lib/axios';

export const deleteCartItem = async (key: string) => {
  try {
    const formData = new FormData();
    formData.append('key', key);

    const response = await customAxiosCS.post(
      '/api/cart/remove-item',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error removing cart item:', error);
    throw error;
  }
};