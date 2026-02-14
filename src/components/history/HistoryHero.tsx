'use client';

import Image from 'next/image';

interface HistoryHeroProps {
  title: string;
  city: string;
  locality: string;
  tagline: string;
  heroImage: string;
}

export function HistoryHero({ title, city, locality, tagline, heroImage }: HistoryHeroProps) {
  return (
    <section className="history-hero">
      {/* Background image with ken-burns */}
      <div className="absolute inset-0 animate-ken-burns">
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="history-hero-gradient" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Gold label */}
        <p className="text-gold text-micro uppercase tracking-[0.25em] font-medium mb-4 opacity-0 animate-fade-in-up">
          Property History
        </p>

        {/* Title */}
        <h1 className="font-display text-display text-white mb-3 leading-tight">
          {title.split(' ').map((word, i) => (
            <span
              key={i}
              className="inline-block opacity-0"
              style={{
                animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + i * 0.08}s forwards`,
              }}
            >
              {word}&nbsp;
            </span>
          ))}
        </h1>

        {/* Location */}
        <p
          className="text-text-secondary text-body mb-5 opacity-0"
          style={{ animation: 'fadeInUp 0.5s ease-out 0.8s forwards' }}
        >
          {locality}, {city}
        </p>

        {/* Tagline */}
        <p
          className="font-serif text-gold-light text-subtitle italic opacity-0"
          style={{ animation: 'fadeInUp 0.6s ease-out 1s forwards' }}
        >
          {tagline}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 history-scroll-indicator">
        <svg className="w-5 h-5 text-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
