'use client';

import { useRouter } from 'next/navigation';

interface BuyNowCTAProps {
  propertyId: string;
  propertyTitle: string;
  variant: 'card' | 'primary' | 'sticky' | 'floating';
  className?: string;
}

export function BuyNowCTA({ propertyId, propertyTitle, variant, className = '' }: BuyNowCTAProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(`/dashboard/${propertyId}/invest`);
  };

  if (variant === 'card') {
    return (
      <button
        onClick={handleClick}
        className={`buy-now-card ${className}`}
        aria-label={`Invest in ${propertyTitle}`}
      >
        <span>Invest Now</span>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    );
  }

  if (variant === 'primary') {
    return (
      <button
        onClick={handleClick}
        className={`btn-primary flex flex-col items-center gap-1 ${className}`}
        aria-label={`Invest in ${propertyTitle}`}
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Invest Now
        </span>
        <span className="text-[0.6875rem] font-normal opacity-70 tracking-wider">
          Secure your fractional stake
        </span>
      </button>
    );
  }

  if (variant === 'sticky') {
    return (
      <button
        onClick={handleClick}
        className={`buy-now-sticky ${className}`}
        aria-label={`Invest in ${propertyTitle}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Invest Now
      </button>
    );
  }

  // floating variant
  return (
    <button
      onClick={handleClick}
      className={`buy-now-floating ${className}`}
      aria-label={`Invest in ${propertyTitle}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Invest
    </button>
  );
}
