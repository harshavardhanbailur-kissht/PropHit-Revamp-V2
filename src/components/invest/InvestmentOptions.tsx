'use client';

import Image from 'next/image';
import { type Property, formatPrice } from '@/lib/propertyData';

interface InvestmentOptionsProps {
  property: Property;
  displayName: string;
  onSelectSingle: () => void;
  onSelectEarnest: () => void;
}

export function InvestmentOptions({
  property,
  displayName,
  onSelectSingle,
  onSelectEarnest,
}: InvestmentOptionsProps) {
  return (
    <div className="kyc-stage-enter">
      {/* Property Summary */}
      <div className="invest-hero-compact">
        <Image
          src={property.image}
          alt={property.title}
          width={80}
          height={60}
          className="invest-hero-thumb"
        />
        <div className="invest-hero-info">
          <h2>{property.title}</h2>
          <p>{property.locality}, {property.city}</p>
          <p className="invest-hero-price">{formatPrice(property.priceMinInr)}</p>
        </div>
      </div>

      {/* Section Heading */}
      <div className="text-center mb-6">
        <p className="label-luxury mb-2">Choose Your Path</p>
        <h2 className="text-white text-xl heading-luxury">
          How would you like to invest, {displayName}?
        </h2>
      </div>

      {/* Option Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Option A: Complete Purchase */}
        <div
          className="invest-option-card invest-option-primary"
          onClick={onSelectSingle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onSelectSingle(); }}
        >
          <div className="invest-option-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h3>Complete Purchase</h3>
          <p className="invest-option-subtitle">Single UPI Transaction</p>
          <p className="invest-option-desc">
            Pay the full investment amount via UPI and secure your fractional stake instantly.
          </p>
          <p className="invest-option-price">{formatPrice(property.priceMinInr)}</p>
          <button
            className="btn-primary w-full"
            onClick={(e) => { e.stopPropagation(); onSelectSingle(); }}
          >
            Pay in Full
          </button>
        </div>

        {/* Option B: Reserve with Earnest */}
        <div
          className="invest-option-card"
          onClick={onSelectEarnest}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onSelectEarnest(); }}
        >
          <div className="invest-option-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="invest-option-badge">Flexible Payments</div>
          <h3>Reserve with Earnest</h3>
          <p className="invest-option-subtitle">UPI Mandate / Recurring</p>
          <p className="invest-option-desc">
            For amounts exceeding single transaction limits. Set up a scheduled payment plan to secure your allocation.
          </p>
          <p className="invest-option-price">
            From {formatPrice(Math.round(property.priceMinInr * 0.1))}
          </p>
          <button
            className="w-full py-3 px-4 rounded-xl border border-border-gold
                       bg-transparent text-gold text-sm font-medium
                       flex items-center justify-center gap-2
                       transition-all duration-300 ease-luxury
                       hover:bg-gold/5 hover:border-gold hover:shadow-gold-glow"
            onClick={(e) => { e.stopPropagation(); onSelectEarnest(); }}
          >
            Set Up Payment Plan
          </button>
        </div>
      </div>
    </div>
  );
}
