"use client";
import { Heart, ShoppingCart } from "lucide-react";
import StarRating from "../ui/StarRating";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product, layout = "grid" }) {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const hasDiscount = product.discountPercentage > 0;
  const finalPrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  if (layout === "list") {
    return (
      <div className="card-soft card-soft-hover flex gap-4 p-4 group">
        <Link
          href={`/productDetails/${product.id}`}
          className="relative w-32 h-32 sm:w-40 sm:h-40 shrink-0 rounded-xl overflow-hidden bg-gray-50"
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            loading="lazy"
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
          {hasDiscount && (
            <span className="absolute top-2 left-2 badge-discount">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </Link>
        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
          <div>
            <p className="text-xs text-primary-600 font-semibold uppercase tracking-wide mb-1">
              {product.brand || product.category}
            </p>
            <Link href={`/productDetails/${product.id}`}>
              <h3 className="font-semibold text-secondary-700 line-clamp-2 hover:text-primary-600 transition-colors">
                {product.title}
              </h3>
            </Link>
            <div className="mt-1.5">
              <StarRating
                rating={product.rating}
                reviewCount={product.reviews?.length}
              />
            </div>
          </div>

          <div className="flex items-end justify-between mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-secondary-700">
                ${finalPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggle(product)}
                className="btn-ghost-icon"
                aria-label="Wishlist"
              >
                <Heart
                  size={18}
                  className={
                    wishlisted ? "text-danger-600" : "text-secondary-500"
                  }
                  fill={wishlisted ? "currentColor" : "none"}
                />
              </button>
              <button
                onClick={() => addItem(product, 1)}
                className="btn-primary px-4! py-2! text-sm"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-soft card-soft-hover group flex flex-col overflow-hidden">
      <Link
        href={`/productDetails/${product.id}`}
        className="relative block aspect-square bg-gray-50 overflow-hidden"
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          fill
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {hasDiscount && (
            <span className="badge-discount">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
          {product.stock < 10 && product.stock > 0 && (
            <span className="badge-accent">Low Stock</span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(product);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-soft hover:scale-110 transition-transform"
          aria-label="Wishlist"
        >
          <Heart
            size={17}
            className={wishlisted ? "text-danger-600" : "text-secondary-500"}
            fill={wishlisted ? "currentColor" : "none"}
          />
        </button>
      </Link>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <p className="text-[11px] text-primary-600 font-semibold uppercase tracking-wide">
          {product.brand || product.category}
        </p>
        <Link href={`/productDetails/${product.id}`}>
          <h3 className="text-sm font-semibold text-secondary-700 line-clamp-2 min-h-10 hover:text-primary-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        <StarRating rating={product.rating} showValue={false} size={13} />
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg font-bold text-secondary-700">
            ${finalPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        <button
          onClick={() => addItem(product, 1)}
          disabled={product.stock === 0}
          className="btn-primary w-full rounded-xl! py-2.5! text-sm mt-1"
        >
          <ShoppingCart size={16} />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
