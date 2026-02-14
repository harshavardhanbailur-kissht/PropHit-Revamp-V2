'use client';

import { useRef, useState, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { type HistoricalFact } from '@/lib/propertyHistoryData';
import { Landmark, Calendar, Building2, Palette, Train } from 'lucide-react';

interface HistoryFactsProps {
  facts: HistoricalFact[];
}

function getCategoryIcon(category: HistoricalFact['category']) {
  switch (category) {
    case 'landmark': return <Landmark className="w-4 h-4" />;
    case 'event': return <Calendar className="w-4 h-4" />;
    case 'development': return <Building2 className="w-4 h-4" />;
    case 'culture': return <Palette className="w-4 h-4" />;
    case 'infrastructure': return <Train className="w-4 h-4" />;
  }
}

function getCategoryColor(category: HistoricalFact['category']): string {
  switch (category) {
    case 'landmark': return 'text-amber-400';
    case 'event': return 'text-blue-400';
    case 'development': return 'text-emerald-400';
    case 'culture': return 'text-purple-400';
    case 'infrastructure': return 'text-gold';
  }
}

export function HistoryFacts({ facts }: HistoryFactsProps) {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="py-16 overflow-hidden">
      {/* Section header */}
      <div className="text-center mb-8 px-6">
        <p className="text-gold text-micro uppercase tracking-[0.25em] font-medium mb-2">
          Interesting Insights
        </p>
        <h2 className="font-serif text-hero text-white">Did You Know?</h2>
      </div>

      {/* Desktop: responsive grid layout */}
      <div className="hidden md:block px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {facts.map((fact, index) => (
            <div
              key={fact.year + fact.title}
              className="glass-card p-5 transition-all duration-300 hover:border-gold/25 hover:shadow-gold-glow hover:-translate-y-1"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                transitionDelay: isVisible ? `${index * 0.08}s` : '0s',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={getCategoryColor(fact.category)}>
                  {getCategoryIcon(fact.category)}
                </div>
                <span className="text-gold text-micro font-semibold px-2 py-0.5 rounded bg-gold/10 border border-gold/15">
                  {fact.year}
                </span>
              </div>
              <h3 className="text-white text-caption font-medium mb-2 leading-snug">
                {fact.title}
              </h3>
              <p className="text-text-secondary text-micro leading-relaxed">
                {fact.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="md:hidden relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full
                       bg-bg-elevated/90 border border-border-subtle backdrop-blur-sm
                       flex items-center justify-center text-gold/70
                       active:text-gold transition-all duration-200"
            aria-label="Scroll left"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full
                       bg-bg-elevated/90 border border-border-subtle backdrop-blur-sm
                       flex items-center justify-center text-gold/70
                       active:text-gold transition-all duration-200"
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        <div ref={scrollRef} className="history-facts-scroll">
          {facts.map((fact, index) => (
            <div
              key={fact.year + fact.title}
              className="history-fact-card glass-card p-5"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                transitionDelay: isVisible ? `${index * 0.1}s` : '0s',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={getCategoryColor(fact.category)}>
                  {getCategoryIcon(fact.category)}
                </div>
                <span className="text-gold text-micro font-semibold px-2 py-0.5 rounded bg-gold/10 border border-gold/15">
                  {fact.year}
                </span>
              </div>
              <h3 className="text-white text-caption font-medium mb-2 leading-snug">
                {fact.title}
              </h3>
              <p className="text-text-secondary text-micro leading-relaxed">
                {fact.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
