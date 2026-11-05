"use client";
import { useState } from "react";
import { Trash2, ArrowRight, ArrowLeft, Tag, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FLAT,
  TAX_RATE,
} from "../../constants/cartConst";
import Link from "next/link";
import Image from "next/image";
import EmptyCartIllustration from "../../components/ui/EmptyCartIllustration";
import QuantityControl from "../../components/cart/QuantityControl";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const shipping =
    subtotal === 0
      ? 0
      : subtotal >= FREE_SHIPPING_THRESHOLD
        ? 0
        : SHIPPING_FLAT;
  const tax = subtotal * TAX_RATE;
  const couponDiscount = subtotal * appliedDiscount;
  const total = subtotal + shipping + tax - couponDiscount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = coupon.trim().toUpperCase();
    if (code === "VELA10") {
      setAppliedDiscount(0.1);
      toast.success("10% coupon applied!");
    } else if (code === "") {
      toast.error("Enter a coupon code");
    } else {
      toast.error("Invalid coupon code");
      setAppliedDiscount(0);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-app py-24 text-center">
        <EmptyCartIllustration />
        <h1 className="text-2xl font-extrabold text-secondary-700 mt-4">
          Your cart is empty
        </h1>
        <p className="text-secondary-500 mt-2 max-w-sm mx-auto">
          Looks like you haven&apos;t added anything yet. Let&apos;s find
          something you&apos;ll love.
        </p>
        <Link href="/products" className="btn-primary inline-flex mt-7 px-8!">
          Shop Now <ArrowRight size={17} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-app py-8">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary-700 mb-8">
        Shopping Cart{" "}
        <span className="text-secondary-400 font-medium text-lg">
          ({items.length} items)
        </span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => {
            const discounted =
              item.price * (1 - (item.discountPercentage || 0) / 100);
            return (
              <div
                key={item.id}
                className="card-soft p-4 flex gap-4 items-center"
              >
                <Link
                  href={`/products/${item.id}`}
                  className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl bg-gray-50 overflow-hidden"
                >
                  <Image
                    src={item.thumbnail}
                    width={100}
                    height={100}
                    alt={item.title}
                    className="w-full h-full object-contain p-2"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-primary-600 uppercase">
                    {item.brand}
                  </p>
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-semibold text-secondary-700 text-sm sm:text-base line-clamp-1 hover:text-primary-600">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-bold text-secondary-700">
                      ${discounted.toFixed(2)}
                    </span>
                    {item.discountPercentage > 0 && (
                      <span className="text-xs text-gray-400 line-through">
                        ${item.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3 sm:hidden">
                    <QuantityControl
                      item={item}
                      updateQuantity={updateQuantity}
                    />
                    <span className="font-bold text-secondary-700">
                      ${(discounted * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-6 shrink-0">
                  <QuantityControl
                    item={item}
                    updateQuantity={updateQuantity}
                  />
                  <span className="font-bold text-secondary-700 w-20 text-right">
                    ${(discounted * item.quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="sm:hidden btn-ghost-icon text-danger-600 self-start"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}

          <Link href="/products" className="btn-outline self-start mt-2 px-6">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        {/* Order summary */}
        <div className="card-soft p-6 sticky top-24">
          <h2 className="font-extrabold text-secondary-700 text-lg mb-5">
            Order Summary
          </h2>

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-secondary-500">Subtotal</span>
              <span className="font-semibold text-secondary-700">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-500">Shipping</span>
              <span className="font-semibold text-secondary-700">
                {shipping === 0 ? (
                  <span className="text-success-600">Free</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-500">Tax (8%)</span>
              <span className="font-semibold text-secondary-700">
                ${tax.toFixed(2)}
              </span>
            </div>
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-success-600">
                <span>Coupon (VELA10)</span>
                <span className="font-semibold">
                  -${couponDiscount.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          <form onSubmit={handleApplyCoupon} className="flex gap-2 mt-5">
            <div className="relative flex-1">
              <Tag
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code"
                className="input-field pl-9! text-sm"
              />
            </div>
            <button type="submit" className="btn-outline px-4 text-sm shrink-0">
              Apply
            </button>
          </form>
          <p className="text-[11px] text-gray-400 mt-1.5">
            Try &quot;VELA10&quot; for 10% off
          </p>

          <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
            <span className="font-bold text-secondary-700">Total</span>
            <span className="text-2xl font-extrabold text-secondary-700">
              ${total.toFixed(2)}
            </span>
          </div>

          <Link href="/checkout" className="btn-primary w-full mt-5 py-3.5">
            Checkout <ArrowRight size={17} />
          </Link>

          <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-400">
            <ShieldCheck size={14} /> Secure checkout, encrypted end-to-end
          </div>
        </div>
      </div>
    </div>
  );
}
