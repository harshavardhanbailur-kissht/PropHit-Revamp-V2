'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Property } from '@/lib/propertyData';
import { formatPrice } from '@/lib/propertyData';
import type { POIData } from '@/lib/poiData';
import MapControls from './MapControls';

interface MapViewProps {
  property: Property;
  pois: POIData[];
  isActive: boolean;
}

// Custom gold property marker
const propertyIcon = L.divIcon({
  className: 'map-marker-property',
  html: `
    <div class="map-marker-pin">
      <svg width="36" height="44" viewBox="0 0 36 44">
        <defs>
          <linearGradient id="markerGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#E8D5A0"/>
            <stop offset="100%" stop-color="#C9A962"/>
          </linearGradient>
          <filter id="markerGlow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#C9A962" flood-opacity="0.4"/>
          </filter>
        </defs>
        <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 26 18 26s18-12.5 18-26C36 8.06 27.94 0 18 0z"
              fill="url(#markerGold)" filter="url(#markerGlow)"/>
        <circle cx="18" cy="16" r="7" fill="#0a0a0a" stroke="#E8D5A0" stroke-width="1.5"/>
        <path d="M14 16l2.5 2.5 5-5" stroke="#C9A962" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="map-marker-glow"></div>
  `,
  iconSize: [36, 44],
  iconAnchor: [18, 44],
  popupAnchor: [0, -46],
});

// POI category colors and icons
const poiCategoryConfig: Record<string, { color: string; symbol: string }> = {
  metro: { color: '#60A5FA', symbol: 'M' },
  school: { color: '#34D399', symbol: 'S' },
  hospital: { color: '#F87171', symbol: 'H' },
  mall: { color: '#C084FC', symbol: 'R' },
  highway: { color: '#FBBF24', symbol: '=' },
  airport: { color: '#38BDF8', symbol: 'A' },
  park: { color: '#4ADE80', symbol: 'P' },
};

function createPoiIcon(category: string) {
  const config = poiCategoryConfig[category] || { color: '#C9A962', symbol: '?' };
  return L.divIcon({
    className: 'map-marker-poi',
    html: `
      <div class="map-marker-poi-dot" style="background: ${config.color}; border-color: ${config.color}40;">
        <span class="map-marker-poi-label">${config.symbol}</span>
      </div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -14],
  });
}

// Map controller component for imperative actions
function MapController({ property, isActive }: { property: Property; isActive: boolean }) {
  const map = useMap();
  const hasFlewRef = useRef(false);

  useEffect(() => {
    if (isActive && !hasFlewRef.current) {
      setTimeout(() => {
        map.flyTo([property.siteLat, property.siteLng], 15, {
          duration: 1.5,
        });
      }, 200);
      hasFlewRef.current = true;
    }
  }, [isActive, map, property.siteLat, property.siteLng]);

  return null;
}

export default function MapView({ property, pois, isActive }: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const handleZoomIn = useCallback(() => {
    mapRef.current?.zoomIn(1, { animate: true });
  }, []);

  const handleZoomOut = useCallback(() => {
    mapRef.current?.zoomOut(1, { animate: true });
  }, []);

  const handleRecenter = useCallback(() => {
    mapRef.current?.flyTo([property.siteLat, property.siteLng], 15, { duration: 1 });
  }, [property.siteLat, property.siteLng]);

  return (
    <div className="map-view-container">
      <MapContainer
        center={[property.siteLat, property.siteLng]}
        zoom={13}
        zoomControl={false}
        attributionControl={true}
        className="map-leaflet-container"
        ref={(ref) => {
          if (ref) {
            mapRef.current = ref;
            setMapReady(true);
          }
        }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />

        <MapController property={property} isActive={isActive} />

        {/* Property marker */}
        <Marker
          position={[property.siteLat, property.siteLng]}
          icon={propertyIcon}
        >
          <Popup>
            <div className="property-popup-content">
              <div className="property-popup-accent" />
              <h3 className="text-white text-xs font-semibold mb-1 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                {property.title}
              </h3>
              <p className="text-text-muted text-xs mb-2">
                {property.locality}, {property.city}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-gold text-xs font-semibold">
                  {formatPrice(property.priceMinInr)} — {formatPrice(property.priceMaxInr)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="property-popup-chip">{property.assetType}</span>
                <span className="property-popup-chip">{property.tenureType}</span>
              </div>
            </div>
          </Popup>
        </Marker>

        {/* POI markers */}
        {pois.map((poi) => (
          <Marker
            key={poi.id}
            position={[poi.lat, poi.lng]}
            icon={createPoiIcon(poi.category)}
          >
            <Popup>
              <div className="poi-popup-content">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: poiCategoryConfig[poi.category]?.color || '#C9A962' }}
                  />
                  <span className="text-white text-xs font-medium">{poi.name}</span>
                </div>
                <p className="text-text-muted text-xs">
                  {poi.category.charAt(0).toUpperCase() + poi.category.slice(1)} &middot; {poi.distance}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Custom controls */}
      {mapReady && (
        <MapControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onRecenter={handleRecenter}
        />
      )}

      {/* Map vignette for premium feel */}
      <div className="map-vignette" />
    </div>
  );
}
