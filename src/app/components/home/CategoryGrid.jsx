"use client";
import { useCategories } from "../../hooks/useProducts";
import SectionHeader from "../ui/SectionHeader";
import Link from "next/link";
import { getIcon } from "../../utils/getIcon";
import { label } from "../../utils/label";

export default function CategoryGrid() {
  const { data: categories, isLoading } = useCategories();
  const display = (categories || []).slice(0, 12);

  return (
    <section className="container-app py-16">
      <SectionHeader
        eyebrow="Browse"
        title="Featured Categories"
        subtitle="Everything you need, neatly sorted."
        viewAllTo="/products"
      />
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="skeleton rounded-app h-28" />
            ))
          : display.map((cat) => {
              const slug = typeof cat === "string" ? cat : cat.slug;
              const Icon = getIcon(slug);
              return (
                <Link
                  key={slug}
                  href={`/products?category=${slug}`}
                  className="card-soft card-soft-hover flex flex-col items-center justify-center gap-3 py-6 px-2 text-center"
                >
                  <div className="w-12 h-12 rounded-[14px] bg-primary-50 text-primary-600 flex items-center justify-center">
                    <Icon size={22} />
                  </div>
                  <span className="text-xs font-semibold text-secondary-600 line-clamp-1">
                    {label(slug)}
                  </span>
                </Link>
              );
            })}
      </div>
    </section>
  );
}
