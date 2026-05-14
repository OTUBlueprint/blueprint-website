import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { C, F, th } from '../tokens'
import { useScrollY } from '../hooks'
import { NAV_PAGES } from '../data'
import type { Page } from '../types'

interface Props { page: Page; go: (p: Page) => void; theme: 'dark'|'light' }

export default function Nav({ page, go, theme }: Props) {
  const [open, setOpen]     = useState(false)
  const [hovered, setHover] = useState<string|null>(null)
  const scrollY  = useScrollY()
  const scrolled = scrollY > 60
  const dark = theme === 'dark'
  const t    = th(theme)

  const navBg = scrolled
    ? dark ? 'rgba(13,13,13,0.92)' : 'rgba(248,247,244,0.94)'
    : 'transparent'

  function navigate(p: Page) {
    setOpen(false)
    setHover(null)
    setTimeout(() => go(p), 80)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 600,
          height: 58, display: 'flex', alignItems: 'center',
          padding: '0 48px', justifyContent: 'space-between',
          background: navBg,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid ${t.bord}` : 'none',
          transition: 'background 0.4s, border-color 0.4s',
        }}
      >
        <button onClick={() => navigate('home')} style={{ display:'flex', alignItems:'center', gap:10, background:'none', border:'none' }}>
          <img src="/logo.webp" alt="Blueprint OTU" style={{ width:30, height:30, objectFit:'contain' }} />
          <span style={{ fontFamily:F.syne, fontWeight:800, fontSize:'0.82rem', letterSpacing:'0.08em', textTransform:'uppercase', color:t.fg }}>Blueprint OTU</span>
        </button>

        <div style={{ display:'flex', alignItems:'center', gap:20 }}>
          <button onClick={() => navigate('apply')}
            style={{ fontFamily:F.syne, fontWeight:700, fontSize:'0.7rem', letterSpacing:'0.1em', textTransform:'uppercase', background:C.blue, color:'#fff', padding:'8px 18px', borderRadius:8, border:'none', transition:'background 0.2s, transform 0.15s' }}
            onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background=C.blueMid;el.style.transform='translateY(-1px)'}}
            onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background=C.blue;el.style.transform=''}}>
            Apply
          </button>
          <button onClick={() => setOpen(o => !o)} style={{ background:'none', border:'none', display:'flex', flexDirection:'column', gap:5, padding:4 }} aria-label="Menu">
            <motion.span animate={{ rotate:open?45:0, y:open?7:0 }}   style={{ display:'block', width:22, height:1.5, background:t.fg, transformOrigin:'center' }} />
            <motion.span animate={{ opacity:open?0:1, scaleX:open?0:1 }} style={{ display:'block', width:16, height:1.5, background:t.fg }} />
            <motion.span animate={{ rotate:open?-45:0, y:open?-7:0 }} style={{ display:'block', width:22, height:1.5, background:t.fg, transformOrigin:'center' }} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ clipPath:'inset(0 0 100% 0)' }}
            animate={{ clipPath:'inset(0 0 0% 0)'   }}
            exit={{    clipPath:'inset(0 0 100% 0)'  }}
            transition={{ duration:0.55, ease:[0.76,0,0.24,1] }}
            style={{ position:'fixed', inset:0, zIndex:590, background:C.dark, overflowY:'auto', display:'flex', flexDirection:'column' }}
          >
            {/* Grid texture */}
            <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0, backgroundImage:`repeating-linear-gradient(90deg,rgba(26,86,240,0.04) 0,rgba(26,86,240,0.04) 1px,transparent 1px,transparent 80px),repeating-linear-gradient(0deg,rgba(26,86,240,0.04) 0,rgba(26,86,240,0.04) 1px,transparent 1px,transparent 80px)` }} />

            {/* Nav items */}
            <nav style={{ position:'relative', zIndex:1, padding:'80px 10vw 40px', flex:1 }}>
              {NAV_PAGES.map((n, i) => {
                const isHov      = hovered === n.key
                const otherHov   = hovered !== null && !isHov
                return (
                  <motion.div key={n.key}
                    initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}
                    transition={{ duration:0.4, ease:[0.16,1,0.3,1], delay:i*0.055 }}
                    style={{ display:'flex', alignItems:'baseline', gap:20, marginBottom:2 }}
                  >
                    <span style={{ fontFamily:F.mono, fontSize:'0.6rem', color:'rgba(245,245,245,0.28)', letterSpacing:'0.12em', minWidth:24, transition:'opacity 0.2s', opacity:otherHov?0.15:1 }}>
                      0{i+1}
                    </span>
                    <motion.button
                      onClick={() => navigate(n.key as Page)}
                      onHoverStart={() => setHover(n.key)}
                      onHoverEnd={() => setHover(null)}
                      animate={{ x:isHov?18:0, opacity:otherHov?0.1:1, color:isHov?C.blue:(page===n.key?C.blue:C.darkText) }}
                      transition={{ duration:0.22, ease:[0.16,1,0.3,1] }}
                      style={{ fontFamily:F.clash, fontWeight:700, fontSize:'clamp(2rem,6vw,5.5rem)', lineHeight:1.0, letterSpacing:'-0.03em', color:page===n.key?C.blue:C.darkText, background:'none', border:'none', textAlign:'left', display:'block', padding:'3px 0' }}
                    >
                      {n.label}
                    </motion.button>
                  </motion.div>
                )
              })}
            </nav>

            {/* Social strip */}
            <div style={{ position:'relative', zIndex:1, padding:'0 10vw 40px', display:'flex', gap:24 }}>
              {[
                { label:'Instagram', url:'https://www.instagram.com/otublueprint/' },
                { label:'LinkedIn',  url:'https://www.linkedin.com/company/otu-blueprint/' },
                { label:'Discord',   url:'https://discord.gg/nxRccCVU' },
              ].map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                  style={{ fontFamily:F.mono, fontSize:'0.6rem', letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(245,245,245,0.3)', textDecoration:'none', transition:'color 0.2s' }}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color=C.blue}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='rgba(245,245,245,0.3)'}>
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}