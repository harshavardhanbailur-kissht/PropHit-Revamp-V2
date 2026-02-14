'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { Property } from '@/lib/propertyData';
import type { PanoramicScene } from '@/lib/panoramicData';
import type { POIData } from '@/lib/poiData';
import ModeSwitcher from './ModeSwitcher';
import PanoramicViewer from './PanoramicViewer';

// Dynamic import MapView to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-bg-primary">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        <span className="text-text-muted text-xs">Loading map...</span>
      </div>
    </div>
  ),
});

interface ExploreViewProps {
  property: Property;
  scene: PanoramicScene;
  pois: POIData[];
  initialMode: '360' | 'map';
}

export default function ExploreView({ property, scene, pois, initialMode }: ExploreViewProps) {
  const [activeMode, setActiveMode] = useState<'360' | 'map'>(initialMode);
  const [announcement, setAnnouncement] = useState('');

  const handleModeChange = (mode: '360' | 'map') => {
    setActiveMode(mode);
    setAnnouncement(mode === '360' ? 'Switched to 360 degree view' : 'Switched to map view');
  };

  return (
    <div className="explore-container">
      {/* Mode switcher */}
      <ModeSwitcher activeMode={activeMode} onChange={handleModeChange} />

      {/* 360° layer */}
      <div
        id="panel-360"
        role="tabpanel"
        aria-labelledby="tab-360"
        className={`explore-layer ${activeMode === '360' ? 'explore-layer--active' : 'explore-layer--inactive'}`}
      >
        <PanoramicViewer scene={scene} isActive={activeMode === '360'} />
      </div>

      {/* Map layer */}
      <div
        id="panel-map"
        role="tabpanel"
        aria-labelledby="tab-map"
        className={`explore-layer ${activeMode === 'map' ? 'explore-layer--active' : 'explore-layer--inactive'}`}
      >
        <MapView property={property} pois={pois} isActive={activeMode === 'map'} />
      </div>

      {/* Property info overlay (bottom-left) */}
      <div className="explore-property-info">
        <h2 className="text-white text-sm font-semibold heading-luxury leading-tight">
          {property.title}
        </h2>
        <p className="text-text-muted text-xs mt-0.5">
          {property.locality}, {property.city}
        </p>
      </div>

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </div>
  );
}
