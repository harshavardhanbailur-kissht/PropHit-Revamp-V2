'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { useFlow } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';

type KycMethod = 'video' | 'aadhaar' | null;
type Stage = 'typing-dots' | 'typing-message' | 'show-options' | 'processing' | 'success';

const SECURITY_FEATURES = [
  { title: 'LLP Protection', description: 'Your assets are legally protected under LLP structure', icon: 'building' },
  { title: 'Smart Contracts', description: 'Automated & tamper-proof agreements on blockchain', icon: 'cube' },
  { title: 'Secure Escrow', description: 'Funds released only when conditions are met', icon: 'lock' },
  { title: 'Insurance Backed', description: 'Comprehensive coverage for peace of mind', icon: 'shield' },
] as const;

function SecurityIcon({ type }: { type: string }) {
  switch (type) {
    case 'building':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'cube':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
    case 'lock':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      );
    case 'shield':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function KycPage() {
  const router = useRouter();
  const { state, setKycMethod, completeKyc } = useFlow();
  const userName = state.displayName || 'there';

  const [stage, setStage] = useState<Stage>('typing-dots');
  const [displayedText, setDisplayedText] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<KycMethod>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [featureKey, setFeatureKey] = useState(0);

  const charIndexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const featureIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const featurePausedRef = useRef(false);

  const message = `Hey ${userName}, let\u2019s get your KYC done so you stay just as compliant as us`;

  // Route guard
  useEffect(() => {
    if (!state.displayName) {
      router.replace('/');
    }
  }, [state.displayName, router]);

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
    }, 1500);
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
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [stage, message, transitionToStage]);

  // Stage: processing — progress bar simulation
  useEffect(() => {
    if (stage !== 'processing') return;
    setProcessingProgress(0);
    const start = Date.now();
    const duration = 3000;

    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setProcessingProgress(progress);
      if (progress >= 100) {
        clearInterval(tick);
        setTimeout(() => transitionToStage('success'), 400);
      }
    }, 50);

    return () => clearInterval(tick);
  }, [stage, transitionToStage]);

  // Security features carousel
  useEffect(() => {
    if (stage !== 'show-options') return;
    featureIntervalRef.current = setInterval(() => {
      if (!featurePausedRef.current) {
        setCurrentFeature(prev => (prev + 1) % SECURITY_FEATURES.length);
        setFeatureKey(prev => prev + 1);
      }
    }, 5000);
    return () => {
      if (featureIntervalRef.current) clearInterval(featureIntervalRef.current);
    };
  }, [stage]);

  const handleSelectMethod = (method: KycMethod) => {
    if (!method) return;
    setSelectedMethod(method);
    setKycMethod(method);
    transitionToStage('processing');
  };

  const handleContinue = () => {
    completeKyc();
    router.push('/pan');
  };

  const handleBack = () => {
    router.back();
  };

  if (!state.displayName) return null;

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
            <div className="w-8 h-1 rounded-full bg-gold/20" />
            <span className="text-[0.6875rem] text-[var(--text-muted)] ml-2 tracking-[0.12em] uppercase">Step 2 of 3</span>
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

              {/* KYC Method Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Video KYC */}
                <button
                  onClick={() => handleSelectMethod('video')}
                  className="glass-card rounded-2xl p-6 text-left relative overflow-hidden group cursor-pointer
                             hover:border-[var(--border-gold)] transition-all duration-300 border border-[var(--border-subtle)]"
                  style={{ animation: 'cardFlyInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both' }}
                >
                  <div className="absolute top-3 right-3">
                    <span className="text-[0.6875rem] font-bold px-3 py-1 rounded-full bg-[var(--gold-glow)] text-[var(--gold)] border border-[var(--border-gold)]">
                      Recommended
                    </span>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center mb-4 shadow-[0_0_20px_var(--gold-glow-md)]">
                    <svg className="w-7 h-7 text-[var(--bg-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1 heading-luxury">Video KYC</h3>
                  <p className="text-sm font-medium text-[var(--gold)] mb-2">Quick face verification</p>
                  <p className="text-sm text-[var(--text-secondary)]">Complete in 60 seconds with a live video call</p>
                </button>

                {/* Aadhaar eKYC */}
                <button
                  onClick={() => handleSelectMethod('aadhaar')}
                  className="glass-card rounded-2xl p-6 text-left relative overflow-hidden group cursor-pointer
                             hover:border-[var(--border-gold)] transition-all duration-300 border border-[var(--border-subtle)]"
                  style={{ animation: 'cardFlyInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both' }}
                >
                  <div className="absolute top-3 right-3">
                    <span className="text-[0.6875rem] font-bold px-3 py-1 rounded-full bg-[var(--gold-glow-sm)] text-[var(--gold-light)] border border-[var(--gold-light)]/20">
                      Most Popular
                    </span>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold-medium)] flex items-center justify-center mb-4 shadow-[0_0_20px_var(--gold-glow-md)]">
                    <svg className="w-7 h-7 text-[var(--bg-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1 heading-luxury">Aadhaar eKYC</h3>
                  <p className="text-sm font-medium text-[var(--gold-light)] mb-2">DigiLocker verified</p>
                  <p className="text-sm text-[var(--text-secondary)]">Instant verification via government database</p>
                </button>
              </div>

              {/* Security Features Carousel */}
              <div
                className="glass-card rounded-2xl p-5 border border-[var(--border-subtle)]"
                onMouseEnter={() => { featurePausedRef.current = true; }}
                onMouseLeave={() => { featurePausedRef.current = false; }}
              >
                <div className="flex items-center gap-4 trust-slide-enter" key={featureKey}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center text-[var(--bg-primary)] shrink-0">
                    <SecurityIcon type={SECURITY_FEATURES[currentFeature].icon} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-semibold heading-luxury">{SECURITY_FEATURES[currentFeature].title}</h4>
                    <p className="text-[var(--text-secondary)] text-[0.8125rem]">{SECURITY_FEATURES[currentFeature].description}</p>
                  </div>
                </div>
                <div className="flex justify-center gap-2 mt-3">
                  {SECURITY_FEATURES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setCurrentFeature(i); setFeatureKey(prev => prev + 1); }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === currentFeature ? 'w-4 bg-[var(--gold)]' : 'w-1.5 bg-[var(--text-ghost)]'}`}
                      aria-label={`Feature ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-5 mt-5">
                {[
                  { icon: '🔒', text: '256-bit Encryption' },
                  { icon: '✓', text: 'SEBI Registered' },
                  { icon: '🏦', text: 'Bank-grade Security' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[var(--text-muted)] text-sm">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stage: Processing */}
          {stage === 'processing' && (
            <div className="kyc-stage-enter w-full">
              <div className="glass-card-hero px-8 py-10 text-center">
                {/* Scanner Viewport */}
                <div className="relative w-full max-w-xs mx-auto aspect-[4/3] bg-[var(--bg-void)] rounded-2xl overflow-hidden mb-6 border border-[var(--border-gold)]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {selectedMethod === 'video' ? (
                      <div className="w-20 h-20 rounded-full border-4 border-[var(--gold)]/30 flex items-center justify-center">
                        <svg className="w-10 h-10 text-[var(--gold)]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <svg className="w-8 h-8 text-[var(--gold)]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-xs text-[var(--text-muted)]">DigiLocker</span>
                      </div>
                    )}
                  </div>
                  <div className="kyc-scan-line" />
                  <div className="kyc-corner kyc-corner-tl" />
                  <div className="kyc-corner kyc-corner-tr" />
                  <div className="kyc-corner kyc-corner-bl" />
                  <div className="kyc-corner kyc-corner-br" />
                </div>

                {/* Processing Label */}
                <p className="text-white font-semibold mb-3">
                  {selectedMethod === 'video' ? 'Verifying your identity...' : 'Connecting to DigiLocker...'}
                </p>

                {/* Progress Bar */}
                <div className="w-full max-w-xs mx-auto bg-[var(--bg-elevated)] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="kyc-progress-fill"
                    style={{ width: `${processingProgress}%` }}
                  />
                </div>
                <p className="text-[var(--text-muted)] text-[0.8125rem] mt-2">{Math.round(processingProgress)}% complete</p>
              </div>
            </div>
          )}

          {/* Stage: Success */}
          {stage === 'success' && (
            <div className="kyc-stage-enter w-full">
              <div className="glass-card-hero px-8 py-10 text-center">
                {/* Checkmark */}
                <div className="mx-auto mb-6 kyc-success-pulse rounded-full w-20 h-20 bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] flex items-center justify-center shadow-[0_0_30px_var(--gold-glow-lg)]">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="kyc-check-draw" />
                  </svg>
                </div>

                <h2 className="text-2xl font-semibold text-white mb-3 heading-luxury">KYC Verified</h2>

                {/* Method Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 bg-[var(--gold-glow)] border border-[var(--border-gold)]">
                  <svg className="w-4 h-4 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[0.8125rem] font-semibold text-[var(--gold)]">
                    {selectedMethod === 'video' ? 'Video KYC Complete' : 'Aadhaar eKYC Complete'}
                  </span>
                </div>

                <p className="text-[var(--text-secondary)] text-sm mb-6">Your identity has been successfully verified</p>

                <Button onClick={handleContinue} variant="luxury" size="xl">
                  Continue
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
