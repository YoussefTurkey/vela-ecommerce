import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="container-app py-4">
      <div className="relative overflow-hidden rounded-app-lg bg-linear-to-r from-primary-700 via-primary-600 to-primary-500 px-8 py-14 sm:px-16 sm:py-16 text-center">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent-400/20 rounded-full blur-3xl" />
        <div className="relative">
          <span className="inline-block badge-accent rounded-full! px-3 py-1.5 text-xs mb-4">
            Members Only
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight max-w-xl mx-auto leading-tight">
            Get 20% off your first order when you join Vela+
          </h2>
          <p className="text-primary-100 mt-4 max-w-md mx-auto">
            Free shipping, early access to drops, and rewards on every purchase.
          </p>
          <Link
            href="/products"
            className="btn-secondary bg-white! text-primary-700! mt-7 inline-flex px-7! py-3.5!"
          >
            Join Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
