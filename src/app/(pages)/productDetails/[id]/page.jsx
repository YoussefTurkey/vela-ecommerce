"use client";
import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Zap,
} from "lucide-react";
import { useProduct, useProductsByCategory } from "../../../hooks/useProducts";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import StarRating from "../../../components/ui/StarRating";
import ProductCard from "../../../components/product/ProductCard";
import { TABS } from "../../../data/productDetailsData";
import { useParams } from "next/navigation";
import Link from "next/link";
import BreadCrumb from "../../../components/ui/BreadCrumb";
import ProductSkeleton from "../../../components/ui/ProductSkeleton";
import Image from "next/image";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const { data: relatedData } = useProductsByCategory(product?.category, 5);

  if (isLoading || !product) {
    return <ProductSkeleton />;
  }

  const hasDiscount = product.discountPercentage > 0;
  const finalPrice = product.price * (1 - product.discountPercentage / 100);
  const wishlisted = isWishlisted(product.id);
  const images = product.images?.length ? product.images : [product.thumbnail];
  const related = (relatedData?.products || [])
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container-app py-8">
      {/* Breadcrumb */}
      <BreadCrumb product={product} />

      <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
        {/* Gallery */}
        <div>
          <div className="card-soft aspect-square overflow-hidden relative mb-4">
            {hasDiscount && (
              <span className="absolute top-4 left-4 badge-discount z-10">
                -{Math.round(product.discountPercentage)}%
              </span>
            )}
            <Image
              width={1000}
              height={1000}
              src={images[activeImage]}
              alt={product.title}
              className="w-full h-full object-contain p-8"
            />
          </div>
          <div className="grid grid-cols-5 gap-3">
            {images.slice(0, 5).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`aspect-square rounded-xl overflow-hidden border-2 bg-gray-50 transition-colors ${
                  activeImage === i
                    ? "border-primary-600"
                    : "border-transparent hover:border-gray-200"
                }`}
              >
                <Image
                  width={100}
                  height={100}
                  src={img}
                  alt="photo"
                  className="w-full h-full object-contain p-1.5"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs font-bold text-primary-600 uppercase tracking-wide">
            {product.brand}
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary-700 mt-2 leading-snug">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mt-3">
            <StarRating rating={product.rating} showValue />
            <span className="text-sm text-secondary-500">
              {product.reviews?.length || 0} reviews
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-5">
            <span className="text-3xl font-extrabold text-secondary-700">
              ${finalPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-lg text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
            {hasDiscount && (
              <span className="badge-accent flex items-center gap-1">
                <Zap size={11} fill="currentColor" /> Save{" "}
                {Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-4">
            {product.stock > 0 ? (
              <span className="flex items-center gap-1.5 text-success-600 text-sm font-semibold">
                <CheckCircle2 size={16} /> In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-danger-600 text-sm font-semibold">
                <XCircle size={16} /> Out of Stock
              </span>
            )}
          </div>

          <p className="text-secondary-500 text-sm leading-relaxed mt-5 max-w-lg">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6 max-w-sm text-sm">
            <div>
              <span className="text-gray-400">Brand</span>
              <p className="font-semibold text-secondary-700">
                {product.brand || "—"}
              </p>
            </div>
            <div>
              <span className="text-gray-400">Category</span>
              <p className="font-semibold text-secondary-700 capitalize">
                {product.category?.replace(/-/g, " ")}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-7">
            <div className="flex items-center border border-gray-200 rounded-full">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-11 h-11 flex items-center justify-center text-secondary-600 hover:text-primary-600"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-bold text-secondary-700">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                className="w-11 h-11 flex items-center justify-center text-secondary-600 hover:text-primary-600"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={() => toggle(product)}
              className="btn-ghost-icon w-12! h-12!"
              aria-label="Wishlist"
            >
              <Heart
                size={20}
                className={
                  wishlisted ? "text-danger-600" : "text-secondary-500"
                }
                fill={wishlisted ? "currentColor" : "none"}
              />
            </button>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => addItem(product, quantity)}
              disabled={product.stock === 0}
              className="btn-outline flex-1 py-3.5!"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <Link
              href="/checkout"
              onClick={() => addItem(product, quantity)}
              className="btn-primary flex-1 py-3.5!"
            >
              Buy Now
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-gray-100">
            {[
              { icon: Truck, label: "Free Shipping", sub: "On orders $50+" },
              {
                icon: ShieldCheck,
                label: "Secure Payment",
                sub: "100% protected",
              },
              { icon: RotateCcw, label: "Easy Returns", sub: "30 day policy" },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-1.5"
              >
                <Icon size={20} className="text-primary-600" />
                <span className="text-xs font-semibold text-secondary-700">
                  {label}
                </span>
                <span className="text-[11px] text-gray-400">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex items-center gap-2 border-b border-gray-100">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                activeTab === tab
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-secondary-500 hover:text-secondary-700"
              }`}
            >
              {tab}
              {tab === "Reviews" && ` (${product.reviews?.length || 0})`}
            </button>
          ))}
        </div>

        <div className="py-8 max-w-3xl">
          {activeTab === "Description" && (
            <p className="text-secondary-600 leading-relaxed">
              {product.description}
            </p>
          )}

          {activeTab === "Specifications" && (
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {[
                ["Brand", product.brand],
                ["Category", product.category?.replace(/-/g, " ")],
                ["SKU", product.sku],
                ["Weight", product.weight ? `${product.weight}g` : "—"],
                [
                  "Dimensions",
                  product.dimensions
                    ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`
                    : "—",
                ],
                ["Warranty", product.warrantyInformation || "—"],
                ["Shipping", product.shippingInformation || "—"],
                ["Return Policy", product.returnPolicy || "—"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between border-b border-gray-100 py-2.5"
                >
                  <span className="text-secondary-500 capitalize">{label}</span>
                  <span className="font-semibold text-secondary-700 capitalize">
                    {value || "—"}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="flex flex-col gap-5">
              {product.reviews?.length ? (
                product.reviews.map((r, i) => (
                  <div key={i} className="card-soft p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-secondary-700 text-sm">
                        {r.reviewerName}
                      </span>
                      <StarRating
                        rating={r.rating}
                        showValue={false}
                        size={13}
                      />
                    </div>
                    <p className="text-secondary-600 text-sm leading-relaxed">
                      {r.comment}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(r.date).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-secondary-500 text-sm">No reviews yet.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-extrabold text-secondary-700 mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
