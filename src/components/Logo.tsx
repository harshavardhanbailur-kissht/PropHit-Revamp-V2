'use client';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function Logo({ className = '', variant = 'dark' }: LogoProps) {
  const textColor = variant === 'dark' ? '#ffffff' : '#1a1a1a';
  const goldColor = '#C9A962';

  return (
    <svg
      viewBox="0 0 200 50"
      className={className}
      aria-label="PropHit Logo"
    >
      {/* PR with Rupee Symbol integration */}
      <text
        x="0"
        y="38"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="36"
        fill={textColor}
      >
        P
      </text>

      {/* Rupee Symbol (₹) styled as R */}
      <g transform="translate(22, 8)">
        <path
          d="M4 6h16M4 14h16M10 6v24M4 30l12-16"
          stroke={goldColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* OPHIT text */}
      <text
        x="48"
        y="38"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="36"
        fill={textColor}
      >
        OPHIT
      </text>

      {/* Chevron arrows (growth indicator) */}
      <g transform="translate(158, 5)">
        <path
          d="M0 30 L12 22 L24 30"
          stroke={textColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M0 20 L12 12 L24 20"
          stroke={textColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M0 10 L12 2 L24 10"
          stroke={textColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

// Simplified Logo Icon for smaller sizes
export function LogoIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-label="PropHit"
    >
      {/* Rupee Symbol */}
      <g transform="translate(5, 5)">
        <path
          d="M4 6h22M4 14h22M15 6v24M4 30l18-20"
          stroke="#C9A962"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
