"use client";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../product/ProductCard";
import ProductCardSkeleton from "../product/ProductCardSkeleton";
import SectionHeader from "../ui/SectionHeader";

export default function BestSellers() {
  const { data, isLoading } = useProducts({ limit: 30 });
  const bestSellers = [...(data?.products || [])]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <section className="bg-gray-50/70 py-16">
      <div className="container-app">
        <SectionHeader
          eyebrow="Top Rated"
          title="Best Sellers"
          subtitle="Loved by thousands of happy customers."
          viewAllTo="/products?sort=rating"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
