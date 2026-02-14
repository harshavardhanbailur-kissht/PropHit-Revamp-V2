'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { type LandUseEntry } from '@/lib/propertyHistoryData';

interface LandUseBarProps {
  evolution: LandUseEntry[];
}

// Progressive gold intensity — oldest is faintest, newest is brightest
const SEGMENT_STYLES = [
  'bg-gold/10 border-gold/15',
  'bg-gold/20 border-gold/25',
  'bg-gold/40 border-gold/40',
  'bg-gold/70 border-gold/60',
  'bg-gold/90 border-gold/80',
];

export function LandUseBar({ evolution }: LandUseBarProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="py-12 px-4 md:px-6 max-w-4xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-8">
        <p className="text-gold text-micro uppercase tracking-[0.25em] font-medium mb-2">
          Transformation
        </p>
        <h2 className="font-serif text-title text-white">Land Use Evolution</h2>
      </div>

      {/* Evolution steps — connected horizontal cards */}
      <div className="glass-card p-5 md:p-6">
        <div className="flex items-stretch gap-0 overflow-x-auto hide-scrollbar">
          {evolution.map((entry, index) => {
            const style = SEGMENT_STYLES[Math.min(index, SEGMENT_STYLES.length - 1)];
            const isLast = index === evolution.length - 1;

            return (
              <div
                key={entry.period}
                className="flex items-stretch flex-1 min-w-0"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1)`,
                  transitionDelay: `${index * 0.15}s`,
                }}
              >
                {/* Step card */}
                <div className={`flex-1 rounded-lg border ${style} p-3 md:p-4 text-center min-w-[100px]`}>
                  {/* Period */}
                  <p className="text-text-muted text-micro mb-1.5 whitespace-nowrap">
                    {entry.period}
                  </p>

                  {/* Use type — primary label */}
                  <p className={`font-medium text-micro md:text-caption leading-tight ${isLast ? 'text-gold' : 'text-text-primary'}`}>
                    {entry.use}
                  </p>
                </div>

                {/* Arrow connector between steps */}
                {!isLast && (
                  <div className="flex items-center px-1 md:px-2 flex-shrink-0">
                    <svg
                      className="w-3 h-3 md:w-4 md:h-4 text-gold/40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                        transitionDelay: `${0.3 + index * 0.15}s`,
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
