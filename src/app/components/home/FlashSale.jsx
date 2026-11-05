"use client";
import { Zap, ArrowRight } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../product/ProductCard";
import ProductCardSkeleton from "../product/ProductCardSkeleton";
import CountdownTimer from "../ui/CountdownTimer";
import Link from "next/link";

export default function FlashSale() {
  const { data, isLoading } = useProducts({ limit: 30, skip: 0 });
  const flashProducts = (data?.products || [])
    .filter((p) => p.discountPercentage >= 10)
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 5);

  return (
    <section className="bg-secondary-700 py-16 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-600/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent-500/10 blur-3xl" />
      <div className="container-app relative">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[14px] bg-accent-500 flex items-center justify-center shrink-0">
              <Zap size={22} className="text-white" fill="white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Flash Sale
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Deals this good don&apos;t last. Ends soon.
              </p>
            </div>
          </div>
          <CountdownTimer hours={6} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="[&_.card-soft]:bg-white/5 [&_.skeleton]:opacity-10"
                >
                  <ProductCardSkeleton />
                </div>
              ))
            : flashProducts.map((p) => (
                <div
                  key={p.id}
                  className="[&_.card-soft]:bg-white [&_.card-soft]:border-white/10"
                >
                  <ProductCard product={p} />
                </div>
              ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-white font-semibold text-sm"
          >
            View all deals <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
