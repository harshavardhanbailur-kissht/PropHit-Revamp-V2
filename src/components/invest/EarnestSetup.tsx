'use client';

import { useState } from 'react';
import { type Property, formatPrice } from '@/lib/propertyData';

interface EarnestSetupProps {
  property: Property;
  onProcess: () => void;
  onBack: () => void;
}

const EARNEST_OPTIONS = [
  { label: '10%', multiplier: 0.1 },
  { label: '25%', multiplier: 0.25 },
  { label: '50%', multiplier: 0.5 },
];

const UPI_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z]{2,}$/;

export function EarnestSetup({ property, onProcess, onBack }: EarnestSetupProps) {
  const [selectedPercent, setSelectedPercent] = useState(0.1);
  const [upiId, setUpiId] = useState('');
  const [touched, setTouched] = useState(false);
  const [tcAccepted, setTcAccepted] = useState(false);

  const earnestAmount = Math.round(property.priceMinInr * selectedPercent);
  const remainingAmount = property.priceMinInr - earnestAmount;
  const monthlyAmount = Math.round(remainingAmount / 6);

  const isValid = UPI_REGEX.test(upiId);
  const showError = touched && upiId.length > 0 && !isValid;
  const canSubmit = isValid && tcAccepted;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onProcess();
  };

  return (
    <form onSubmit={handleSubmit} className="kyc-stage-enter">
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-text-secondary text-sm mb-6
                   transition-colors duration-200 hover:text-gold"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to options
      </button>

      {/* Amount Display */}
      <div className="invest-amount-card">
        <p className="invest-amount-label">Total Investment</p>
        <p className="invest-amount-value">{formatPrice(property.priceMinInr)}</p>
      </div>

      {/* Earnest Amount Selector */}
      <div className="mb-6">
        <label className="block text-text-primary text-sm font-medium mb-3">
          Select Earnest Deposit
        </label>
        <div className="earnest-chip-group">
          {EARNEST_OPTIONS.map(opt => (
            <button
              key={opt.label}
              type="button"
              className={`earnest-chip ${selectedPercent === opt.multiplier ? 'active' : ''}`}
              onClick={() => setSelectedPercent(opt.multiplier)}
            >
              <span className="block text-sm font-semibold">{opt.label}</span>
              <span className="block text-xs mt-0.5 opacity-70">
                {formatPrice(Math.round(property.priceMinInr * opt.multiplier))}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mandate Details */}
      <div className="mandate-card">
        <h4>Mandate Details</h4>
        <div className="mandate-row">
          <span>Earnest Deposit</span>
          <span>{formatPrice(earnestAmount)}</span>
        </div>
        <div className="mandate-row">
          <span>Monthly Debit</span>
          <span>{formatPrice(monthlyAmount)}</span>
        </div>
        <div className="mandate-row">
          <span>Duration</span>
          <span>6 months</span>
        </div>
        <div className="mandate-row">
          <span>Start Date</span>
          <span>Immediate</span>
        </div>
      </div>

      {/* UPI ID Input */}
      <div className="mb-6">
        <label htmlFor="upi-earnest" className="block text-text-primary text-sm font-medium mb-2">
          UPI ID for Mandate
        </label>
        <input
          id="upi-earnest"
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="yourname@bank"
          className={`input-premium ${showError ? 'error' : ''} ${isValid && touched ? 'valid' : ''}`}
          autoComplete="off"
          inputMode="text"
          aria-describedby="earnest-upi-hint"
          aria-invalid={showError}
        />
        <p id="earnest-upi-hint" className="text-text-muted text-xs mt-2">
          {showError
            ? 'Please enter a valid UPI ID (e.g. yourname@okicici)'
            : 'This UPI ID will be used for recurring mandates'
          }
        </p>
      </div>

      {/* Terms & Conditions */}
      <label className="invest-tc-label" htmlFor="tc-checkbox">
        <input
          id="tc-checkbox"
          type="checkbox"
          className="invest-tc-checkbox"
          checked={tcAccepted}
          onChange={(e) => setTcAccepted(e.target.checked)}
        />
        <span className="invest-tc-text">
          I agree to the Terms &amp; Conditions. I understand that fractional ownership
          is only retained once the entire payment is completed. Early termination may
          result in forfeiture of the earnest deposit. The UPI mandate will auto-debit
          the specified amount monthly until the full investment is secured.
        </span>
      </label>

      {/* Payment Summary */}
      <div className="invest-summary">
        <div className="invest-summary-row">
          <span>Earnest Deposit (Today)</span>
          <span>{formatPrice(earnestAmount)}</span>
        </div>
        <div className="invest-summary-row">
          <span>Remaining via Mandate</span>
          <span>{formatPrice(remainingAmount)}</span>
        </div>
        <div className="invest-summary-row">
          <span>Processing Fee</span>
          <span className="text-success">NIL</span>
        </div>
        <div className="invest-summary-row invest-summary-total">
          <span>Due Today</span>
          <span>{formatPrice(earnestAmount)}</span>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="invest-trust-row">
        <div className="invest-trust-item">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>256-bit Encrypted</span>
        </div>
        <div className="invest-trust-item">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>RBI Regulated</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn-primary"
        disabled={!canSubmit}
      >
        Set Up Mandate &amp; Pay {formatPrice(earnestAmount)}
      </button>

      <p className="text-text-muted text-xs text-center mt-4">
        You&apos;ll be redirected to your UPI app to authorise the mandate
      </p>
    </form>
  );
}
