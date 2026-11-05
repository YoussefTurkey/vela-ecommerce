import {
  ArrowRight,
  Grid3x3,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import ShoppingIllustration from "./ShoppingIllustration";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary-50/60 via-white to-white">
      <div className="container-app pt-14 pb-16 md:pt-20 md:pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 badge-accent bg-accent-500/10! text-accent-600! rounded-full! px-3 py-1.5 text-xs">
            ✦ New Season Drop — Up to 40% Off
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-secondary-700 leading-[1.08] tracking-tight">
            Shopping,
            <br />
            <span className="text-primary-600">reimagined</span> for
            <br />
            everyday life.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-secondary-500 max-w-md leading-relaxed">
            Curated tech, fashion, and home essentials — delivered fast, priced
            fair, and backed by a return policy that actually respects your
            time.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="btn-primary px-7! py-3.5! text-base"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link
              href="/products"
              className="btn-outline px-7! py-3.5! text-base"
            >
              <Grid3x3 size={18} /> Explore Categories
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {[
              { icon: Truck, label: "Free Shipping" },
              { icon: ShieldCheck, label: "Secure Payment" },
              { icon: RotateCcw, label: "Easy Returns" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="w-11 h-11 rounded-[14px] bg-white border border-gray-100 shadow-soft flex items-center justify-center text-primary-600">
                  <Icon size={20} />
                </div>
                <span className="text-xs font-medium text-secondary-500">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Illustration */}
        <div className="relative">
          <ShoppingIllustration />
        </div>
      </div>
    </section>
  );
}
