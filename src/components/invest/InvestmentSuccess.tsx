'use client';

import { useEffect, useRef } from 'react';
import { type Property } from '@/lib/propertyData';

interface InvestmentSuccessProps {
  property: Property;
  displayName: string;
  paymentMethod: 'single' | 'earnest';
  onReturnToDashboard: () => void;
}

// Generate particle positions in a circle
function getParticleStyles(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2;
  const distance = 60 + Math.random() * 30;
  const tx = Math.cos(angle) * distance;
  const ty = Math.sin(angle) * distance;
  return {
    '--tx': `${tx}px`,
    '--ty': `${ty}px`,
  } as React.CSSProperties;
}

export function InvestmentSuccess({
  property,
  displayName,
  paymentMethod,
  onReturnToDashboard,
}: InvestmentSuccessProps) {
  const confettiRef = useRef<HTMLDivElement>(null);

  // Trigger gold confetti on mount
  useEffect(() => {
    const container = confettiRef.current;
    if (!container) return;

    const colors = ['#C9A962', '#D4BC78', '#E8D5A0', '#8B6914', '#F5EDD6'];

    for (let i = 0; i < 40; i++) {
      const piece = document.createElement('div');
      piece.className = 'kyc-confetti-piece';
      const size = 4 + Math.random() * 6;
      const isRect = Math.random() > 0.5;
      piece.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${isRect ? size * 2 : size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${isRect ? '2px' : '50%'};
        --confetti-duration: ${3 + Math.random() * 2}s;
        --confetti-delay: ${Math.random() * 0.8}s;
      `;
      container.appendChild(piece);
    }

    return () => {
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div className="relative text-center py-8 kyc-stage-enter">
      {/* Confetti container */}
      <div
        ref={confettiRef}
        className="fixed inset-0 pointer-events-none overflow-hidden z-50"
        aria-hidden="true"
      />

      {/* Gold Checkmark with Particles */}
      <div className="relative inline-block mb-6 congrats-checkmark">
        <div className="w-20 h-20 rounded-full border-2 border-gold bg-gold/10
                        flex items-center justify-center mx-auto kyc-success-pulse">
          <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24">
            <path
              className="kyc-check-draw"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        {/* Particle burst */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="invest-particle"
            style={{
              ...getParticleStyles(i, 12),
              top: '50%',
              left: '50%',
              animationDelay: `${0.1 + i * 0.05}s`,
            }}
          />
        ))}
      </div>

      {/* Congratulations Text */}
      <h1 className="text-hero text-white heading-luxury mb-3 congrats-title">
        Congratulations, {displayName}!
      </h1>

      <p className="text-text-secondary text-base max-w-md mx-auto mb-8 congrats-subtitle">
        You&apos;re one step away from becoming a proud owner of{' '}
        <span className="text-gold font-medium">{property.title}</span>
      </p>

      {/* Founders' Circle Card */}
      <div className="founders-card mb-6 congrats-badge">
        {/* Crown icon */}
        <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20
                        flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>

        <h3>Welcome to the Founders&apos; Circle</h3>

        <p className="founders-intro">
          You&apos;ve joined an ultra-exclusive circle of forward-thinking people.
          As a founding member, you&apos;ll unlock privileges reserved for the few.
        </p>

        <ul className="founders-benefits">
          {[
            'Early access to premium listings before public release',
            'Priority allocation on oversubscribed properties',
            'Dedicated personal concierge',
            'Invitation to members-only property events',
          ].map((benefit, i) => (
            <li key={i} style={{ opacity: 0, animation: `congratsFadeInUp 0.5s ease-out ${1.4 + i * 0.15}s both` }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M5 13l4 4L19 7" />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>

        <p className="founders-teaser">
          More features coming exclusively for Founders&apos; Circle members
        </p>
      </div>

      {/* Earnest-specific T&C notice */}
      {paymentMethod === 'earnest' && (
        <div className="invest-earnest-notice mb-6 congrats-message">
          <strong className="text-gold">Important:</strong> Your fractional ownership will be
          fully secured upon completion of all scheduled payments. Monthly mandates will
          auto-debit as per the agreed schedule. View complete terms in your dashboard.
        </div>
      )}

      {/* Contract Delivery Notice */}
      <div className="invest-earnest-notice mb-6 congrats-message" style={{ borderLeftColor: 'var(--gold)' }}>
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div>
            <p className="text-gold font-medium text-sm mb-1">Written Contract</p>
            <p>Expect delivery of your written contract within <strong className="text-text-primary">10 business days</strong>. All documents will be available in your dashboard once ready.</p>
          </div>
        </div>
      </div>

      {/* Return CTA */}
      <div className="congrats-button">
        <button
          onClick={onReturnToDashboard}
          className="btn-primary"
        >
          Explore More Properties
        </button>
        <p className="text-text-muted text-xs mt-3">
          A confirmation has been sent to your registered details
        </p>
      </div>
    </div>
  );
}
