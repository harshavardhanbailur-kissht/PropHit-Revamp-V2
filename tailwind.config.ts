import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'bg-primary': '#0a0a0a',
        'bg-secondary': '#0f0f0f',
        'bg-card': '#141414',
        'bg-elevated': '#1a1a1a',

        // Brand Gold (from logo)
        'gold': '#C9A962',
        'gold-dark': '#A68A4B',
        'gold-light': '#D4B872',

        // Text
        'text-primary': '#ffffff',
        'text-secondary': '#b3b3b3',
        'text-muted': '#666666',

        // Semantic
        'success': '#22c55e',
        'error': '#ef4444',

        // Borders
        'border-subtle': 'rgba(255, 255, 255, 0.08)',
        'border-gold': 'rgba(201, 169, 98, 0.3)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero': ['clamp(2rem, 5vw, 3rem)', { lineHeight: '1.1', fontWeight: '600' }],
        'title': ['1.5rem', { lineHeight: '1.3', fontWeight: '500' }],
        'body': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(201, 169, 98, 0.15)',
        'gold-glow-lg': '0 0 40px rgba(201, 169, 98, 0.2)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'shake': 'shake 0.4s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-in',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
