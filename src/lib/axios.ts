import axios from "axios";
 
export const customAxios = axios.create({
  baseURL: "/api",
});
customAxios.interceptors.request.use((config) => {
  console.log("config", config);
  
  if (typeof window !== "undefined") {
    const nonce = localStorage.getItem("api_nonce");
    if (nonce) {
      config.headers["Nonce"] = nonce;
    }
  }
  return config;
});
export const customAxiosCS = axios.create({
  baseURL: "/api",
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