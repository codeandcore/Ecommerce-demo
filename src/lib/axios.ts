import axios from "axios";

export const customAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BE_URL}`,
});
export const stripeAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ORDER_TOKEN}`,
  },
});
