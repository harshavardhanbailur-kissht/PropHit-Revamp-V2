'use client';

interface PanoramicControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  isAutoRotating: boolean;
}

export default function PanoramicControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onResetView,
  isAutoRotating,
}: PanoramicControlsProps) {
  return (
    <div className="explore-controls-stack">
      {/* Zoom indicator */}
      <div className="explore-zoom-label">{zoom.toFixed(1)}x</div>

      {/* Zoom In */}
      <button
        className="explore-control-btn"
        onClick={onZoomIn}
        aria-label="Zoom in"
        disabled={zoom >= 3.0}
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m6-6H6" />
        </svg>
      </button>

      {/* Zoom Out */}
      <button
        className="explore-control-btn"
        onClick={onZoomOut}
        aria-label="Zoom out"
        disabled={zoom <= 1.0}
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 12H6" />
        </svg>
      </button>

      {/* Reset */}
      <button
        className="explore-control-btn"
        onClick={onResetView}
        aria-label="Reset view"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      {/* Auto-rotate indicator */}
      {isAutoRotating && (
        <div className="explore-auto-rotate-badge">
          <svg className="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      )}
    </div>
  );
}
