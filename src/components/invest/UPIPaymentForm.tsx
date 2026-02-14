'use client';

import { useState } from 'react';
import { type Property, formatPrice } from '@/lib/propertyData';

interface UPIPaymentFormProps {
  property: Property;
  onProcess: () => void;
  onBack: () => void;
}

const UPI_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z]{2,}$/;

export function UPIPaymentForm({ property, onProcess, onBack }: UPIPaymentFormProps) {
  const [upiId, setUpiId] = useState('');
  const [touched, setTouched] = useState(false);

  const isValid = UPI_REGEX.test(upiId);
  const showError = touched && upiId.length > 0 && !isValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
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
        <p className="invest-amount-label">Investment Amount</p>
        <p className="invest-amount-value">{formatPrice(property.priceMinInr)}</p>
      </div>

      {/* UPI ID Input */}
      <div className="mb-6">
        <label htmlFor="upi-id" className="block text-text-primary text-sm font-medium mb-2">
          UPI ID
        </label>
        <input
          id="upi-id"
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="yourname@bank"
          className={`input-premium ${showError ? 'error' : ''} ${isValid && touched ? 'valid' : ''}`}
          autoComplete="off"
          inputMode="text"
          aria-describedby="upi-hint"
          aria-invalid={showError}
        />
        <p id="upi-hint" className="text-text-muted text-xs mt-2">
          {showError
            ? 'Please enter a valid UPI ID (e.g. yourname@okicici)'
            : 'Example: yourname@okicici, name@paytm, user@ybl'
          }
        </p>
      </div>

      {/* Payment Summary */}
      <div className="invest-summary">
        <div className="invest-summary-row">
          <span>Payment Method</span>
          <span>UPI &mdash; Single Transaction</span>
        </div>
        <div className="invest-summary-row">
          <span>Processing Fee</span>
          <span className="text-success">NIL</span>
        </div>
        <div className="invest-summary-row invest-summary-total">
          <span>Total Payable</span>
          <span>{formatPrice(property.priceMinInr)}</span>
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

      {/* Pay Button */}
      <button
        type="submit"
        className="btn-primary"
        disabled={!isValid}
      >
        Pay {formatPrice(property.priceMinInr)}
      </button>

      <p className="text-text-muted text-xs text-center mt-4">
        You&apos;ll be redirected to your UPI app to complete payment
      </p>
    </form>
  );
}
