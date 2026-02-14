'use client';

import { useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useFlow } from '@/context/FlowContext';
import { getPropertyById } from '@/lib/propertyData';
import { getPropertyPanoramic } from '@/lib/panoramicData';
import { getPropertyPOIs } from '@/lib/poiData';
import ExploreView from '@/components/explore/ExploreView';
import { BuyNowCTA } from '@/components/BuyNowCTA';

export default function ExplorePage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { state } = useFlow();

  const initialMode = searchParams.get('mode') === 'map' ? 'map' : '360';

  const property = getPropertyById(params.id as string);
  const panoramic = getPropertyPanoramic(params.id as string);
  const pois = getPropertyPOIs(params.id as string);

  // Auth guard
  useEffect(() => {
    if (!state.displayName || !state.isVerified) {
      router.replace('/');
    }
  }, [state.displayName, state.isVerified, router]);

  if (!property || !panoramic || !panoramic.scenes[0]) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-center">
          <p className="text-text-muted text-sm mb-4">Explore view not available for this property.</p>
          <button
            onClick={() => router.back()}
            className="text-gold text-sm underline underline-offset-2"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="explore-back-btn"
        aria-label="Go back"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <ExploreView
        property={property}
        scene={panoramic.scenes[0]}
        pois={pois}
        initialMode={initialMode as '360' | 'map'}
      />

      {/* Floating Invest CTA */}
      <BuyNowCTA
        propertyId={params.id as string}
        propertyTitle={property.title}
        variant="floating"
      />
    </div>
  );
}
