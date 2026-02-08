'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ROUTE_NAMES: Record<string, string> = {
  '/': 'Phone Input',
  '/verify': 'OTP Verification',
  '/personalize': 'Personalization',
  '/dashboard': 'Dashboard',
};

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [mounted, setMounted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
        setFeedback('');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async () => {
    if (!feedback.trim()) return;

    setStatus('submitting');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feedback: feedback.trim(),
          page: pathname,
          pageName: ROUTE_NAMES[pathname] || pathname,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && feedback.trim()) {
      handleSubmit();
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {isOpen && (
        <div
          className="feedback-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="feedback-widget">
        {isOpen && (
          <div className="feedback-card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-white">
                {status === 'success' ? 'Thank you!' : 'Share Feedback'}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="feedback-close"
                aria-label="Close feedback"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {status === 'success' ? (
              <div className="flex flex-col items-center py-4">
                <svg className="w-10 h-10 text-success mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ animation: 'scaleIn 0.2s ease-out' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-text-secondary text-sm">Feedback recorded</p>
              </div>
            ) : (
              <>
                <p className="text-text-muted text-xs mb-3">
                  Page: <span className="text-gold">{ROUTE_NAMES[pathname] || pathname}</span>
                </p>

                <textarea
                  ref={textareaRef}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="What do you think about this page?"
                  maxLength={500}
                  rows={3}
                  className="feedback-textarea"
                  disabled={status === 'submitting'}
                />

                <p className="text-text-muted text-xs mt-1 text-right">
                  {feedback.length}/500
                </p>

                <button
                  onClick={handleSubmit}
                  disabled={!feedback.trim() || status === 'submitting'}
                  className="feedback-submit"
                >
                  {status === 'submitting' ? 'Sending...' :
                   status === 'error' ? 'Retry' :
                   'Submit'}
                </button>

                <p className="text-text-muted text-xs mt-2 text-center">
                  <kbd className="text-text-secondary">Cmd+Enter</kbd> to submit
                </p>
              </>
            )}
          </div>
        )}

        {!isOpen && (
          <button
            onClick={() => { setIsOpen(true); setStatus('idle'); }}
            className="feedback-fab"
            aria-label="Send feedback"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        )}
      </div>
    </>
  );
}
