# Blueprint OTU — Website

Built with React + TypeScript + Framer Motion + Vite.
Fonts: Clash Display + Syne + DM Mono via Google Fonts.

## Quick start

```bash
npm install
npm run dev
```
Open http://localhost:5173

## Deploy
```bash
npm run build
npx vercel
```

## What's in here

```
src/
├── components/
│   ├── Cursor.tsx        ← Velocity-based ink-drag cursor
│   ├── Loader.tsx        ← Full-screen session loader
│   ├── Nav.tsx           ← Logo + Apply + full-screen overlay menu
│   ├── PageWipe.tsx      ← Blue curtain page transition
│   ├── WordStagger.tsx   ← Word-by-word reveal animation
│   ├── Reveal.tsx        ← Scroll-triggered fade-up
│   ├── LineReveal.tsx    ← Horizontal rule draws on scroll
│   ├── TiltCard.tsx      ← Magnetic 3D tilt on cursor
│   ├── Ticker.tsx        ← Infinite scroll strip
│   ├── StatusDot.tsx     ← Live / Active / Planned
│   ├── Eyebrow.tsx       ← Section label
│   └── ThemeToggle.tsx   ← Dark / light switch
├── pages/
│   ├── Home.tsx          ← Bleeding headline, parallax grid, stat band
│   ├── About.tsx         ← Origin story, values, impact
│   ├── Projects.tsx      ← Featured + editorial list, mixed widths
│   ├── Events.tsx        ← Newspaper-style dated list
│   ├── Team.tsx          ← Irregular grid, tilt cards, faculty
│   ├── Apply.tsx         ← Role selector, underline-only form
│   └── Sponsors.tsx      ← Horizontal tier spread
├── App.tsx               ← Root: routing, nav, footer, theme
├── tokens.ts             ← Colours, fonts, easing
├── data.ts               ← All content — edit here
├── hooks.ts              ← useInView, useCountUp, useTheme, useScrollY
└── types.ts              ← TypeScript interfaces
```

## To customise
All content lives in `src/data.ts`.
All design tokens live in `src/tokens.ts`.
