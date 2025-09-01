import { getCart } from "@/api/products/getCartApi";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = Product & {
  quantity: number;
  size: string;
};

type Cart = {
  cart: CartItem[];
  fetchCart: () => Promise<void>;
  setCartItems: (items: CartItem[]) => void;
  addToCart: (newItem: Product, size: string) => void;
  increment: (id: number, size: string) => void;
  decrement: (id: number, size: string) => void;
  removeFromCart: (id: number, size: string) => void;
  resetCart: () => void;
};

export const useCartStore = create<Cart>()(
  persist(
    (set) => ({
      cart: [],

      // Fetch cart from API
      fetchCart: async () => {
        try {
          const response = await getCart();
          const { data, headers } = response;
          const nonce = headers["nonce"];
          if (nonce) {
            localStorage.setItem("api_nonce", nonce);
          }
      const updateItems=[] as any
      data?.items.forEach((newItem:any) => {
        const cartIndex = data?.items.findIndex(
          (item:any) => item.id === newItem.id
        );

        if (cartIndex < 0) {
          updateItems.push({
            ...newItem,
            quantity: newItem.quantity ?? 1,
          });
        } else {
          updateItems[cartIndex] = {
            ...updateItems[cartIndex],
            quantity: updateItems[cartIndex].quantity + (newItem.quantity ?? 1),
          };
        }
      });
          set({ cart: updateItems || [] });
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        }
      },


    setCartItems: (items, size = "") =>
    set((state) => {
    
      const updateItems=[] as any
      items.forEach((newItem) => {
        const cartIndex = items.findIndex(
          (item) => item.id === newItem.id && item.size === (newItem.size || size)
        );

        if (cartIndex < 0) {
          updateItems.push({
            ...newItem,
            quantity: newItem.quantity ?? 1,
            size: newItem.size || size,
          });
        } else {
          updateItems[cartIndex] = {
            ...updateItems[cartIndex],
            quantity: updateItems[cartIndex].quantity + (newItem.quantity ?? 1),
          };
        }
      });

      return { cart: updateItems };
    }),

      // Add new item or increment if it exists
      addToCart: (newItem, size) =>
        set((state) => {
          const cartIndex = state.cart.findIndex(
            (item) => item.id === newItem.id && item.size === size
          );

          if (cartIndex < 0) {
            return {
              cart: [...state.cart, { ...newItem, quantity: 1, size }],
            };
          }

          const newCart = state.cart.map((item, index) =>
            index === cartIndex ? { ...item, quantity: item.quantity + 1 } : item
          );

          return { cart: newCart };
        }),

      // Increment item quantity
      increment: (id, size) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      // Decrement or remove if quantity goes below 1
      decrement: (id, size) =>
        set((state) => {
          const cartItem = state.cart.find(
            (item) => item.id === id && item.size === size
          );

          if (cartItem?.quantity && cartItem?.quantity > 1) {
            return {
              cart: state.cart.map((item) =>
                item.id === id && item.size === size
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            };
          }

          return {
            cart: state.cart.filter(
              (item) => !(item.id === id && item.size === size)
            ),
          };
        }),

      // Remove item from cart
      removeFromCart: (id, size) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => !(item.id === id && item.size === size)
          ),
        })),

      // Clear entire cart
      resetCart: () => set({ cart: [] }),
    }),
    { name: "luxe-cart" }
  )
);

/*
Workaround to integrate zustand persist with NextJS SSR
*/
export const useCart = () => {
  const initialCart = useCartStore((state) => state.cart);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setCart(initialCart);
    setIsHydrated(true);
  }, [initialCart]);

  return { cart, isHydrated };
};

export const useTotalQuantity = () => {
  const cart = useCartStore((state) => state.cart);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setTotalQuantity(
      cart.reduce((prev, cur) => prev + cur.quantity, 0)
    );
    setIsHydrated(true);
  }, [cart]);

  return { totalQuantity, isHydrated };
};

export const useTotalPrice = () => {
  const cart = useCartStore((state) => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setTotalPrice(
      cart.reduce(
        (prev, cur) => prev + cur.quantity * (cur?.prices?.price ?? 0),
        0
      )
    );
    setIsHydrated(true);
  }, [cart]);

  return { totalPrice, isHydrated };
};

export const useCartInitializer = () => {
  const fetchCart = useCartStore((state) => state.fetchCart);
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);
};
