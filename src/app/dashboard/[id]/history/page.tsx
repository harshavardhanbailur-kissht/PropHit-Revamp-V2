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

      {/* Desktop Return CTA */}
      <div className="hidden md:block py-12 px-6 text-center">
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

      {/* Mobile sticky bottom bar — thumb zone CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40
                      bg-bg-primary/90 backdrop-blur-xl border-t border-border-subtle
                      px-4 py-3 safe-area-bottom">
        <button
          onClick={handleBack}
          className="w-full py-3 rounded-xl
                     bg-gold/10 border border-gold/30 text-gold text-sm font-medium
                     flex items-center justify-center gap-2
                     transition-all duration-200
                     active:scale-[0.98] active:bg-gold/15"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Property
        </button>
      </div>
    </div>
  );
}
