"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  CreditCard,
  Truck,
  Tag,
  ShieldCheck,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import { DELIVERY_METHODS, PAYMENT_METHODS } from "../../data/checkoutData";
import SectionCheckout from "../../components/ui/SectionCheckout";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useRouter();
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [billingSame, setBillingSame] = useState(true);
  const [placing, setPlacing] = useState(false);

  const deliveryFee =
    DELIVERY_METHODS.find((d) => d.id === delivery)?.price || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      clearCart();
      toast.success("Order placed successfully! 🎉");
      navigate.push("/ordersHistory");
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="container-app py-24 text-center">
        <h1 className="text-2xl font-extrabold text-secondary-700">
          Nothing to checkout
        </h1>
        <p className="text-secondary-500 mt-2">
          Your cart is empty. Add products before checking out.
        </p>
        <Link href="/products" className="btn-primary inline-flex mt-6 px-8!">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container-app py-8">
      <Link
        href="/cart"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary-500 hover:text-primary-600 mb-4"
      >
        <ChevronLeft size={16} /> Back to Cart
      </Link>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary-700 mb-8">
        Checkout
      </h1>

      <form
        onSubmit={handlePlaceOrder}
        className="grid lg:grid-cols-3 gap-8 items-start"
      >
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Shipping Address */}
          <SectionCheckout icon={MapPin} title="Shipping Address" step={1}>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="Full Name" className="input-field" />
              <input
                required
                type="tel"
                placeholder="Phone Number"
                className="input-field"
              />
              <input
                required
                placeholder="Street Address"
                className="input-field sm:col-span-2"
              />
              <input required placeholder="City" className="input-field" />
              <input
                required
                placeholder="Postal Code"
                className="input-field"
              />
              <select
                required
                className="input-field sm:col-span-2"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Country
                </option>
                <option>Egypt</option>
                <option>United Arab Emirates</option>
                <option>Saudi Arabia</option>
                <option>United States</option>
              </select>
            </div>
          </SectionCheckout>

          {/* Billing Details */}
          <SectionCheckout icon={MapPin} title="Billing Details" step={2}>
            <label className="flex items-center gap-2.5 text-sm text-secondary-600 cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={billingSame}
                onChange={(e) => setBillingSame(e.target.checked)}
                className="w-4 h-4 rounded accent-primary-600"
              />
              Same as shipping address
            </label>
            {!billingSame && (
              <div className="grid sm:grid-cols-2 gap-4">
                <input placeholder="Full Name" className="input-field" />
                <input placeholder="Phone Number" className="input-field" />
                <input
                  placeholder="Street Address"
                  className="input-field sm:col-span-2"
                />
                <input placeholder="City" className="input-field" />
                <input placeholder="Postal Code" className="input-field" />
              </div>
            )}
          </SectionCheckout>

          {/* Delivery Method */}
          <SectionCheckout icon={Truck} title="Delivery Method" step={3}>
            <div className="flex flex-col gap-3">
              {DELIVERY_METHODS.map((d) => (
                <label
                  key={d.id}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    delivery === d.id
                      ? "border-primary-600 bg-primary-50/50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={delivery === d.id}
                    onChange={() => setDelivery(d.id)}
                    className="w-4 h-4 accent-primary-600"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-secondary-700 text-sm">
                      {d.label}
                    </p>
                    <p className="text-xs text-secondary-500">{d.sub}</p>
                  </div>
                  <span className="font-bold text-secondary-700 text-sm">
                    {d.price === 0 ? "Free" : `$${d.price.toFixed(2)}`}
                  </span>
                </label>
              ))}
            </div>
          </SectionCheckout>

          {/* Payment Method */}
          <SectionCheckout icon={CreditCard} title="Payment Method" step={4}>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                <button
                  type="button"
                  key={id}
                  onClick={() => setPayment(id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-colors ${
                    payment === id
                      ? "border-primary-600 bg-primary-50/50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Icon
                    size={20}
                    className={
                      payment === id ? "text-primary-600" : "text-secondary-400"
                    }
                  />
                  <span className="text-xs font-semibold text-secondary-700">
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {payment === "card" && (
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Card Number"
                  maxLength={19}
                  className="input-field sm:col-span-2"
                />
                <input
                  required
                  placeholder="Name on Card"
                  className="input-field sm:col-span-2"
                />
                <input required placeholder="MM / YY" className="input-field" />
                <input
                  required
                  placeholder="CVV"
                  maxLength={4}
                  className="input-field"
                />
              </div>
            )}
            {payment === "wallet" && (
              <p className="text-sm text-secondary-500">
                You&apos;ll be redirected to your wallet provider to complete
                payment after placing the order.
              </p>
            )}
            {payment === "cod" && (
              <p className="text-sm text-secondary-500">
                Pay with cash upon delivery. A small handling fee may apply in
                select areas.
              </p>
            )}
          </SectionCheckout>
        </div>

        {/* Order Summary */}
        <div className="card-soft p-6 sticky top-24">
          <h2 className="font-extrabold text-secondary-700 text-lg mb-5">
            Order Summary
          </h2>

          <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1 mb-5">
            {items.map((item) => {
              const discounted =
                item.price * (1 - (item.discountPercentage || 0) / 100);
              return (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="relative w-14 h-14 rounded-app-sm bg-gray-50 shrink-0 overflow-hidden">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="w-full h-full object-contain p-1.5"
                    />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-secondary-700 text-white text-[10px] font-bold flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <p className="flex-1 text-xs font-semibold text-secondary-700 line-clamp-2">
                    {item.title}
                  </p>
                  <span className="text-sm font-bold text-secondary-700 shrink-0">
                    ${(discounted * item.quantity).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 mb-5">
            <div className="relative flex-1">
              <Tag
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                placeholder="Promo code"
                className="input-field pl-9! text-sm"
              />
            </div>
            <button
              type="button"
              className="btn-outline px-4! text-sm shrink-0"
            >
              Apply
            </button>
          </div>

          <div className="flex flex-col gap-2.5 text-sm border-t border-gray-100 pt-4">
            <div className="flex justify-between">
              <span className="text-secondary-500">Subtotal</span>
              <span className="font-semibold text-secondary-700">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-500">Shipping</span>
              <span className="font-semibold text-secondary-700">
                {deliveryFee === 0 ? (
                  <span className="text-success-600">Free</span>
                ) : (
                  `$${deliveryFee.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-500">Tax (8%)</span>
              <span className="font-semibold text-secondary-700">
                ${tax.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 mt-3 border-t border-gray-100">
            <span className="font-bold text-secondary-700">Grand Total</span>
            <span className="text-2xl font-extrabold text-secondary-700">
              ${total.toFixed(2)}
            </span>
          </div>

          <button
            type="submit"
            disabled={placing}
            className="btn-primary w-full mt-5 py-3.5!"
          >
            {placing ? (
              "Placing Order..."
            ) : (
              <>
                <CheckCircle2 size={18} /> Place Order
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-400">
            <ShieldCheck size={14} /> Your payment info is encrypted and secure
          </div>
        </div>
      </form>
    </div>
  );
}
