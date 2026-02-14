'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { useFlow } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';

type Stage = 'typing-dots' | 'typing-message' | 'show-options' | 'manual-input' | 'ocr-scanning' | 'verifying' | 'congratulations';

// PAN format: ABCDE1234F — 5 letters + 4 digits + 1 letter
function validatePanSegments(pan: string) {
  const letters1 = pan.slice(0, 5);
  const digits = pan.slice(5, 9);
  const letter2 = pan.slice(9, 10);

  return {
    letters1Valid: /^[A-Z]{5}$/.test(letters1),
    digitsValid: /^\d{4}$/.test(digits),
    letter2Valid: /^[A-Z]$/.test(letter2),
    isComplete: pan.length === 10,
    isValid: /^[A-Z]{5}\d{4}[A-Z]$/.test(pan),
  };
}

export default function PanPage() {
  const router = useRouter();
  const { state, setPanMethod, setPanNumber, completePan } = useFlow();
  const userName = state.displayName || 'there';

  const [stage, setStage] = useState<Stage>('typing-dots');
  const [displayedText, setDisplayedText] = useState('');
  const [panValue, setPanValue] = useState('');
  const [scanDetected, setScanDetected] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const charIndexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const redirectTimerRef = useRef<NodeJS.Timeout | null>(null);

  const message = `The last step and you\u2019re into the exclusive community of extraordinary opportunities`;

  // Confetti pieces — all gold tones
  const confettiPieces = useMemo(() =>
    [...Array(40)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 3}s`,
      color: ['#C9A962', '#D4BC78', '#8B6914', '#E8D5A0', '#A8893D'][Math.floor(Math.random() * 5)],
      size: `${6 + Math.random() * 8}px`,
      isRound: Math.random() > 0.5,
    })), []);

  // Route guard
  useEffect(() => {
    if (!state.kycComplete) {
      router.replace('/kyc');
    }
  }, [state.kycComplete, router]);

  const transitionToStage = useCallback((newStage: Stage) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStage(newStage);
      setIsTransitioning(false);
    }, 300);
  }, []);

  // Stage: typing-dots → typing-message
  useEffect(() => {
    if (stage !== 'typing-dots') return;
    const timer = setTimeout(() => {
      transitionToStage('typing-message');
    }, 1200);
    return () => clearTimeout(timer);
  }, [stage, transitionToStage]);

  // Stage: typing-message — typewriter effect
  useEffect(() => {
    if (stage !== 'typing-message') return;
    charIndexRef.current = 0;
    setDisplayedText('');

    intervalRef.current = setInterval(() => {
      charIndexRef.current += 1;
      if (charIndexRef.current >= message.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => transitionToStage('show-options'), 600);
      }
      setDisplayedText(message.slice(0, charIndexRef.current));
    }, 25);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [stage, message, transitionToStage]);

  // Stage: ocr-scanning — simulate detection after 3s
  useEffect(() => {
    if (stage !== 'ocr-scanning') return;
    setScanDetected(false);
    const timer = setTimeout(() => {
      setScanDetected(true);
      setPanValue('ABCPD1234E');
      setTimeout(() => transitionToStage('verifying'), 1500);
    }, 3000);
    return () => clearTimeout(timer);
  }, [stage, transitionToStage]);

  // Stage: verifying → congratulations
  useEffect(() => {
    if (stage !== 'verifying') return;
    const timer = setTimeout(() => {
      setPanNumber(panValue);
      completePan();
      transitionToStage('congratulations');
    }, 2000);
    return () => clearTimeout(timer);
  }, [stage, panValue, setPanNumber, completePan, transitionToStage]);

  // Congratulations auto-redirect
  useEffect(() => {
    if (stage !== 'congratulations') return;
    redirectTimerRef.current = setTimeout(() => {
      router.push('/dashboard');
    }, 8000);
    return () => {
      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
    };
  }, [stage, router]);

  const handleSelectMethod = (method: 'manual' | 'ocr') => {
    if (!method) return;
    setPanMethod(method);
    transitionToStage(method === 'manual' ? 'manual-input' : 'ocr-scanning');
  };

  const handleManualSubmit = () => {
    const validation = validatePanSegments(panValue);
    if (!validation.isValid) return;
    transitionToStage('verifying');
  };

  const handleEnterPropHit = () => {
    if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
    router.push('/dashboard');
  };

  const handleBack = () => {
    router.back();
  };

  const panValidation = validatePanSegments(panValue);

  if (!state.kycComplete) return null;

  // Congratulations — full-screen overlay
  if (stage === 'congratulations') {
    return (
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[var(--bg-void)]/95 backdrop-blur-sm" style={{ animation: 'kycStageEnter 0.5s ease-out' }} />

        {/* Confetti */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="kyc-confetti-piece"
              style={{
                left: piece.left,
                top: '-20px',
                width: piece.size,
                height: piece.size,
                background: piece.color,
                borderRadius: piece.isRound ? '50%' : '2px',
                '--confetti-delay': piece.delay,
                '--confetti-duration': piece.duration,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
          <div className="text-center max-w-lg">
            {/* Animated Checkmark */}
            <div className="congrats-checkmark mx-auto mb-8 kyc-success-pulse rounded-full w-24 h-24 bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] flex items-center justify-center shadow-[0_0_40px_var(--gold-glow-lg)]">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="kyc-check-draw" />
              </svg>
            </div>

            {/* Title */}
            <h1 className="congrats-title text-4xl md:text-5xl text-shimmer-gold heading-luxury mb-4">
              Congratulations!
            </h1>

            <p className="congrats-subtitle text-xl text-white font-semibold mb-2 heading-luxury">
              {userName}, you&apos;re now part of an exclusive community
            </p>

            <p className="congrats-message text-[var(--text-secondary)] mb-8">
              Amazing opportunities are waiting for you
            </p>

            {/* Verified Badge */}
            <div className="congrats-badge inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 border border-[var(--border-gold)] bg-[var(--gold-glow)]">
              <svg className="w-5 h-5 text-[var(--gold-light)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-[var(--gold-light)] font-bold text-[0.6875rem] tracking-[0.12em] uppercase">Verified Member</span>
            </div>

            <br />

            {/* Enter Button */}
            <div className="congrats-button">
              <Button onClick={handleEnterPropHit} variant="luxury" size="xl">
                Enter PropHit
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </div>

            <p className="congrats-hint text-[var(--text-muted)] text-[0.8125rem] mt-4">
              Auto-redirecting in a few seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 safe-top safe-bottom relative overflow-hidden">
      {/* Page Aurora */}
      <div className="login-aurora" aria-hidden="true" />

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="fixed top-6 left-6 z-20 safe-top p-2.5 rounded-xl glass-card border border-white/[0.06] text-text-muted hover:text-gold hover:border-gold/20 transition-all duration-300"
        aria-label="Go back"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Content Container */}
      <div className="w-full max-w-lg relative z-10">
        <div className={`flex flex-col items-center page-transition ${isTransitioning ? 'kyc-stage-exit' : ''}`}>
          {/* Logo */}
          <Logo className="w-56 h-10 mb-8" variant="dark" />

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-1 rounded-full bg-gold" />
            <div className="w-8 h-1 rounded-full bg-gold" />
            <div className="w-8 h-1 rounded-full bg-gold" />
            <span className="text-[0.6875rem] text-[var(--text-muted)] ml-2 tracking-[0.12em] uppercase">Step 3 of 3</span>
          </div>

          {/* Stage: Typing Dots */}
          {stage === 'typing-dots' && (
            <div className="kyc-stage-enter">
              <div className="glass-card-hero px-8 py-10 w-full max-w-lg">
                <div className="flex items-center justify-center gap-1.5 bg-[var(--bg-elevated)]/60 backdrop-blur-sm rounded-2xl px-5 py-4 border border-[var(--border-subtle)]">
                  <span className="kyc-typing-dot" />
                  <span className="kyc-typing-dot" />
                  <span className="kyc-typing-dot" />
                </div>
              </div>
            </div>
          )}

          {/* Stage: Typing Message */}
          {stage === 'typing-message' && (
            <div className="kyc-stage-enter">
              <div className="glass-card-hero px-8 py-10 w-full max-w-lg">
                <div className="bg-[var(--gold-glow-sm)] rounded-2xl px-6 py-4 border border-[var(--border-gold)]">
                  <p className="text-lg md:text-xl font-[var(--font-cormorant)] text-[var(--text-primary)] leading-relaxed">
                    {displayedText}
                    <span className="kyc-typing-cursor" />
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Stage: Show Options */}
          {stage === 'show-options' && (
            <div className="kyc-stage-enter w-full">
              {/* Message Recap */}
              <div className="glass-card-hero px-6 py-5 mb-6">
                <div className="bg-[var(--gold-glow-sm)] rounded-2xl px-5 py-3 border border-[var(--border-gold)]">
                  <p className="text-base font-[var(--font-cormorant)] text-[var(--text-primary)] leading-relaxed">
                    {message}
                  </p>
                </div>
              </div>

              {/* PAN Method Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Manual Entry */}
                <button
                  onClick={() => handleSelectMethod('manual')}
                  className="glass-card rounded-2xl p-6 text-left relative overflow-hidden group cursor-pointer
                             hover:border-[var(--border-gold)] transition-all duration-300 border border-[var(--border-subtle)]"
                  style={{ animation: 'cardFlyInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both' }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center mb-4 shadow-[0_0_20px_var(--gold-glow-md)]">
                    <svg className="w-7 h-7 text-[var(--bg-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1 heading-luxury">Enter PAN Manually</h3>
                  <p className="text-sm font-medium text-[var(--gold)] mb-2">Type your 10-character PAN</p>
                  <p className="text-sm text-[var(--text-secondary)]">Quick and straightforward entry</p>
                </button>

                {/* OCR Scan */}
                <button
                  onClick={() => handleSelectMethod('ocr')}
                  className="glass-card rounded-2xl p-6 text-left relative overflow-hidden group cursor-pointer
                             hover:border-[var(--border-gold)] transition-all duration-300 border border-[var(--border-subtle)]"
                  style={{ animation: 'cardFlyInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both' }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold-medium)] flex items-center justify-center mb-4 shadow-[0_0_20px_var(--gold-glow-md)]">
                    <svg className="w-7 h-7 text-[var(--bg-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1 heading-luxury">Scan PAN Card</h3>
                  <p className="text-sm font-medium text-[var(--gold-light)] mb-2">Use camera to auto-detect</p>
                  <p className="text-sm text-[var(--text-secondary)]">Just point your camera at the card</p>
                </button>
              </div>
            </div>
          )}

          {/* Stage: Manual Input */}
          {stage === 'manual-input' && (
            <div className="kyc-stage-enter w-full">
              <div className="glass-card-hero px-8 py-10">
                <h3 className="text-lg font-semibold text-white mb-6 text-center heading-luxury">Enter your PAN number</h3>

                <div className="max-w-xs mx-auto">
                  <input
                    type="text"
                    value={panValue}
                    onChange={(e) => setPanValue(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10))}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    autoFocus
                    className="w-full text-center text-2xl font-semibold tracking-[0.2em] py-4 px-4 rounded-xl
                               bg-[var(--bg-card)] border border-[var(--border-gold)] text-[var(--gold)]
                               placeholder:text-[var(--text-ghost)]
                               focus:border-[var(--gold)] focus:shadow-[0_0_20px_var(--gold-glow-md)] focus:outline-none
                               transition-all uppercase font-serif"
                    aria-label="PAN number"
                  />

                  {/* Validation Indicators */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <span className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
                      panValidation.letters1Valid ? 'pan-segment-valid border-[var(--border-gold)]' : 'pan-segment-pending'
                    }`}>
                      {panValidation.letters1Valid ? '✓' : '○'} 5 Letters
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
                      panValidation.digitsValid ? 'pan-segment-valid border-[var(--border-gold)]' : 'pan-segment-pending'
                    }`}>
                      {panValidation.digitsValid ? '✓' : '○'} 4 Digits
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
                      panValidation.letter2Valid ? 'pan-segment-valid border-[var(--border-gold)]' : 'pan-segment-pending'
                    }`}>
                      {panValidation.letter2Valid ? '✓' : '○'} 1 Letter
                    </span>
                  </div>

                  <Button
                    onClick={handleManualSubmit}
                    disabled={!panValidation.isValid}
                    variant="luxury"
                    size="xl"
                    className="w-full mt-6"
                  >
                    Verify PAN
                  </Button>

                  <button
                    onClick={() => { setPanValue(''); transitionToStage('show-options'); }}
                    className="w-full mt-3 text-[var(--text-muted)] text-sm hover:text-[var(--gold)] transition-colors text-center"
                  >
                    Choose different method
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stage: OCR Scanning */}
          {stage === 'ocr-scanning' && (
            <div className="kyc-stage-enter w-full">
              <div className="glass-card-hero px-8 py-10 text-center">
                <h3 className="text-lg font-semibold text-white mb-6 heading-luxury">Scanning PAN Card</h3>

                {/* Scanner Viewport — credit card aspect ratio */}
                <div className="relative w-full max-w-xs mx-auto rounded-2xl overflow-hidden mb-6 border-2 border-dashed border-[var(--border-gold)] bg-[var(--bg-void)]"
                  style={{ aspectRatio: '1.58 / 1' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {!scanDetected ? (
                      <p className="text-[var(--text-muted)] text-sm">Position your PAN card here</p>
                    ) : (
                      <div className="kyc-stage-enter text-center">
                        <svg className="w-8 h-8 text-[var(--gold)] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-[var(--gold)] font-semibold text-sm">PAN Detected</p>
                        <p className="text-white font-bold text-lg tracking-wider mt-1">ABCPD1234E</p>
                      </div>
                    )}
                  </div>
                  {!scanDetected && (
                    <>
                      <div className="kyc-scan-line" />
                      <div className="kyc-corner kyc-corner-tl" />
                      <div className="kyc-corner kyc-corner-tr" />
                      <div className="kyc-corner kyc-corner-bl" />
                      <div className="kyc-corner kyc-corner-br" />
                    </>
                  )}
                </div>

                <p className="text-[var(--text-muted)] text-[0.8125rem]">
                  {scanDetected ? 'PAN detected successfully!' : 'Scanning for PAN number...'}
                </p>

                <button
                  onClick={() => { setScanDetected(false); transitionToStage('show-options'); }}
                  className="mt-4 text-[var(--text-muted)] text-sm hover:text-[var(--gold)] transition-colors"
                >
                  Choose different method
                </button>
              </div>
            </div>
          )}

          {/* Stage: Verifying */}
          {stage === 'verifying' && (
            <div className="kyc-stage-enter w-full">
              <div className="glass-card-hero px-8 py-14 text-center">
                <div className="mx-auto mb-6 w-12 h-12">
                  <svg className="animate-spin w-12 h-12 text-[var(--gold)]" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </div>
                <p className="text-white font-semibold mb-2">Verifying your PAN</p>
                <p className="text-[var(--text-muted)] text-sm">{panValue}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
