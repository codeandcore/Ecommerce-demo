import axios from "axios";

export const customAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BE_URL}`,
});
customAxios.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const nonce = localStorage.getItem("api_nonce"); // or from Zustand
    if (nonce) {
      config.headers["Nonce"] = nonce;
    }
  }
  return config;
});
export const stripeAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ORDER_TOKEN}`,
  },
});