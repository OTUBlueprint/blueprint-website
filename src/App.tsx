import { useState, useCallback } from 'react'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Nav from './components/Nav'
import PageWipe from './components/PageWipe'
import Ticker from './components/Ticker'
import ThemeToggle from './components/ThemeToggle'
import { useTheme } from './hooks'
import { C, F, th } from './tokens'
import { NAV_PAGES } from './data'
import type { Page } from './types'

import Home       from './pages/Home'
import About      from './pages/About'
import Projects   from './pages/Projects'
import Events     from './pages/Events'
import Team       from './pages/Team'
import Apply      from './pages/Apply'
import Sponsors   from './pages/Sponsors'
import Nonprofits from './pages/Nonprofits'
import Social     from './pages/Social'

function IgIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill={color} stroke="none" />
    </svg>
  )
}

function LiIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function DiscordIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.031.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

export default function App() {
  const [page, setPage]     = useState<Page>('home')
  const [pageKey, setPK]    = useState(0)
  const [loaded, setLoaded] = useState(false)
  const { theme, toggle }   = useTheme()
  const t    = th(theme)
  const dark = theme === 'dark'

  const go = useCallback((p: Page) => {
    setPage(p)
    setPK(k => k + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const pages: Record<Page, React.ReactElement> = {
    home:       <Home       go={go}  theme={theme} />,
    about:      <About              theme={theme} />,
    projects:   <Projects   go={go}  theme={theme} />,
    events:     <Events             theme={theme} />,
    team:       <Team       go={go}  theme={theme} />,
    apply:      <Apply              theme={theme} />,
    sponsors:   <Sponsors           theme={theme} />,
    nonprofits: <Nonprofits         theme={theme} />,
    social:     <Social             theme={theme} />,
  }

  const linkStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
    color: t.fg2,
    transition: 'color 0.2s',
  }

  function hoverOn(e: React.MouseEvent<HTMLAnchorElement>) {
    e.currentTarget.style.color = C.blue
  }
  function hoverOff(e: React.MouseEvent<HTMLAnchorElement>) {
    e.currentTarget.style.color = t.fg2
  }

  return (
    <>
      {/* Grain overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 800, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.025'/%3E%3C/svg%3E")`,
        opacity: 0.6,
      }} />

      <Cursor />
      <Loader onDone={() => setLoaded(true)} />

      {loaded && (
        <>
          <Nav page={page} go={go} theme={theme} />

          <div style={{ position: 'fixed', bottom: 28, left: 52, zIndex: 500 }}>
            <ThemeToggle theme={theme} toggle={toggle} />
          </div>

          <main style={{ paddingTop: 58, minHeight: '100vh', background: t.bg, transition: 'background 0.45s' }}>
            <PageWipe pageKey={`${page}-${pageKey}`}>
              {pages[page]}
            </PageWipe>
          </main>

          <Ticker dark={dark} />

          <footer style={{
            padding: '52px 52px 36px',
            borderTop: `1px solid ${t.bord}`,
            background: t.bg,
            transition: 'background 0.45s',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 40, marginBottom: 44 }}>

              {/* Brand */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <img src="/logo.webp" alt="Blueprint OTU" style={{ width: 32, height: 32, objectFit: 'contain' }} />
                  <span style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '0.86rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: t.fg }}>
                    Blueprint OTU
                  </span>
                </div>
                <p style={{ fontFamily: F.mono, fontSize: '0.74rem', color: t.fg2, lineHeight: 1.7, fontWeight: 400, maxWidth: 240 }}>
                  Building free software for Durham Region nonprofits. Ontario Tech University.
                </p>
              </div>

              {/* Nav links */}
              <div>
                <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: t.fg3, marginBottom: 14 }}>
                  Pages
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px' }}>
                  {NAV_PAGES.map(n => (
                    <button
                      key={n.key}
                      onClick={() => go(n.key as Page)}
                      style={{ background: 'none', border: 'none', fontFamily: F.mono, fontSize: '0.72rem', fontWeight: 400, letterSpacing: '0.06em', color: t.fg2, textAlign: 'left', padding: '2px 0', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.blue}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = t.fg2}
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div>
                <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: t.fg3, marginBottom: 14 }}>
                  Follow us
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <a href="https://www.instagram.com/otublueprint/" target="_blank" rel="noreferrer" style={linkStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                    <IgIcon size={16} color="currentColor" />
                    <span style={{ fontFamily: F.mono, fontSize: '0.74rem', fontWeight: 400 }}>@otublueprint</span>
                  </a>
                  <a href="https://www.linkedin.com/company/otu-blueprint/" target="_blank" rel="noreferrer" style={linkStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                    <LiIcon size={16} color="currentColor" />
                    <span style={{ fontFamily: F.mono, fontSize: '0.74rem', fontWeight: 400 }}>Blueprint OTU</span>
                  </a>
                  <a href="https://discord.gg/nxRccCVU" target="_blank" rel="noreferrer" style={linkStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                    <DiscordIcon size={16} color="currentColor" />
                    <span style={{ fontFamily: F.mono, fontSize: '0.74rem', fontWeight: 400 }}>Join our Discord</span>
                  </a>
                </div>
                <div style={{ marginTop: 20, fontFamily: F.mono, fontSize: '0.7rem', color: t.fg3, fontWeight: 400 }}>
                  blueprintotech@gmail.com
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: `1px solid ${t.bord}`, paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ fontFamily: F.mono, fontSize: '0.64rem', color: t.fg3, fontWeight: 400 }}>
                Ontario Tech University · Oshawa, ON · 2026
              </div>
              <div style={{ fontFamily: F.mono, fontSize: '0.64rem', color: t.fg3, fontWeight: 400 }}>
                Applications open May 20 · Close July 1
              </div>
            </div>
          </footer>
        </>
      )}
    </>
  )
}