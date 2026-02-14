'use client';

import { useRef, useEffect, useState } from 'react';

interface ModeSwitcherProps {
  activeMode: '360' | 'map';
  onChange: (mode: '360' | 'map') => void;
}

export default function ModeSwitcher({ activeMode, onChange }: ModeSwitcherProps) {
  const btn360Ref = useRef<HTMLButtonElement>(null);
  const btnMapRef = useRef<HTMLButtonElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 4, width: 80 });

  useEffect(() => {
    const activeBtn = activeMode === '360' ? btn360Ref.current : btnMapRef.current;
    if (activeBtn) {
      setIndicatorStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
      });
    }
  }, [activeMode]);

  return (
    <div className="mode-switcher" role="tablist" aria-label="View mode">
      {/* Sliding gold indicator */}
      <div
        className="mode-switcher-indicator"
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
      />

      <button
        ref={btn360Ref}
        className={`mode-switcher-btn ${activeMode === '360' ? 'mode-switcher-btn--active' : ''}`}
        onClick={() => onChange('360')}
        role="tab"
        aria-selected={activeMode === '360'}
        aria-controls="panel-360"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3.6 9h16.8M3.6 15h16.8" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z" />
        </svg>
        360°
      </button>

      <button
        ref={btnMapRef}
        className={`mode-switcher-btn ${activeMode === 'map' ? 'mode-switcher-btn--active' : ''}`}
        onClick={() => onChange('map')}
        role="tab"
        aria-selected={activeMode === 'map'}
        aria-controls="panel-map"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Map
      </button>
    </div>
  );
}
