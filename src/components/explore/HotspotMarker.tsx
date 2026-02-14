'use client';

import { useState } from 'react';
import type { Hotspot } from '@/lib/panoramicData';

interface HotspotMarkerProps {
  hotspot: Hotspot;
  screenX: number;
  screenY: number;
  visible: boolean;
}

const iconMap: Record<string, string> = {
  entrance: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0V15',
  view: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  landmark: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  amenity: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  parking: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7',
};

export default function HotspotMarker({ hotspot, screenX, screenY, visible }: HotspotMarkerProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!visible) return null;

  return (
    <div
      className="hotspot-marker"
      style={{ left: screenX, top: screenY }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(prev => !prev)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      tabIndex={0}
      role="button"
      aria-label={`${hotspot.label}: ${hotspot.description}`}
    >
      <span className="hotspot-marker-dot" />
      <span className="hotspot-marker-ring" />

      {showTooltip && (
        <div className="hotspot-tooltip">
          <div className="flex items-center gap-1.5 mb-1">
            <svg className="w-3 h-3 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconMap[hotspot.icon] || iconMap.landmark} />
            </svg>
            <span className="text-gold font-medium text-xs">{hotspot.label}</span>
          </div>
          <p className="text-text-muted text-xs leading-relaxed" style={{ fontSize: '0.65rem' }}>
            {hotspot.description}
          </p>
        </div>
      )}
    </div>
  );
}
