"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  PackageSearch,
} from "lucide-react";
import { useProducts, useCategories } from "../../hooks/useProducts";
import FilterSidebar from "../../components/product/FilterSidebar";
import ProductCard from "../../components/product/ProductCard";
import ProductCardSkeleton from "../../components/product/ProductCardSkeleton";
import Pagination from "../../components/ui/Pagination";
import { useSearchParams } from "next/navigation";
import { PAGE_SIZE, SORT_OPTIONS } from "../../data/productListingData";

export default function ProductsListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams?.get("q") || "";
  const urlCategory = searchParams?.get("category") || "all";

  const [search, setSearch] = useState(urlQuery);
  const [category, setCategory] = useState(urlCategory);
  const [priceRange, setPriceRange] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [brand, setBrand] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState(searchParams?.get("sort") || "default");
  const [page, setPage] = useState(1);
  const [view, setView] = useState("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setSearch(urlQuery);
    setCategory(urlCategory);
  }, [urlQuery, urlCategory]);

  useEffect(
    () => setPage(1),
    [search, category, priceRange, minRating, brand, inStockOnly, sort],
  );

  const { data: categories } = useCategories();
  const { data, isLoading, isFetching } = useProducts({
    limit: 100,
    q: search || undefined,
    category: category !== "all" ? category : undefined,
  });

  const allProducts = data?.products || [];

  const brands = useMemo(
    () =>
      Array.from(
        new Set(allProducts.map((p) => p.brand).filter(Boolean)),
      ).sort(),
    [allProducts],
  );

  const filtered = useMemo(() => {
    let list = allProducts.filter((p) => {
      const finalPrice = p.price * (1 - (p.discountPercentage || 0) / 100);
      if (finalPrice > priceRange) return false;
      if (minRating && p.rating < minRating) return false;
      if (brand !== "all" && p.brand !== brand) return false;
      if (inStockOnly && p.stock <= 0) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort(
          (a, b) =>
            a.price * (1 - a.discountPercentage / 100) -
            b.price * (1 - b.discountPercentage / 100),
        );
        break;
      case "price-desc":
        list = [...list].sort(
          (a, b) =>
            b.price * (1 - b.discountPercentage / 100) -
            a.price * (1 - a.discountPercentage / 100),
        );
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        list = [...list].sort(
          (a, b) => b.discountPercentage - a.discountPercentage,
        );
        break;
      default:
        break;
    }
    return list;
  }, [allProducts, priceRange, minRating, brand, inStockOnly, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (search) params.q = search;
    if (category !== "all") params.category = category;
    setSearchParams(params);
  };

  const clearAll = () => {
    setPriceRange(2000);
    setMinRating(0);
    setBrand("all");
    setInStockOnly(false);
    setCategory("all");
    setSort("default");
  };

  return (
    <div className="container-app py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary-700 tracking-tight">
          {search
            ? `Results for "${search}"`
            : category !== "all"
              ? category.replace(/-/g, " ")
              : "All Products"}
        </h1>
        <p className="text-secondary-500 text-sm mt-1 capitalize">
          Discover quality products at honest prices.
        </p>
      </div>

      <div className="flex gap-8">
        <FilterSidebar
          categories={categories || []}
          activeCategory={category}
          onCategoryChange={(c) => {
            setCategory(c);
            setSearchParams(c !== "all" ? { category: c } : {});
          }}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          minRating={minRating}
          onRatingChange={setMinRating}
          brands={brands}
          activeBrand={brand}
          onBrandChange={setBrand}
          inStockOnly={inStockOnly}
          onStockChange={setInStockOnly}
          onClearAll={clearAll}
          mobileOpen={filtersOpen}
          onCloseMobile={() => setFiltersOpen(false)}
        />

        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="card-soft p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="input-field pl-10! bg-gray-50 border-transparent focus:bg-white"
              />
            </form>

            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden btn-outline py-2.5! shrink-0"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field sm:w-52 shrink-0 cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <div className="hidden sm:flex items-center gap-1 bg-gray-50 rounded-full p-1 shrink-0">
              <button
                onClick={() => setView("grid")}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  view === "grid"
                    ? "bg-white shadow-soft text-primary-600"
                    : "text-gray-400"
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  view === "list"
                    ? "bg-white shadow-soft text-primary-600"
                    : "text-gray-400"
                }`}
                aria-label="List view"
              >
                <List size={16} />
              </button>
            </div>
          </div>

          <p className="text-sm text-secondary-500 mb-4">
            {isLoading
              ? "Loading..."
              : `${filtered.length} product${filtered.length !== 1 ? "s" : ""} found`}
          </p>

          {isLoading ? (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5"
                  : "flex flex-col gap-4"
              }
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <PackageSearch size={56} className="text-gray-200" />
              <h3 className="text-lg font-bold text-secondary-700 mt-4">
                No products found
              </h3>
              <p className="text-secondary-500 text-sm mt-1 max-w-xs">
                Try adjusting your filters or search for something else.
              </p>
              <button onClick={clearAll} className="btn-primary mt-5 px-6!">
                Clear Filters
              </button>
            </div>
          ) : (
            <div
              className={`transition-opacity ${isFetching ? "opacity-60" : "opacity-100"} ${
                view === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5"
                  : "flex flex-col gap-4"
              }`}
            >
              {paged.map((p) => (
                <ProductCard key={p.id} product={p} layout={view} />
              ))}
            </div>
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
