'use client';

interface CompassRoseProps {
  bearing: number;
}

export default function CompassRose({ bearing }: CompassRoseProps) {
  return (
    <div className="compass-rose">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className="compass-needle"
        style={{ transform: `rotate(${-bearing}deg)` }}
      >
        {/* Outer ring */}
        <circle cx="16" cy="16" r="14" fill="none" stroke="rgba(201,169,98,0.2)" strokeWidth="0.5" />

        {/* Cardinal ticks */}
        <line x1="16" y1="3" x2="16" y2="6" stroke="rgba(201,169,98,0.5)" strokeWidth="1" />
        <line x1="16" y1="26" x2="16" y2="29" stroke="rgba(201,169,98,0.2)" strokeWidth="0.5" />
        <line x1="3" y1="16" x2="6" y2="16" stroke="rgba(201,169,98,0.2)" strokeWidth="0.5" />
        <line x1="26" y1="16" x2="29" y2="16" stroke="rgba(201,169,98,0.2)" strokeWidth="0.5" />

        {/* North needle (gold) */}
        <polygon
          points="16,4 13.5,16 18.5,16"
          fill="url(#goldNeedle)"
          opacity="0.9"
        />
        {/* South needle (dark) */}
        <polygon
          points="16,28 13.5,16 18.5,16"
          fill="rgba(201,169,98,0.15)"
        />

        {/* Center dot */}
        <circle cx="16" cy="16" r="2" fill="#C9A962" opacity="0.8" />

        {/* N label */}
        <text
          x="16"
          y="2.5"
          textAnchor="middle"
          fill="#C9A962"
          fontSize="4"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          N
        </text>

        <defs>
          <linearGradient id="goldNeedle" x1="16" y1="4" x2="16" y2="16" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E8D5A0" />
            <stop offset="100%" stopColor="#C9A962" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
