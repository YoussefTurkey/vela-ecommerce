"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { Toaster } from "react-hot-toast";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const ProvidersLayout = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <WishlistProvider>
          <div className="flex flex-col">
            <Header />
            <main className="flex items-center justify-center min-h-screen">
              {children}
            </main>
            <Footer />
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  borderRadius: "12px",
                  background: "#111827",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 500,
                },
              }}
            />
          </div>
        </WishlistProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default ProvidersLayout;
