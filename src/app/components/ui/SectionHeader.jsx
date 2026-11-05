import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SectionHeader({ eyebrow, title, subtitle, viewAllTo }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-8">
      <div>
        {eyebrow && (
          <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-2">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary-700 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-secondary-500 mt-1.5 text-sm sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
      {viewAllTo && (
        <Link
          href={viewAllTo}
          className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:gap-2.5 transition-all shrink-0"
        >
          View All <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
