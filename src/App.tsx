import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Nav from './components/Nav'
import PageWipe from './components/PageWipe'
import { useTheme } from './hooks'
import { C, F, th } from './tokens'
import type { Theme } from './types'

import Home        from './pages/Home'
import About       from './pages/About'
import Projects    from './pages/Projects'
import Events      from './pages/Events'
import Team        from './pages/Team'
import Apply       from './pages/Apply'
import Sponsors    from './pages/Sponsors'
import Nonprofits  from './pages/Nonprofits'
import Social      from './pages/Social'
import Unsubscribe from './pages/Unsubscribe'
import Welcome from './pages/Welcome'

const NAV_LINKS = [
  { path: '/',           label: 'Home'       },
  { path: '/about',      label: 'About'      },
  { path: '/projects',   label: 'Projects'   },
  { path: '/events',     label: 'Events'     },
  { path: '/team',       label: 'Team'       },
  { path: '/nonprofits', label: 'Nonprofits' },
  { path: '/sponsors',   label: 'Sponsors'   },
  { path: '/apply',      label: 'Apply'      },
  { path: '/social',     label: 'Social'     },
]

function IgIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill={color} stroke="none" />
    </svg>
  )
}

function LiIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function DiscordIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.031.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

function GhIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function FooterWordmark({ theme }: { theme: Theme }) {
  const t = th(theme)
  const blueSet = new Set(['n', 'u'])
  const word = 'blueprint otu'
  return (
    <div style={{
      fontFamily: F.clash, fontWeight: 700,
      fontSize: 'clamp(3.5rem, 11vw, 12rem)',
      lineHeight: 0.88, letterSpacing: '-0.05em',
      userSelect: 'none', display: 'block',
      overflow: 'hidden', whiteSpace: 'nowrap',
    }}>
      {word.split('').map((char, i) => (
        <span key={i} style={{
          color: char === ' ' ? 'transparent' : blueSet.has(char) ? C.blue : t.fg,
          display: 'inline-block',
          width: char === ' ' ? '0.3em' : 'auto',
        }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppInner() {
  const [loaded, setLoaded] = useState(false)
  const { theme, toggle }   = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const t = th(theme)

  function linkHoverOn(e: React.MouseEvent<HTMLAnchorElement>)  { e.currentTarget.style.color = C.blue }
  function linkHoverOff(e: React.MouseEvent<HTMLAnchorElement>) { e.currentTarget.style.color = t.fg2  }

  const linkStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 10,
    textDecoration: 'none', color: t.fg2, transition: 'color 0.2s',
  }

  return (
    <>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 800, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.025'/%3E%3C/svg%3E")`,
        opacity: 0.6,
      }} />

      <style>{`
        @keyframes pulse { 0%,100% { opacity:.4 } 50% { opacity:1 } }

        @media (max-width: 768px) {
          body { overflow-x: hidden; }
          section { padding-left: 24px !important; padding-right: 24px !important; }
          [style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
          footer > div:first-child { grid-template-columns: 1fr !important; padding: 40px 24px !important; }
          footer [style*="clamp"] { font-size: clamp(2.4rem, 12vw, 5rem) !important; white-space: normal !important; }
          [style*="padding: '18px 52px'"] { padding: 18px 20px !important; }
          [style*="padding: '32px 52px'"] { padding: 24px 20px !important; }
          [style*="padding: '24px 52px'"] { padding: 24px 20px !important; }
          [style*="padding: '16px 52px'"] { padding: 16px 20px !important; }
          [style*="left: 52px"] { left: 16px !important; }
          [style*="white-space: nowrap"] { white-space: normal !important; overflow: visible !important; }
          [style*="display: flex"][style*="gap: 12"] { flex-wrap: wrap !important; }
          [style*="margin: 0 52px"] { margin: 0 20px !important; }
          [style*="padding: 0 52px"] { padding: 0 20px !important; }
          nav { padding: 0 20px !important; }
        }

        @media (max-width: 480px) {
          section { padding-left: 16px !important; padding-right: 16px !important; }
          [style*="padding: 0 52px"] { padding: 0 16px !important; }
          [style*="margin: 0 52px"] { margin: 0 16px !important; }
        }
      `}</style>

      <Cursor />
      <Loader onDone={() => setLoaded(true)} />

      {loaded && (
        <>
          <Nav
            navLinks={NAV_LINKS}
            currentPath={location.pathname}
            theme={theme}
            toggle={toggle}
          />

          <main style={{ paddingTop: 58, minHeight: '100vh', background: t.bg, transition: 'background 0.45s' }}>
            <PageWipe pageKey={location.pathname}>
              <Routes>
                <Route path="/"            element={<Home        theme={theme} />} />
                <Route path="/about"       element={<About       theme={theme} />} />
                <Route path="/projects"    element={<Projects    theme={theme} />} />
                <Route path="/events"      element={<Events      theme={theme} />} />
                <Route path="/team"        element={<Team        theme={theme} />} />
                <Route path="/apply"       element={<Apply       theme={theme} />} />
                <Route path="/sponsors"    element={<Sponsors    theme={theme} />} />
                <Route path="/nonprofits"  element={<Nonprofits  theme={theme} />} />
                <Route path="/social"      element={<Social      theme={theme} />} />
                <Route path="/unsubscribe" element={<Unsubscribe theme={theme} />} />
                <Route path="*"            element={<Home        theme={theme} />} />
                <Route path="/welcome" element={<Welcome theme={theme} />} />
              </Routes>
            </PageWipe>
          </main>

          <footer style={{ background: t.bg, transition: 'background 0.45s', borderTop: `1px solid ${t.bord}` }}>
            <div style={{ padding: '52px 52px 32px', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 40 }}>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <img src="/logo.webp" alt="Blueprint OTU" style={{ width: 28, height: 28, objectFit: 'contain' }} />
                  <span style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: t.fg }}>Blueprint OTU</span>
                </div>
                <p style={{ fontFamily: F.mono, fontSize: '0.72rem', color: t.fg2, lineHeight: 1.7, fontWeight: 400, maxWidth: 220 }}>
                  Building free software for Durham Region nonprofits. Ontario Tech University.
                </p>
              </div>

              <div>
                <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: t.fg3, marginBottom: 14 }}>Pages</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 16px' }}>
                  {NAV_LINKS.map(n => (
                    <button key={n.path} onClick={() => navigate(n.path)}
                      style={{ background: 'none', border: 'none', fontFamily: F.mono, fontSize: '0.7rem', fontWeight: 400, color: t.fg2, textAlign: 'left', padding: '2px 0', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.blue}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = t.fg2}>
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: t.fg3, marginBottom: 14 }}>Follow us</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <a href="https://www.instagram.com/otublueprint/" target="_blank" rel="noreferrer" style={linkStyle} onMouseEnter={linkHoverOn} onMouseLeave={linkHoverOff}>
                    <IgIcon size={15} color="currentColor" />
                    <span style={{ fontFamily: F.mono, fontSize: '0.72rem', fontWeight: 400 }}>@otublueprint</span>
                  </a>
                  <a href="https://www.linkedin.com/company/otu-blueprint/" target="_blank" rel="noreferrer" style={linkStyle} onMouseEnter={linkHoverOn} onMouseLeave={linkHoverOff}>
                    <LiIcon size={15} color="currentColor" />
                    <span style={{ fontFamily: F.mono, fontSize: '0.72rem', fontWeight: 400 }}>Blueprint OTU</span>
                  </a>
                  <a href="https://discord.gg/U2qeUHqR" target="_blank" rel="noreferrer" style={linkStyle} onMouseEnter={linkHoverOn} onMouseLeave={linkHoverOff}>
                    <DiscordIcon size={15} color="currentColor" />
                    <span style={{ fontFamily: F.mono, fontSize: '0.72rem', fontWeight: 400 }}>Join our Discord</span>
                  </a>
                  <a href="https://github.com/OTUBlueprint" target="_blank" rel="noreferrer" style={linkStyle} onMouseEnter={linkHoverOn} onMouseLeave={linkHoverOff}>
                    <GhIcon size={15} color="currentColor" />
                    <span style={{ fontFamily: F.mono, fontSize: '0.72rem', fontWeight: 400 }}>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            <div style={{ padding: '0 40px', overflow: 'hidden' }}>
              <FooterWordmark theme={theme} />
            </div>

            <div style={{ padding: '12px 52px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, borderTop: `1px solid ${t.bord}`, marginTop: 8 }}>
              <div style={{ fontFamily: F.mono, fontSize: '0.62rem', color: t.fg3, fontWeight: 400 }}>
                Ontario Tech University · Oshawa, ON · 2026
              </div>
              <div style={{ fontFamily: F.mono, fontSize: '0.62rem', color: t.fg3, fontWeight: 400 }}>
                Applications open May 20 · Close July 1
              </div>
            </div>
          </footer>
        </>
      )}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppInner />
    </BrowserRouter>
  )
}