"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { addCartApi } from "../api/carts";

const CartContext = createContext(null);
const STORAGE_KEY = "vela_cart_v1";
const DEMO_USER_ID = 1;

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const syncMutation = useMutation({
    mutationFn: (products) => addCartApi(DEMO_USER_ID, products),
  });

  const addItem = useCallback(
    (product, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        let next;
        if (existing) {
          next = prev.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
          );
        } else {
          next = [
            ...prev,
            {
              id: product.id,
              title: product.title,
              price: product.price,
              discountPercentage: product.discountPercentage || 0,
              thumbnail: product.thumbnail,
              brand: product.brand,
              stock: product.stock,
              quantity,
            },
          ];
        }
        syncMutation.mutate(
          next.map((i) => ({ id: i.id, quantity: i.quantity })),
        );
        return next;
      });
      toast.success(`${product.title} تم إضافته للسلة`);
    },
    [syncMutation],
  );

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast("تم حذف المنتج من السلة", { icon: "🗑️" });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = useMemo(
    () =>
      items.reduce((sum, i) => {
        const discounted = i.price * (1 - (i.discountPercentage || 0) / 100);
        return sum + discounted * i.quantity;
      }, 0),
    [items],
  );

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
