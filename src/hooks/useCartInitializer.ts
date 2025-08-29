import { useCartStore } from "@/stores/cart";
import { useEffect } from "react";

export const useCartInitializer = () => {
  const fetchCart = useCartStore((state) => state.fetchCart);
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);
};