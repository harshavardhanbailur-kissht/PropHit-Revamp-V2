'use client';

import { useEffect, useState, useCallback } from 'react';

interface SocialProofModalProps {
  onComplete: () => void;
  isReturning?: boolean;
}

const STATS = [
  { value: '\u20B9500 Cr+', label: 'Assets Under Management' },
  { value: '4.8/5', label: 'Verified Investor Rating' },
  { value: '12,000+', label: 'Active Portfolio Holders' },
  { value: '98.7%', label: 'Client Satisfaction Rate' },
];

export function SocialProofModal({ onComplete, isReturning }: SocialProofModalProps) {
  const [progress, setProgress] = useState(0);
  const duration = isReturning ? 2000 : 3000;

  const stableComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const interval = 30;
    const step = (interval / duration) * 100;

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    const dismissTimer = setTimeout(stableComplete, duration);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(dismissTimer);
    };
  }, [duration, stableComplete]);

  return (
    <div
      className="social-proof-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Platform trust verification"
      onClick={stableComplete}
    >
      <div className="social-proof-modal" onClick={e => e.stopPropagation()}>
        {/* Verified Badge */}
        <div className="social-proof-badge">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>VERIFIED PLATFORM</span>
        </div>

        {/* Stats Grid */}
        <div className="social-proof-stats-grid">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="social-proof-stat"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              <div className="social-proof-value">{stat.value}</div>
              <div className="social-proof-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="social-proof-progress-track">
          <div
            className="social-proof-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Footer */}
        <p className="social-proof-footer">
          {isReturning
            ? 'Welcome back \u2014 restoring your session...'
            : 'Preparing your secure session...'}
        </p>
      </div>
    </div>
  );
}
