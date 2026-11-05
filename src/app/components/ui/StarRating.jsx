import { Star, StarHalf } from "lucide-react";

export default function StarRating({ rating = 0, size = 14, showValue = true, reviewCount }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const totalStars = 5;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center star-rating">
        {Array.from({ length: totalStars }).map((_, i) => {
          if (i < full) {
            return <Star key={i} size={size} fill="currentColor" strokeWidth={0} />;
          }
          if (i === full && hasHalf) {
            return <StarHalf key={i} size={size} fill="currentColor" strokeWidth={0} />;
          }
          return <Star key={i} size={size} className="text-gray-200" fill="currentColor" strokeWidth={0} />;
        })}
      </div>
      {showValue && (
        <span className="text-xs font-medium text-secondary-500">
          {rating.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="text-gray-400 font-normal"> ({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
}
