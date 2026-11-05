export default function EmptyCartIllustration() {
  return (
    <svg viewBox="0 0 300 260" className="w-64 h-56 mx-auto">
      <defs>
        <linearGradient id="cartGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <ellipse cx="150" cy="235" rx="90" ry="12" fill="#EFF6FF" />
      <circle cx="150" cy="110" r="95" fill="#EFF6FF" />

      {/* cart body */}
      <g transform="translate(70,80)">
        <path
          d="M10 0 H35 L55 95 H150 L168 30 H50"
          fill="none"
          stroke="url(#cartGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="70" cy="122" r="12" fill="#111827" />
        <circle cx="140" cy="122" r="12" fill="#111827" />
      </g>

      {/* sad face on cart */}
      <circle cx="150" cy="118" r="4" fill="#111827" opacity="0.5" />
      <circle cx="180" cy="118" r="4" fill="#111827" opacity="0.5" />
      <path
        d="M148 138 Q165 128 182 138"
        stroke="#111827"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* floating dots */}
      <circle cx="60" cy="60" r="5" fill="#F59E0B" opacity="0.6" />
      <circle cx="240" cy="80" r="4" fill="#16A34A" opacity="0.6" />
      <circle cx="230" cy="160" r="6" fill="#2563EB" opacity="0.3" />
    </svg>
  );
}
