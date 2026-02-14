'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useFlow } from '@/context/FlowContext';
import { getPropertyById } from '@/lib/propertyData';
import { InvestmentOptions } from '@/components/invest/InvestmentOptions';
import { UPIPaymentForm } from '@/components/invest/UPIPaymentForm';
import { EarnestSetup } from '@/components/invest/EarnestSetup';
import { InvestmentSuccess } from '@/components/invest/InvestmentSuccess';

type InvestStep = 'options' | 'upi-single' | 'upi-earnest' | 'processing' | 'success';
type PaymentMethod = 'single' | 'earnest';

const PROCESSING_MESSAGES = [
  'Verifying UPI details...',
  'Initiating secure transaction...',
  'Almost there...',
];

export default function InvestPage() {
  const router = useRouter();
  const params = useParams();
  const { state } = useFlow();
  const [step, setStep] = useState<InvestStep>('options');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('single');
  const [processingMsg, setProcessingMsg] = useState(0);

  const property = getPropertyById(params.id as string);

  // Auth guard
  useEffect(() => {
    if (!state.displayName || !state.isVerified) {
      router.replace('/');
    }
  }, [state.displayName, state.isVerified, router]);

  // Processing animation: cycle messages then transition to success
  useEffect(() => {
    if (step !== 'processing') return;

    const msgInterval = setInterval(() => {
      setProcessingMsg(prev => (prev + 1) % PROCESSING_MESSAGES.length);
    }, 1000);

    const successTimeout = setTimeout(() => {
      setStep('success');
    }, 3000);

    return () => {
      clearInterval(msgInterval);
      clearTimeout(successTimeout);
    };
  }, [step]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-muted">Property not found.</p>
      </div>
    );
  }

  const handleSelectSingle = () => {
    setPaymentMethod('single');
    setStep('upi-single');
  };

  const handleSelectEarnest = () => {
    setPaymentMethod('earnest');
    setStep('upi-earnest');
  };

  const handleProcess = () => {
    setProcessingMsg(0);
    setStep('processing');
  };

  const handleBackToOptions = () => {
    setStep('options');
  };

  return (
    <div className="min-h-screen flex flex-col px-4 sm:px-6 py-6 max-w-lg mx-auto safe-top safe-bottom">
      {/* Back Button */}
      <button
        onClick={() => {
          if (step === 'options') {
            router.back();
          } else if (step === 'success') {
            router.push('/dashboard');
          } else {
            setStep('options');
          }
        }}
        className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full
                   bg-black/60 backdrop-blur-md border border-white/10
                   flex items-center justify-center text-white/80
                   transition-all duration-200
                   hover:bg-black/80 hover:border-gold/30 hover:text-gold
                   active:scale-95"
        aria-label="Go back"
        style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Label */}
      {step !== 'success' && step !== 'processing' && (
        <div className="text-center pt-8 mb-6 page-transition">
          <p className="label-luxury mb-1">Purchase</p>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Step 1: Options */}
        {step === 'options' && (
          <InvestmentOptions
            property={property}
            displayName={state.displayName}
            onSelectSingle={handleSelectSingle}
            onSelectEarnest={handleSelectEarnest}
          />
        )}

        {/* Step 2a: Single UPI Form */}
        {step === 'upi-single' && (
          <UPIPaymentForm
            property={property}
            onProcess={handleProcess}
            onBack={handleBackToOptions}
          />
        )}

        {/* Step 2b: Earnest Setup */}
        {step === 'upi-earnest' && (
          <EarnestSetup
            property={property}
            onProcess={handleProcess}
            onBack={handleBackToOptions}
          />
        )}

        {/* Step 3: Processing */}
        {step === 'processing' && (
          <div className="text-center py-16 kyc-stage-enter">
            <div className="invest-processing-ring" />
            <p className="text-white text-lg heading-luxury mb-2">
              Processing your purchase
            </p>
            <p className="text-text-secondary text-sm" role="status" aria-live="polite">
              {PROCESSING_MESSAGES[processingMsg]}
            </p>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <InvestmentSuccess
            property={property}
            displayName={state.displayName}
            paymentMethod={paymentMethod}
            onReturnToDashboard={() => router.push('/dashboard')}
          />
        )}
      </div>

      {/* Disclaimer */}
      {step !== 'success' && step !== 'processing' && (
        <p className="text-text-muted text-xs text-center leading-relaxed opacity-60 mt-6 mb-4">
          This is a demonstration of the purchase flow. No actual transactions will be processed.
          PropHit is a prototype for stakeholder review.
        </p>
      )}
    </div>
  );
}
