const ShoppingIllustration = () => {
  return (
    <div className="relative mx-auto w-full max-w-md aspect-square">
      <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary-100 to-primary-50 blur-2xl opacity-70" />
      <svg
        viewBox="0 0 400 400"
        className="relative w-full h-full drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="bagGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#111827" />
            <stop offset="100%" stopColor="#1f2937" />
          </linearGradient>
        </defs>

        {/* backdrop blob */}
        <circle cx="200" cy="205" r="150" fill="#EFF6FF" />

        {/* floating card top-right */}
        <g transform="translate(255,60) rotate(12)">
          <rect width="90" height="60" rx="14" fill="url(#cardGrad)" />
          <circle cx="20" cy="20" r="8" fill="#F59E0B" />
          <rect
            x="14"
            y="38"
            width="45"
            height="6"
            rx="3"
            fill="#ffffff"
            opacity="0.4"
          />
        </g>

        {/* main shopping bag */}
        <g transform="translate(120,110)">
          <path
            d="M20 40 L20 25 Q20 0 45 0 L115 0 Q140 0 140 25 L140 40"
            fill="none"
            stroke="url(#bagGrad)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <rect
            x="0"
            y="40"
            width="160"
            height="180"
            rx="20"
            fill="url(#bagGrad)"
          />
          <rect
            x="20"
            y="70"
            width="120"
            height="10"
            rx="5"
            fill="white"
            opacity="0.35"
          />
          <rect
            x="20"
            y="95"
            width="80"
            height="10"
            rx="5"
            fill="white"
            opacity="0.25"
          />
          <circle cx="80" cy="150" r="34" fill="white" opacity="0.15" />
          <path
            d="M65 150 l11 11 22 -24"
            stroke="white"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* floating price tag bottom-left */}
        <g transform="translate(45,260) rotate(-10)">
          <rect width="80" height="50" rx="12" fill="#F59E0B" />
          <text
            x="40"
            y="31"
            textAnchor="middle"
            fontSize="18"
            fontWeight="800"
            fill="white"
            fontFamily="Inter, sans-serif"
          >
            -40%
          </text>
        </g>

        {/* floating star */}
        <g transform="translate(300,220)">
          <circle r="26" fill="#16A34A" />
          <path
            d="M0 -12 L3 -3 L13 -3 L5 3 L8 12 L0 6 L-8 12 L-5 3 L-13 -3 L-3 -3 Z"
            fill="white"
            transform="scale(0.9)"
          />
        </g>

        {/* small dots */}
        <circle cx="90" cy="330" r="6" fill="#2563EB" opacity="0.4" />
        <circle cx="330" cy="320" r="5" fill="#F59E0B" opacity="0.5" />
        <circle cx="60" cy="90" r="4" fill="#16A34A" opacity="0.5" />
      </svg>
    </div>
  );
};

export default ShoppingIllustration;
