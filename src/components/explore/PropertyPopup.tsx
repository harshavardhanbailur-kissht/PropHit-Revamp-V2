'use client';

import type { Property } from '@/lib/propertyData';
import { formatPrice } from '@/lib/propertyData';

interface PropertyPopupProps {
  property: Property;
}

export default function PropertyPopup({ property }: PropertyPopupProps) {
  return (
    <div className="property-popup-content">
      <div className="property-popup-accent" />
      <h3 className="text-white text-xs font-semibold mb-1 leading-tight heading-luxury">
        {property.title}
      </h3>
      <p className="text-text-muted text-xs mb-2">
        {property.locality}, {property.city}
      </p>
      <div className="flex items-center gap-2">
        <span className="text-gold text-xs font-semibold">
          {formatPrice(property.priceMinInr)} — {formatPrice(property.priceMaxInr)}
        </span>
        <span className="text-success text-xs">+{property.growthPercent}%</span>
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <span className="property-popup-chip">{property.assetType}</span>
        <span className="property-popup-chip">{property.tenureType}</span>
      </div>
    </div>
  );
}
