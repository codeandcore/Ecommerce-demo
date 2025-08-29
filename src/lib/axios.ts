import axios from "axios";

export const customAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BE_URL}`,
});
customAxios.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const nonce = localStorage.getItem("api_nonce");
    if (nonce) {
      config.headers["Nonce"] = nonce;
    }
  }
  return config;
});
export const customAxiosCS = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_FE_URL}`,
});
customAxiosCS.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const nonce = localStorage.getItem("api_nonce");
    console.log('nonce', nonce);
    
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