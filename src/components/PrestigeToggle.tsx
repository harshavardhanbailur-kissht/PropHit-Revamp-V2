"use client";

import { useState, useEffect } from "react";

/**
 * Prestige Mode Toggle
 * Switches between standard and prestige (darker, velvet) themes
 * Persists preference to localStorage
 */
export function PrestigeToggle() {
  const [isPrestige, setIsPrestige] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("prophit-theme");
    if (saved === "prestige") {
      setIsPrestige(true);
      document.documentElement.dataset.theme = "prestige";
    }
  }, []);

  const toggle = () => {
    const next = !isPrestige;
    setIsPrestige(next);
    document.documentElement.dataset.theme = next ? "prestige" : "";
    localStorage.setItem("prophit-theme", next ? "prestige" : "standard");
  };

  // Avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggle}
      className="prestige-toggle"
      aria-label={isPrestige ? "Switch to standard mode" : "Switch to prestige mode"}
      title={isPrestige ? "Standard Mode" : "Prestige Mode"}
    >
      {isPrestige ? (
        // Sun icon for standard mode
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        // Diamond/star icon for prestige mode
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2L9 9H2l5.5 4.5L5 22l7-5 7 5-2.5-8.5L22 9h-7L12 2z" />
        </svg>
      )}
    </button>
  );
}
