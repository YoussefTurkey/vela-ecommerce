"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext(null);
const STORAGE_KEY = "vela_wishlist_v1";

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(readStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const toggle = useCallback((product) => {
    setIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        toast("تم الحذف من المفضلة", { icon: "💔" });
        return prev.filter((id) => id !== product.id);
      }
      toast.success("تم الإضافة للمفضلة");
      return [...prev, product.id];
    });
  }, []);

  const isWishlisted = useCallback((id) => ids.includes(id), [ids]);

  return (
    <WishlistContext.Provider value={{ ids, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
