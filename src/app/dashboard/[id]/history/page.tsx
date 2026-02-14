'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useFlow } from '@/context/FlowContext';
import { getPropertyById } from '@/lib/propertyData';
import { getPropertyHistory } from '@/lib/propertyHistoryData';
import { HistoryHero } from '@/components/history/HistoryHero';
import { HistoryTimeline } from '@/components/history/HistoryTimeline';
import { HistoryFacts } from '@/components/history/HistoryFacts';
import { LandUseBar } from '@/components/history/LandUseBar';
import { AreaHistory } from '@/components/history/AreaHistory';
import { BuyNowCTA } from '@/components/BuyNowCTA';

export default function PropertyHistoryPage() {
  const router = useRouter();
  const params = useParams();
  const { state } = useFlow();

  const property = getPropertyById(params.id as string);
  const history = getPropertyHistory(params.id as string);

  // Auth guard
  useEffect(() => {
    if (!state.displayName || !state.isVerified) {
      router.replace('/');
    }
  }, [state.displayName, state.isVerified, router]);

  const handleBack = () => {
    router.back();
  };

  if (!property || !history) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-muted">History not available for this property.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary pb-20 md:pb-0">
      {/* Fixed back button — high z-index to sit above hero */}
      <button
        onClick={handleBack}
        className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full
                   bg-black/60 backdrop-blur-md border border-white/10
                   flex items-center justify-center text-white/80
                   transition-all duration-200
                   hover:bg-black/80 hover:border-gold/30 hover:text-gold
                   active:scale-95"
        aria-label="Back to property"
        style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Cinematic Hero */}
      <HistoryHero
        title={property.title}
        city={property.city}
        locality={property.locality}
        tagline={history.tagline}
        heroImage={history.heroImage}
      />

      {/* Ownership Timeline */}
      <HistoryTimeline records={history.ownershipTimeline} />

      {/* Land Use Evolution Bar */}
      <LandUseBar evolution={history.landUseEvolution} />

      {/* Did You Know? Facts */}
      <HistoryFacts facts={history.historicalFacts} />

      {/* Area History Narrative */}
      <AreaHistory
        areaHistory={history.areaHistory}
        pullQuote={history.areaHistoryPullQuote}
        propertyImage={property.image}
      />

      {/* Desktop Return + Buy Now CTAs */}
      <div className="hidden md:flex flex-col items-center gap-4 py-12 px-6">
        <BuyNowCTA
          propertyId={params.id as string}
          propertyTitle={property.title}
          variant="primary"
          className="max-w-md"
        />
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl
                     border border-gold/30 bg-gold/5 text-gold text-sm font-medium
                     transition-all duration-300 ease-luxury
                     hover:bg-gold/10 hover:border-gold/50 hover:shadow-gold-glow"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Property Details
        </button>
      </div>

      {/* Mobile sticky bottom bar — dual CTAs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40
                      bg-bg-primary/90 backdrop-blur-xl border-t border-border-subtle
                      px-4 py-3 safe-area-bottom">
        <div className="flex items-center gap-3">
          {/* Back — icon only */}
          <button
            onClick={handleBack}
            className="w-12 h-12 rounded-xl bg-titanium-surface border border-white/[0.06]
                       flex items-center justify-center text-text-secondary
                       transition-all duration-200 active:scale-95 shrink-0"
            aria-label="Back to property"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {/* Buy Now — primary */}
          <BuyNowCTA
            propertyId={params.id as string}
            propertyTitle={property.title}
            variant="sticky"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}
