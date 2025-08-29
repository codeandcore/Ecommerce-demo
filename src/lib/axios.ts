import axios from 'axios';

export const customAxios = axios.create({
  baseURL: "https://lightslategrey-mink-262348.hostingersite.com/wp-json/wc/v3", // e.g., 'https://yourstore.com/wp-json/wc/v3'
  params: {
    consumer_key: "ck_93191dd281518e28493431dac6738286d856d10d",
    consumer_secret: "cs_76e0cc6f96e3294256997a3f00e0b82ca2d2cc89",
  },
});
export const stripeAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ORDER_TOKEN}`,
  },
});
