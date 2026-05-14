export const C = {
  dark:        '#0D0D0D',
  darkSurface: '#1A1A1A',
  darkCard:    '#242424',
  darkBorder:  'rgba(255,255,255,0.09)',
  darkText:    '#F5F5F5',
  darkMuted:   'rgba(245,245,245,0.62)',
  darkFaint:   'rgba(245,245,245,0.32)',

  light:       '#F8F7F4',
  lightSurface:'#FFFFFF',
  lightCard:   '#F0EEE9',
  lightBorder: 'rgba(17,17,17,0.1)',
  lightText:   '#111111',
  lightMuted:  'rgba(17,17,17,0.62)',
  lightFaint:  'rgba(17,17,17,0.35)',

  blue:        '#1A56F0',
  blueMid:     '#2D6BFF',
  blueLight:   '#5B8FFF',
  blueDim:     'rgba(26,86,240,0.1)',
  blueBorder:  'rgba(26,86,240,0.3)',
} as const

export const F = {
  clash: "'Clash Display', sans-serif",
  syne:  "'Syne', sans-serif",
  mono:  "'DM Mono', monospace",
} as const

export const E = {
  enter: 'cubic-bezier(0.16, 1, 0.3, 1)',
  exit:  'cubic-bezier(0.76, 0, 0.24, 1)',
  soft:  'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
} as const

export const R = '10px'

// Theme-aware helpers
export function th(theme: 'dark'|'light') {
  const dark = theme === 'dark'
  return {
    bg:     dark ? C.dark        : C.light,
    surf:   dark ? C.darkSurface : C.lightSurface,
    card:   dark ? C.darkCard    : C.lightCard,
    bord:   dark ? C.darkBorder  : C.lightBorder,
    fg:     dark ? C.darkText    : C.lightText,
    fg2:    dark ? C.darkMuted   : C.lightMuted,
    fg3:    dark ? C.darkFaint   : C.lightFaint,
  }
}
