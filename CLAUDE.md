# Vibing PropHit - Claude Code Instructions

## Project Overview
- **Type:** Next.js 14 prototype for PropHit (fractional real estate platform)
- **Tech:** React 18, TypeScript, Tailwind CSS 3.4
- **Deploy:** Vercel at https://vibing-prophit.vercel.app
- **Flow:** Phone input (/) → OTP verify (/verify) → Personalize (/personalize) → Dashboard (/dashboard)

## Critical Rules

### Feedback Widget — NEVER REMOVE
The `FeedbackWidget` component in `src/components/FeedbackWidget.tsx` MUST remain in the root `layout.tsx`. It is a persistent floating widget (bottom-left corner) that appears on EVERY page of the app. This is intentional and required.

- **Why:** This is a prototype being shown to stakeholders. The feedback widget lets anyone viewing the demo quickly submit thoughts about any page they're on.
- **Where:** Rendered in `src/app/layout.tsx`, outside `<FlowProvider>`, directly in `<body>`. This ensures it appears on ALL current and future routes automatically.
- **Backend:** Submits to `/api/feedback` → Google Sheets via Apps Script webhook (`GOOGLE_SCRIPT_URL` env var).
- **If adding new pages/routes:** The widget will automatically appear because it's in the root layout. No additional work needed.
- **If creating nested layouts:** Do NOT move the FeedbackWidget into a nested layout. It must stay in the ROOT layout so it covers every page.

### Prestige Mode Toggle
The `PrestigeToggle` component (bottom-right corner) is also in root `layout.tsx` and must persist across all pages. Same rules as FeedbackWidget.

### Luxury UI Elements
These are in `globals.css` under "LUXURY UI ENHANCEMENTS" section:
- Floating gold particles (`.luxury-particles` in layout.tsx)
- Building watermark (`LuxuryWatermark` component in layout.tsx)
- Button pulse-glow (`.btn-primary::before`)
- Premium serif typography (`.heading-luxury` class)
- Prestige mode CSS variables (`:root[data-theme="prestige"]`)

All luxury elements are rendered in root layout and must persist globally.

## Design System
- **Background:** `--bg-primary: #0a0a0a` (near black)
- **Accent:** `--gold: #C9A962` (muted gold)
- **Fonts:** Playfair Display (headings via `.heading-luxury`), Inter (body)
- **Style:** Dark luxury aesthetic with glassmorphism, subtle particles, gold accents
- **Animations:** Respect `prefers-reduced-motion`

## Environment Variables
- `GOOGLE_SCRIPT_URL` — Google Apps Script webhook URL for feedback collection (set in Vercel + `.env.local`)

## File Structure Notes
- `src/app/layout.tsx` — Root layout with ALL global elements (grid bg, noise, particles, watermark, prestige toggle, feedback widget)
- `src/app/api/feedback/route.ts` — Feedback API endpoint
- `src/components/FeedbackWidget.tsx` — Floating feedback FAB + form
- `src/components/PrestigeToggle.tsx` — Theme switcher
- `src/components/LuxuryWatermark.tsx` — SVG building silhouette
- `src/context/FlowContext.tsx` — App state (phone, verification, name)
- `src/app/globals.css` — All design tokens, luxury CSS, feedback widget CSS
