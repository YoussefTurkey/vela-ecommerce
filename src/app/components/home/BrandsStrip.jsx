"use client";
import { useProducts } from "../../hooks/useProducts";
import SectionHeader from "../ui/SectionHeader";

export default function BrandsStrip() {
  const { data } = useProducts({ limit: 100 });
  const brands = Array.from(
    new Set((data?.products || []).map((p) => p.brand).filter(Boolean)),
  ).slice(0, 12);

  if (!brands.length) return null;

  return (
    <section className="container-app py-16">
      <SectionHeader
        eyebrow="Trusted"
        title="Top Brands"
        subtitle="The names worth shopping."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {brands.map((brand) => (
          <div
            key={brand}
            className="card-soft card-soft-hover flex items-center justify-center h-20 px-4"
          >
            <span className="font-bold text-secondary-600 text-sm tracking-tight text-center truncate">
              {brand}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
