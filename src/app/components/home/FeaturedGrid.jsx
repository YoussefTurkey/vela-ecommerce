"use client";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../product/ProductCard";
import ProductCardSkeleton from "../product/ProductCardSkeleton";
import SectionHeader from "../ui/SectionHeader";

export default function FeaturedGrid() {
  const { data, isLoading } = useProducts({ limit: 8, skip: 10 });

  return (
    <section className="container-app py-16">
      <SectionHeader
        eyebrow="Handpicked"
        title="Featured Products"
        subtitle="Fresh picks from across every category."
        viewAllTo="/products"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : data?.products?.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
