import StarRating from "../ui/StarRating";
import SectionHeader from "../ui/SectionHeader";
import { Quote } from "lucide-react";
import { REVIEWS } from "../../data/customerReviewsData";

export default function CustomerReviews() {
  return (
    <section className="bg-gray-50/70 py-16">
      <div className="container-app">
        <SectionHeader
          eyebrow="Testimonials"
          title="What Customers Say"
          subtitle="Real feedback from real orders."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <div key={r.name} className="card-soft p-6 flex flex-col gap-4">
              <Quote
                size={28}
                className="text-primary-200"
                fill="currentColor"
                strokeWidth={0}
              />
              <p className="text-secondary-600 text-sm leading-relaxed flex-1">
                &quot;{r.text}&quot;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {r.initials}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-secondary-700 text-sm">
                    {r.name}
                  </p>
                  <p className="text-xs text-gray-400">{r.role}</p>
                </div>
                <StarRating rating={r.rating} showValue={false} size={13} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
