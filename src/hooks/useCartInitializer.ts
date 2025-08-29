import { useCartStore } from "@/stores/cart";
import { useEffect } from "react";

export const useCartInitializer = () => {
  const fetchCart = useCartStore((state:any) => state.fetchCart);
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);
};