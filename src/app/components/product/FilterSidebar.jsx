"use client";
import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import StarRating from "../ui/StarRating";

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-5 first:pt-0 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-sm font-bold text-secondary-700"
      >
        {title}
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default function FilterSidebar({
  categories = [],
  activeCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
  brands = [],
  activeBrand,
  onBrandChange,
  inStockOnly,
  onStockChange,
  onClearAll,
  mobileOpen,
  onCloseMobile,
}) {
  const content = (
    <div className="card-soft p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-extrabold text-secondary-700">Filters</h3>
        <button
          onClick={onClearAll}
          className="text-xs font-semibold text-primary-600 hover:underline"
        >
          Clear all
        </button>
      </div>

      <FilterSection title="Categories">
        <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto pr-1">
          <button
            onClick={() => onCategoryChange("all")}
            className={`text-left text-sm px-3 py-2 rounded-app-sm transition-colors ${
              activeCategory === "all"
                ? "bg-primary-50 text-primary-700 font-semibold"
                : "text-secondary-600 hover:bg-gray-50"
            }`}
          >
            All Categories
          </button>
          {categories.map((c) => {
            const slug = typeof c === "string" ? c : c.slug;
            const name = typeof c === "string" ? c : c.name;
            return (
              <button
                key={slug}
                onClick={() => onCategoryChange(slug)}
                className={`text-left text-sm px-3 py-2 rounded-app-sm capitalize transition-colors ${
                  activeCategory === slug
                    ? "bg-primary-50 text-primary-700 font-semibold"
                    : "text-secondary-600 hover:bg-gray-50"
                }`}
              >
                {name?.replace(/-/g, " ")}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="flex flex-col gap-3">
          <input
            type="range"
            min="0"
            max="2000"
            step="10"
            value={priceRange}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="w-full accent-primary-600"
          />
          <div className="flex items-center justify-between text-xs text-secondary-500 font-medium">
            <span>$0</span>
            <span className="text-secondary-700 font-bold">
              Up to ${priceRange}
            </span>
            <span>$2000</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Rating">
        <div className="flex flex-col gap-1.5">
          {[4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => onRatingChange(minRating === r ? 0 : r)}
              className={`flex items-center gap-2 text-left px-3 py-2 rounded-app-sm transition-colors ${
                minRating === r ? "bg-primary-50" : "hover:bg-gray-50"
              }`}
            >
              <StarRating rating={r} showValue={false} size={14} />
              <span className="text-xs text-secondary-500 font-medium">
                & up
              </span>
            </button>
          ))}
        </div>
      </FilterSection>

      {brands.length > 0 && (
        <FilterSection title="Brand" defaultOpen={false}>
          <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
            <button
              onClick={() => onBrandChange("all")}
              className={`text-left text-sm px-3 py-2 rounded-app-sm transition-colors ${
                activeBrand === "all"
                  ? "bg-primary-50 text-primary-700 font-semibold"
                  : "text-secondary-600 hover:bg-gray-50"
              }`}
            >
              All Brands
            </button>
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => onBrandChange(b)}
                className={`text-left text-sm px-3 py-2 rounded-app-sm transition-colors ${
                  activeBrand === b
                    ? "bg-primary-50 text-primary-700 font-semibold"
                    : "text-secondary-600 hover:bg-gray-50"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </FilterSection>
      )}

      <FilterSection title="Availability">
        <label className="flex items-center gap-2.5 text-sm text-secondary-600 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onStockChange(e.target.checked)}
            className="w-4 h-4 rounded accent-primary-600"
          />
          In Stock Only
        </label>
      </FilterSection>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24">{content}</div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onCloseMobile}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-xs bg-white overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-secondary-700">Filters</span>
              <button onClick={onCloseMobile} className="btn-ghost-icon">
                <X size={18} />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
