'use client';

import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface AreaHistoryProps {
  areaHistory: string;
  pullQuote: string;
  propertyImage: string;
}

export function AreaHistory({ areaHistory, pullQuote, propertyImage }: AreaHistoryProps) {
  const { ref: quoteRef, isVisible: quoteVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: textRef, isVisible: textVisible } = useScrollReveal<HTMLDivElement>();

  const paragraphs = areaHistory.split('\n\n').filter(Boolean);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background image at low opacity */}
      <div className="absolute inset-0">
        <Image
          src={propertyImage}
          alt="Area background"
          fill
          className="object-cover opacity-[0.06]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-gold text-micro uppercase tracking-[0.25em] font-medium mb-2">
            The Bigger Picture
          </p>
          <h2 className="font-serif text-hero text-white">Area History</h2>
        </div>

        {/* Gold line separator */}
        <div className="gold-line mx-auto mb-10" />

        {/* Pull quote */}
        <div ref={quoteRef} className={`history-pull-quote mb-12 ${quoteVisible ? 'is-visible' : ''}`}>
          &ldquo;{pullQuote}&rdquo;
        </div>

        {/* Body text */}
        <div
          ref={textRef}
          className="space-y-5"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-text-secondary text-body leading-relaxed"
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
