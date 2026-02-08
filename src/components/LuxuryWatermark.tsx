/**
 * Luxury Watermark - Abstract building silhouette
 * Creates a subtle premium real estate atmosphere
 */
export function LuxuryWatermark() {
  return (
    <div className="luxury-watermark" aria-hidden="true">
      <svg
        viewBox="0 0 300 300"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tall central tower */}
        <rect x="120" y="40" width="60" height="260" />

        {/* Left building cluster */}
        <rect x="30" y="120" width="40" height="180" />
        <rect x="75" y="90" width="35" height="210" />

        {/* Right building cluster */}
        <rect x="190" y="100" width="45" height="200" />
        <rect x="245" y="150" width="35" height="150" />

        {/* Accent spire on central tower */}
        <polygon points="150,10 145,40 155,40" />

        {/* Window patterns (subtle lines) */}
        <rect x="125" y="50" width="20" height="3" opacity="0.3" />
        <rect x="155" y="50" width="20" height="3" opacity="0.3" />
        <rect x="125" y="70" width="20" height="3" opacity="0.3" />
        <rect x="155" y="70" width="20" height="3" opacity="0.3" />
        <rect x="125" y="90" width="20" height="3" opacity="0.3" />
        <rect x="155" y="90" width="20" height="3" opacity="0.3" />
      </svg>
    </div>
  );
}
