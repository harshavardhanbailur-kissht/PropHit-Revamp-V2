'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { HistoryCard } from './HistoryCard';
import { type OwnershipRecord } from '@/lib/propertyHistoryData';

interface HistoryTimelineProps {
  records: OwnershipRecord[];
}

function TimelineNode({ index }: { index: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.5 });

  return (
    <div
      ref={ref}
      className={`history-node ${isVisible ? 'is-visible' : ''}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    />
  );
}

export function HistoryTimeline({ records }: HistoryTimelineProps) {
  const { ref: spineRef, isVisible: spineVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.05,
    rootMargin: '0px 0px 0px 0px',
  });

  return (
    <section className="relative py-16 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-12">
        <p className="text-gold text-micro uppercase tracking-[0.25em] font-medium mb-2">
          Chain of Ownership
        </p>
        <h2 className="font-serif text-hero text-white">
          Transfer Timeline
        </h2>
      </div>

      {/* Timeline container */}
      <div ref={spineRef} className="relative">
        {/* Central spine line (desktop) */}
        <div
          className={`history-spine hidden md:block ${spineVisible ? 'is-visible' : ''}`}
          style={{ height: spineVisible ? '100%' : '0' }}
        />

        {/* Left spine line (mobile) */}
        <div
          className={`history-spine-mobile md:hidden ${spineVisible ? 'is-visible' : ''}`}
          style={{ height: spineVisible ? '100%' : '0' }}
        />

        {/* Timeline entries */}
        <div className="relative space-y-8 md:space-y-16">
          {records.map((record, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';

            return (
              <div key={record.id} className="relative">
                {/* Desktop: alternating layout */}
                <div className="hidden md:grid md:grid-cols-[1fr_40px_1fr] md:items-start md:gap-8">
                  {/* Left column */}
                  <div className="flex justify-end">
                    {side === 'left' ? (
                      <div className="w-full max-w-md">
                        <HistoryCard record={record} index={index} side="left" />
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>

                  {/* Center node */}
                  <div className="flex justify-center pt-4">
                    <TimelineNode index={index} />
                  </div>

                  {/* Right column */}
                  <div className="flex justify-start">
                    {side === 'right' ? (
                      <div className="w-full max-w-md">
                        <HistoryCard record={record} index={index} side="right" />
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>

                {/* Mobile: left-aligned layout with better spacing */}
                <div className="md:hidden flex items-start gap-3 pl-2">
                  <div className="flex-shrink-0 mt-5 relative z-10">
                    <TimelineNode index={index} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <HistoryCard record={record} index={index} side="right" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
