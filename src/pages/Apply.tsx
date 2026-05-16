import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { C, F, th } from '../tokens'
import { TEAMS, ROLE_MAP, PROCESS_STEPS, FAQ } from '../data'
import WordStagger from '../components/WordStagger'
import Reveal from '../components/Reveal'
import LineReveal from '../components/LineReveal'
import Eyebrow from '../components/Eyebrow'
import { subscribeNewsletter } from '../newsletter'

interface Props { theme: 'dark'|'light' }

const DEST = 'Chinonye.ekeigwe@ontariotechu.net'

const NOW = new Date()
const CLOSE_DATE = new Date('2026-07-01T00:00:00')
const IS_OPEN = NOW < CLOSE_DATE
const STATUS_LABEL = IS_OPEN ? 'Open Now' : 'Closed'
const STATUS_COLOR = IS_OPEN ? '#4ade80' : '#f87171'

const TEAM_OPTIONS = [
  { value: 'creative',    label: 'Creative & Media Team'     },
  { value: 'community',   label: 'Community & Outreach Team' },
  { value: 'development', label: 'Development Team'          },
  { value: 'executive',   label: 'Executive Team'            },
]

type View = 'teams' | 'roles' | 'form' | 'submitted'

export default function Apply({ theme }: Props) {
  const t    = th(theme)
  const dark = theme === 'dark'
  const navigate = useNavigate()

  // Navigation state
  const [view, setView]               = useState<View>('teams')
  const [activeTeam, setActiveTeam]   = useState<string | null>(null)
  const [activeRole, setActiveRole]   = useState<string>('')
  const [expandedTeam, setExpanded]   = useState<string | null>(null)

  // Mailing list modal
  const [showMail, setShowMail]       = useState(false)
  const [mailEmail, setMailEmail]     = useState('')
  const [mailName, setMailName]       = useState('')
  const [mailType, setMailType]       = useState<'newsletter'|'careers'>('newsletter')
  const [mailSent, setMailSent]       = useState(false)

  // FAQ
  const [openFaq, setFaq]             = useState<number | null>(null)

  // Form state
  const [secondaryTeam, setSecTeam]   = useState('')
  const [secondaryRole, setSecRole]   = useState('')
  const [commitment, setCommit]       = useState('')
  const [availability, setAvail]      = useState<string[]>([])
  const [hours, setHours]             = useState('')
  const [confirm1, setC1]             = useState(false)
  const [confirm2, setC2]             = useState(false)
  const [confirm3, setC3]             = useState(false)
  const [newsletter, setNews]         = useState(false)
  const [careersNews, setCareers]     = useState(false)

  const fb = dark ? 'rgba(245,245,245,0.12)' : 'rgba(17,17,17,0.13)'

  const IS: React.CSSProperties = {
    display: 'block', width: '100%', background: 'transparent',
    border: 'none', borderBottom: `1px solid ${fb}`,
    color: t.fg, fontFamily: F.mono, fontSize: '0.8rem',
    fontWeight: 400, padding: '10px 0', outline: 'none', marginBottom: 16,
  }

  const SS: React.CSSProperties = {
    ...IS, appearance: 'none', WebkitAppearance: 'none', cursor: 'default',
  }

  function toggleAvail(val: string) {
    setAvail(p => p.includes(val) ? p.filter(v => v !== val) : [...p, val])
  }

  function openTeam(id: string) {
    setActiveTeam(id)
    setExpanded(id)
    setView('roles')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

 function openForm(role: string, teamId?: string) {
  if (teamId) setActiveTeam(teamId)
  setActiveRole(role)
  setView('form')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

  function goBack() {
    if (view === 'form') { setView('roles'); setActiveRole('') }
    else if (view === 'roles') { setView('teams'); setActiveTeam(null); setExpanded(null) }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function resetForm() {
    setSecTeam(''); setSecRole(''); setCommit('')
    setAvail([]); setHours('')
    setC1(false); setC2(false); setC3(false)
    setNews(false); setCareers(false)
  }

  function submitApp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const entries: Record<string, string> = {}
    data.forEach((v, k) => { entries[k] = v as string })
    entries['Team']            = activeTeam || ''
    entries['Role']            = activeRole
    entries['Secondary Team']  = secondaryTeam
    entries['Secondary Role']  = secondaryRole
    entries['Commitment']      = commitment
    entries['Availability']    = availability.join(', ')
    entries['Hours per week']  = hours
    entries['Newsletter']      = newsletter ? 'Yes' : 'No'
    entries['Careers updates'] = careersNews ? 'Yes' : 'No'
    const subject = encodeURIComponent(`Blueprint OTU Application — ${activeRole}`)
    const body    = encodeURIComponent(Object.entries(entries).map(([k, v]) => `${k}: ${v}`).join('\n'))
    const a = document.createElement('a')
    a.href = `mailto:${DEST}?subject=${subject}&body=${body}`
    a.click()
    if (newsletter)  subscribeNewsletter({ email: entries['Ontario Tech Email'] || '', name: entries['Full Name'] || '', type: 'newsletter' })
    if (careersNews) subscribeNewsletter({ email: entries['Ontario Tech Email'] || '', name: entries['Full Name'] || '', type: 'careers' })
    setView('submitted')
    resetForm()
  }

  async function submitMail() {
    if (!mailEmail) return
    await subscribeNewsletter({ email: mailEmail, name: mailName, type: mailType })
    setMailSent(true)
  }

  const currentTeam = TEAMS.find(t => t.id === activeTeam)

  const expColor: Record<string, string> = {
    'Beginner-Friendly':    '#4ade80',
    'Experience Preferred': '#fb923c',
    'Experience Required':  '#f87171',
  }

  const typeAccent: Record<string, string> = {
    Creative:   '#c084fc',
    Outreach:   '#fb923c',
    Technical:  C.blue,
    Leadership: '#f87171',
  }

  // ── BACK BUTTON (fixed, appears when inside a team or form)
  const showBack = view === 'roles' || view === 'form'

  return (
    <div style={{ minHeight: '100vh', background: t.bg }}>

      {/* Fixed back button */}
      <AnimatePresence>
        {showBack && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
            onClick={goBack}
            style={{
              position: 'fixed', top: 70, left: 52, zIndex: 500,
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: F.mono, fontSize: '0.68rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', color: t.fg2,
              background: t.surf, border: `1px solid ${t.bord}`,
              padding: '8px 16px', borderRadius: 20,
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = C.blue; el.style.color = C.blue }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = t.bord; el.style.color = t.fg2 }}
          >
            ← {view === 'form' ? 'Roles' : 'Teams'}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">

        {/* ══════════════════════════════════════════
            VIEW: TEAMS — main landing
        ══════════════════════════════════════════ */}
        {view === 'teams' && (
          <motion.div
            key="teams"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
          >
            {/* Hero */}
            <section style={{ padding: '100px 52px 72px', position: 'relative', overflow: 'hidden' }}>
              <img src="/logo.webp" alt="" style={{ position: 'absolute', bottom: -60, right: -60, width: 480, height: 480, objectFit: 'contain', opacity: 0.05, pointerEvents: 'none' }} />
              <Reveal><Eyebrow dark={dark}>Applications Open · Fall 2026</Eyebrow></Reveal>
              <Reveal delay={60}>
                <WordStagger
                  text="Apply to Blueprint OTU."
                  style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(3.5rem,8vw,8rem)', lineHeight: 0.92, letterSpacing: '-0.04em', color: t.fg, marginBottom: 24, whiteSpace: 'nowrap', overflow: 'visible' }}
                />
              </Reveal>
              <Reveal delay={140}>
                <p style={{ fontFamily: F.mono, fontSize: '0.9rem', color: t.fg2, lineHeight: 1.84, maxWidth: 520, marginBottom: 8, fontWeight: 400 }}>
                  Join the founding team building technology for community impact at Ontario Tech.
                </p>
                <p style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.9rem', color: C.blue, marginBottom: 36 }}>
                  Bring your skills. Build something that matters.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={() => document.getElementById('teams-section')?.scrollIntoView({ behavior: 'smooth' })}
                    style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: C.blue, color: '#fff', padding: '11px 26px', borderRadius: 10, border: 'none', transition: 'background 0.2s, transform 0.15s' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.blueMid; el.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.blue; el.style.transform = '' }}
                  >
                    Browse Teams
                  </button>
                  <button
                    onClick={() => { setMailType('careers'); setShowMail(true) }}
                    style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', color: t.fg2, padding: '11px 26px', borderRadius: 10, border: `1px solid ${t.bord}`, transition: 'border-color 0.2s, color 0.2s' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = C.blue; el.style.color = C.blue }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = t.bord; el.style.color = t.fg2 }}
                  >
                    Join Mailing List
                  </button>
                </div>
              </Reveal>
            </section>

            {/* Process */}
            <section style={{ padding: '0 52px 72px' }}>
              <Reveal><Eyebrow dark={dark}>How it works</Eyebrow></Reveal>
              <Reveal delay={40}>
                <WordStagger text="Five steps to the cohort." style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,3rem)', lineHeight: 1.0, letterSpacing: '-0.025em', color: t.fg, marginBottom: 40 }} />
              </Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 0, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 28, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg,${C.blue},${C.blueLight})` }} />
                {PROCESS_STEPS.map((s, i) => (
                  <Reveal key={s.n} delay={i * 60}>
                    <div style={{ textAlign: 'center', padding: '0 12px', position: 'relative', zIndex: 1 }}>
                      <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16,1,0.3,1] }}
                        style={{ width: 56, height: 56, borderRadius: '50%', background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: F.clash, fontWeight: 700, fontSize: '0.82rem', color: '#fff' }}>
                        {s.n}
                      </motion.div>
                      <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.8rem', color: t.fg, marginBottom: 6 }}>{s.title}</div>
                      <p style={{ fontFamily: F.mono, fontSize: '0.68rem', color: t.fg2, lineHeight: 1.6, fontWeight: 400 }}>{s.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            <LineReveal color={t.bord} />

            {/* Commitment */}
            <section style={{ padding: '64px 52px' }}>
              <Reveal>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, alignItems: 'start' }}>
                  <div>
                    <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(3rem,6vw,5.5rem)', lineHeight: 0.9, letterSpacing: '-0.04em', color: t.fg }}>
                      12<span style={{ color: C.blue }}>+</span>
                    </div>
                    <div style={{ fontFamily: F.mono, fontSize: '0.7rem', color: t.fg3, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 8 }}>hours per week</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '1.1rem', color: t.fg, marginBottom: 12 }}>Time Commitment</div>
                    <p style={{ fontFamily: F.mono, fontSize: '0.82rem', color: t.fg2, lineHeight: 1.78, fontWeight: 400 }}>
                      Blueprint OTU is a high-commitment student organization. All selected members contribute approximately 12 hours per week minimum. This includes meetings, project work, event planning, outreach, content creation, workshops, build nights, and team communication.
                    </p>
                    <p style={{ fontFamily: F.mono, fontSize: '0.82rem', color: t.fg2, lineHeight: 1.78, fontWeight: 400, marginTop: 12 }}>
                      This is not a passive membership. We are looking for students who show up consistently, communicate clearly, and deliver meaningful work every semester.
                    </p>
                  </div>
                </div>
              </Reveal>
            </section>

            <LineReveal color={t.bord} />

            {/* Teams — Shopify-style accordion */}
            <section id="teams-section" style={{ padding: '64px 0 80px' }}>
              <div style={{ padding: '0 52px', marginBottom: 40 }}>
                <Reveal><Eyebrow dark={dark}>Our Teams</Eyebrow></Reveal>
                <Reveal delay={40}>
                  <WordStagger text="Find where you fit." style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 1.0, letterSpacing: '-0.03em', color: t.fg, marginBottom: 12 }} />
                </Reveal>
                <Reveal delay={80}>
                  <p style={{ fontFamily: F.mono, fontSize: '0.82rem', color: t.fg2, lineHeight: 1.7, maxWidth: 480, fontWeight: 400 }}>
                    Click a team to see all open roles and apply directly.
                  </p>
                </Reveal>
              </div>

              {/* Qualification note */}
              <div style={{ padding: '0 52px', marginBottom: 32 }}>
                <Reveal>
                  <div style={{ padding: '14px 18px', borderRadius: 10, background: t.surf, border: `1px solid ${t.bord}`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: C.blue, fontSize: '1rem', flexShrink: 0 }}>ℹ</span>
                    <div>
                      <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.8rem', color: t.fg, marginBottom: 4 }}>Qualifications are guidelines, not requirements.</div>
                      <div style={{ fontFamily: F.mono, fontSize: '0.74rem', color: t.fg2, lineHeight: 1.65, fontWeight: 400 }}>You do not need to meet every bullet to apply. If you have relevant experience or strong motivation to learn, we encourage you to apply.</div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Team rows */}
              <div style={{ borderTop: `1px solid ${t.bord}` }}>
                {TEAMS.map((team, i) => {
                  const isOpen = expandedTeam === team.id
                  const accent = typeAccent[team.type] || C.blue
                  return (
                    <Reveal key={team.id} delay={i * 60}>
                      <div style={{ borderBottom: `1px solid ${t.bord}` }}>

                        {/* Team header row */}
                        <motion.div
                          onClick={() => {
                            if (isOpen) { setExpanded(null) }
                            else { setExpanded(team.id) }
                          }}
                          whileHover={{ x: 6 }}
                          transition={{ duration: 0.2, ease: [0.16,1,0.3,1] }}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr auto auto',
                            alignItems: 'center',
                            gap: 32,
                            padding: '32px 52px',
                            cursor: 'default',
                            borderLeft: isOpen ? `3px solid ${C.blue}` : '3px solid transparent',
                            transition: 'border-color 0.3s',
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                              <span style={{ fontFamily: F.mono, fontSize: '0.58rem', padding: '3px 8px', borderRadius: 5, background: `${accent}18`, color: accent, border: `1px solid ${accent}30`, letterSpacing: '0.08em' }}>
                                {team.type}
                              </span>
                              <span style={{ fontFamily: F.mono, fontSize: '0.58rem', color: '#4ade80', letterSpacing: '0.08em' }}>
                                {team.status}
                              </span>
                            </div>
                            <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(1.6rem,3.5vw,3rem)', lineHeight: 1.0, letterSpacing: '-0.03em', color: isOpen ? C.blue : t.fg, transition: 'color 0.25s' }}>
                              {team.name}
                            </div>
                            <p style={{ fontFamily: F.mono, fontSize: '0.78rem', color: t.fg2, lineHeight: 1.6, fontWeight: 400, marginTop: 8, maxWidth: 520 }}>
                              {team.tagline}
                            </p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: '2rem', color: isOpen ? C.blue : t.fg3, lineHeight: 1, transition: 'color 0.25s' }}>
                              {team.roles.length}
                            </div>
                            <div style={{ fontFamily: F.mono, fontSize: '0.58rem', color: t.fg3, letterSpacing: '0.12em', textTransform: 'uppercase' }}>roles</div>
                          </div>
                          <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.25, ease: [0.16,1,0.3,1] }}
                            style={{ fontSize: '1.4rem', color: isOpen ? C.blue : t.fg3, lineHeight: 1, userSelect: 'none', transition: 'color 0.25s' }}
                          >
                            +
                          </motion.div>
                        </motion.div>

                        {/* Expanded roles */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.45, ease: [0.16,1,0.3,1] }}
                              style={{ overflow: 'hidden' }}
                            >
                              {/* Team info strip */}
                              <div style={{ padding: '0 52px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, borderBottom: `1px solid ${t.bord}` }}>
                                {[['Experience', team.experience], ['Commitment', team.commitment], ['Status', team.status]].map(([k, v]) => (
                                  <div key={k} style={{ background: t.surf, border: `1px solid ${t.bord}`, borderRadius: 8, padding: '10px 14px' }}>
                                    <div style={{ fontFamily: F.mono, fontSize: '0.56rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: t.fg3, marginBottom: 4 }}>{k}</div>
                                    <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.78rem', color: t.fg }}>{v}</div>
                                  </div>
                                ))}
                              </div>

                              {/* Skills */}
                              <div style={{ padding: '16px 52px 20px', borderBottom: `1px solid ${t.bord}` }}>
                                <div style={{ fontFamily: F.mono, fontSize: '0.56rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: t.fg3, marginBottom: 10 }}>Skills we look for</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                                  {team.skills.map(s => (
                                    <span key={s} style={{ fontFamily: F.mono, fontSize: '0.62rem', padding: '3px 9px', borderRadius: 5, background: t.card, border: `1px solid ${t.bord}`, color: t.fg2 }}>{s}</span>
                                  ))}
                                </div>
                              </div>

                              {/* Individual roles */}
                              <div>
                                {team.roles.map((role, ri) => (
                                  <motion.div
                                    key={role}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, ease: [0.16,1,0.3,1], delay: ri * 0.05 }}
                                    style={{ borderBottom: `1px solid ${t.bord}` }}
                                  >
                                    <motion.div
                                      whileHover={{ x: 4, backgroundColor: dark ? 'rgba(26,86,240,0.04)' : 'rgba(26,86,240,0.02)' }}
                                      transition={{ duration: 0.2 }}
                                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 52px', gap: 24 }}
                                    >
                                      <div>
                                        <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '1.1rem', color: t.fg, marginBottom: 4 }}>{role}</div>
                                        <div style={{ fontFamily: F.mono, fontSize: '0.7rem', color: t.fg3 }}>{team.name} · {team.commitment}</div>
                                      </div>
                                      <button
                                        onClick={() => openForm(role, team.id)}
                                        style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: C.blue, color: '#fff', padding: '9px 20px', borderRadius: 8, border: 'none', transition: 'background 0.2s, transform 0.15s', whiteSpace: 'nowrap', flexShrink: 0 }}
                                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.blueMid; el.style.transform = 'translateY(-1px)' }}
                                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.blue; el.style.transform = '' }}
                                      >
                                        Apply →
                                      </button>
                                    </motion.div>
                                  </motion.div>
                                ))}

                                {/* View all roles CTA inside team */}
                                <div style={{ padding: '20px 52px' }}>
                                  <button
                                    onClick={() => openTeam(team.id)}
                                    style={{ fontFamily: F.mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', color: C.blue, padding: '8px 0', border: 'none', borderBottom: `1px solid ${C.blue}`, transition: 'opacity 0.2s' }}
                                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.7'}
                                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                                  >
                                    Learn more about this team →
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </section>

            {/* FAQ */}
            <section style={{ padding: '0 52px 80px', borderTop: `1px solid ${t.bord}`, paddingTop: 64 }}>
              <Reveal><Eyebrow dark={dark}>FAQ</Eyebrow></Reveal>
              <Reveal delay={40}>
                <WordStagger text="Questions we get asked." style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,3rem)', lineHeight: 1.0, letterSpacing: '-0.025em', color: t.fg, marginBottom: 40 }} />
              </Reveal>
              {FAQ.map((item, i) => (
                <Reveal key={i} delay={i * 20}>
                  <div style={{ borderBottom: `1px solid ${t.bord}` }}>
                    <button onClick={() => setFaq(openFaq === i ? null : i)}
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', background: 'none', border: 'none', textAlign: 'left' }}>
                      <span style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.92rem', color: t.fg, lineHeight: 1.4 }}>{item.q}</span>
                      <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} style={{ fontFamily: F.mono, fontSize: '1.2rem', color: openFaq === i ? C.blue : t.fg3, flexShrink: 0, marginLeft: 16 }}>+</motion.span>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }} style={{ overflow: 'hidden' }}>
                          <p style={{ fontFamily: F.mono, fontSize: '0.82rem', color: t.fg2, lineHeight: 1.78, fontWeight: 400, paddingBottom: 18, maxWidth: 640 }}>{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              ))}
            </section>

            {/* Bottom CTA */}
            <section style={{ margin: '0 52px 80px', padding: '48px 40px', borderRadius: 16, background: C.blue, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <img src="/logo.webp" alt="" style={{ position: 'absolute', right: -40, top: '50%', transform: 'translateY(-50%)', width: 200, height: 200, objectFit: 'contain', opacity: 0.08, filter: 'brightness(10)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#fff', marginBottom: 12, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  Ready to build something that matters?
                </div>
                <p style={{ fontFamily: F.mono, fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 28px', fontWeight: 400 }}>
                  Apply to join the founding cohort of Blueprint OTU and help shape Ontario Tech's next major tech-for-good community.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                  <button
                    onClick={() => document.getElementById('teams-section')?.scrollIntoView({ behavior: 'smooth' })}
                    style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: '#fff', color: C.blue, padding: '12px 26px', borderRadius: 10, border: 'none', transition: 'transform 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}
                  >
                    Browse Teams
                  </button>
                  <button
                    onClick={() => { setMailType('newsletter'); setShowMail(true) }}
                    style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', color: '#fff', padding: '12px 26px', borderRadius: 10, border: '1.5px solid rgba(255,255,255,0.4)', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.8)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)'}
                  >
                    Join Mailing List
                  </button>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════
            VIEW: ROLES — team detail page
        ══════════════════════════════════════════ */}
        {view === 'roles' && currentTeam && (
          <motion.div
            key="roles"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: [0.16,1,0.3,1] }}
            style={{ padding: '100px 52px 80px' }}
          >
            {/* Team hero */}
            <div style={{ marginBottom: 56 }}>
              <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: typeAccent[currentTeam.type] || C.blue, marginBottom: 16 }}>
                {currentTeam.type} · {currentTeam.status}
              </div>
              <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(2.8rem,7vw,7rem)', lineHeight: 0.92, letterSpacing: '-0.04em', color: t.fg, marginBottom: 20 }}>
                {currentTeam.name}
              </div>
              <p style={{ fontFamily: F.mono, fontSize: '0.9rem', color: t.fg2, lineHeight: 1.84, maxWidth: 580, fontWeight: 400, marginBottom: 24 }}>
                {currentTeam.what}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,auto)', gap: 8, width: 'fit-content' }}>
                {[['Experience', currentTeam.experience], ['Commitment', currentTeam.commitment], ['Status', currentTeam.status]].map(([k, v]) => (
                  <div key={k} style={{ background: t.surf, border: `1px solid ${t.bord}`, borderRadius: 8, padding: '10px 16px' }}>
                    <div style={{ fontFamily: F.mono, fontSize: '0.56rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: t.fg3, marginBottom: 4 }}>{k}</div>
                    <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.8rem', color: t.fg }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <LineReveal color={t.bord} />

            {/* Skills */}
            <div style={{ margin: '32px 0' }}>
              <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: t.fg3, marginBottom: 12 }}>Skills we look for</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {currentTeam.skills.map(s => (
                  <span key={s} style={{ fontFamily: F.mono, fontSize: '0.68rem', padding: '4px 10px', borderRadius: 6, background: t.surf, border: `1px solid ${t.bord}`, color: t.fg2 }}>{s}</span>
                ))}
              </div>
            </div>

            <LineReveal color={t.bord} />

            {/* Open roles */}
            <div style={{ marginTop: 40 }}>
              <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: t.fg3, marginBottom: 4 }}>
                Open roles — {currentTeam.roles.length} positions
              </div>
              <div style={{ borderTop: `1px solid ${t.bord}`, marginTop: 20 }}>
                {currentTeam.roles.map((role, i) => (
                  <motion.div
                    key={role}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16,1,0.3,1], delay: i * 0.06 }}
                    style={{ borderBottom: `1px solid ${t.bord}` }}
                  >
                    <motion.div
                      whileHover={{ x: 5, backgroundColor: dark ? 'rgba(26,86,240,0.04)' : 'rgba(26,86,240,0.02)' }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', gap: 24 }}
                    >
                      <div>
                        <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(1.1rem,2.5vw,1.6rem)', color: t.fg, marginBottom: 6, letterSpacing: '-0.02em' }}>{role}</div>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                          <span style={{ fontFamily: F.mono, fontSize: '0.62rem', color: t.fg3 }}>{currentTeam.name}</span>
                          <span style={{ width: 3, height: 3, borderRadius: '50%', background: t.fg3, display: 'inline-block' }} />
                          <span style={{ fontFamily: F.mono, fontSize: '0.62rem', color: t.fg3 }}>{currentTeam.commitment}</span>
                          <span style={{ width: 3, height: 3, borderRadius: '50%', background: t.fg3, display: 'inline-block' }} />
                          <span style={{ fontFamily: F.mono, fontSize: '0.62rem', color: '#4ade80' }}>{currentTeam.status}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => openForm(role, currentTeam?.id)}
                        style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: C.blue, color: '#fff', padding: '11px 24px', borderRadius: 9, border: 'none', transition: 'background 0.2s, transform 0.15s', whiteSpace: 'nowrap', flexShrink: 0 }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.blueMid; el.style.transform = 'translateY(-1px)' }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.blue; el.style.transform = '' }}
                      >
                        Apply for this role →
                      </button>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════
            VIEW: FORM — application
        ══════════════════════════════════════════ */}
        {view === 'form' && currentTeam && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.45, ease: [0.16,1,0.3,1] }}
            style={{ padding: '100px 52px 80px' }}
          >
            {/* Form hero */}
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.blue, marginBottom: 12 }}>
                {currentTeam.name}
              </div>
              <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(2.2rem,5vw,5rem)', lineHeight: 0.92, letterSpacing: '-0.04em', color: t.fg, marginBottom: 16 }}>
                {activeRole}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {currentTeam.skills.map(s => (
                  <span key={s} style={{ fontFamily: F.mono, fontSize: '0.6rem', padding: '3px 9px', borderRadius: 5, background: C.blueDim, border: `1px solid ${C.blueBorder}`, color: C.blue }}>{s}</span>
                ))}
              </div>
            </div>

            <LineReveal color={t.bord} />

            <form onSubmit={submitApp} style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>

              {/* Left col */}
              <div>
                <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: t.fg3, marginBottom: 24 }}>Personal Information</div>
                <input name="Full Name"          placeholder="Full name"                          required style={IS} onFocus={e=>(e.currentTarget.style.borderBottomColor=C.blue)} onBlur={e=>(e.currentTarget.style.borderBottomColor=fb)} />
                <input name="Ontario Tech Email" type="email" placeholder="your@ontariotechu.net" required style={IS} onFocus={e=>(e.currentTarget.style.borderBottomColor=C.blue)} onBlur={e=>(e.currentTarget.style.borderBottomColor=fb)} />
                <input name="Program and Year"   placeholder="Program and year"                   required style={IS} onFocus={e=>(e.currentTarget.style.borderBottomColor=C.blue)} onBlur={e=>(e.currentTarget.style.borderBottomColor=fb)} />
                <input name="LinkedIn"           placeholder="LinkedIn URL (optional)"                    style={IS} onFocus={e=>(e.currentTarget.style.borderBottomColor=C.blue)} onBlur={e=>(e.currentTarget.style.borderBottomColor=fb)} />
                <input name="GitHub"             placeholder="GitHub URL (optional)"                      style={IS} onFocus={e=>(e.currentTarget.style.borderBottomColor=C.blue)} onBlur={e=>(e.currentTarget.style.borderBottomColor=fb)} />
                <input name="Portfolio"          placeholder="Portfolio or work link (optional)"          style={IS} onFocus={e=>(e.currentTarget.style.borderBottomColor=C.blue)} onBlur={e=>(e.currentTarget.style.borderBottomColor=fb)} />

                {/* Resume */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: t.fg3, marginBottom: 8 }}>Resume (optional)</div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 10, border: `1.5px dashed ${t.bord}`, background: t.card, transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = C.blue}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = t.bord}>
                    <span style={{ fontSize: '0.9rem' }}>📎</span>
                    <div>
                      <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.78rem', color: t.fg, marginBottom: 2 }}>Attach your resume</div>
                      <div style={{ fontFamily: F.mono, fontSize: '0.62rem', color: t.fg3, fontWeight: 400 }}>PDF or Word · max 5MB</div>
                    </div>
                    <input name="Resume" type="file" accept=".pdf,.doc,.docx" style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }} />
                  </label>
                </div>

                {/* Secondary role */}
                <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: t.fg3, marginBottom: 16 }}>Secondary preference (optional)</div>
                <div style={{ fontFamily: F.mono, fontSize: '0.62rem', color: t.fg3, marginBottom: 10, lineHeight: 1.5 }}>Choose only if open to being considered for another team or role.</div>
                <select value={secondaryTeam} onChange={e => { setSecTeam(e.target.value); setSecRole('') }} style={{ ...SS, background: t.surf }}>
                  <option value="">No secondary team</option>
                  {TEAM_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {secondaryTeam && (
                  <select value={secondaryRole} onChange={e => setSecRole(e.target.value)} style={{ ...SS, background: t.surf }}>
                    <option value="">Select role...</option>
                    {ROLE_MAP[secondaryTeam]?.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                )}
              </div>

              {/* Right col */}
              <div>
                <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: t.fg3, marginBottom: 24 }}>Written Responses</div>
                <textarea name="Why Blueprint" rows={3} placeholder="Why do you want to join Blueprint OTU?" required style={{ ...IS, resize: 'none' }} onFocus={e=>(e.currentTarget.style.borderBottomColor=C.blue)} onBlur={e=>(e.currentTarget.style.borderBottomColor=fb)} />
                <textarea name="Why this role" rows={3} placeholder={`Why are you interested in the ${activeRole} role?`} required style={{ ...IS, resize: 'none' }} onFocus={e=>(e.currentTarget.style.borderBottomColor=C.blue)} onBlur={e=>(e.currentTarget.style.borderBottomColor=fb)} />
                <textarea name="Experience"    rows={3} placeholder="Describe a project, role, or experience that shows how you work." required style={{ ...IS, resize: 'none' }} onFocus={e=>(e.currentTarget.style.borderBottomColor=C.blue)} onBlur={e=>(e.currentTarget.style.borderBottomColor=fb)} />
                <textarea name="Tech for Good" rows={3} placeholder="What does technology for social good mean to you?"             style={{ ...IS, resize: 'none' }} onFocus={e=>(e.currentTarget.style.borderBottomColor=C.blue)} onBlur={e=>(e.currentTarget.style.borderBottomColor=fb)} />

                {/* Commitment */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: F.mono, fontSize: '0.64rem', color: t.fg3, marginBottom: 10 }}>Can you commit to approximately 12 hours per week consistently?</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {['Yes', 'Mostly, with communication around busy periods', "I'm unsure"].map(opt => (
                      <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'default' }}>
                        <input type="radio" name="commitment-radio" value={opt} checked={commitment === opt} onChange={() => setCommit(opt)} style={{ accentColor: C.blue }} />
                        <span style={{ fontFamily: F.mono, fontSize: '0.74rem', color: t.fg, fontWeight: 400 }}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: F.mono, fontSize: '0.64rem', color: t.fg3, marginBottom: 10 }}>Availability</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    {['Weekday mornings','Weekday afternoons','Weekday evenings','Friday evenings','Saturday','Sunday'].map(opt => (
                      <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'default' }}>
                        <input type="checkbox" checked={availability.includes(opt)} onChange={() => toggleAvail(opt)} style={{ accentColor: C.blue }} />
                        <span style={{ fontFamily: F.mono, fontSize: '0.72rem', color: t.fg, fontWeight: 400 }}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Hours */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontFamily: F.mono, fontSize: '0.64rem', color: t.fg3, marginBottom: 10 }}>Hours per week you can commit</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['12 hours/week','12–15 hours/week','15+ hours/week'].map(opt => (
                      <button type="button" key={opt} onClick={() => setHours(opt)}
                        style={{ fontFamily: F.mono, fontSize: '0.64rem', padding: '6px 14px', borderRadius: 8, border: `1px solid ${hours === opt ? C.blue : t.bord}`, background: hours === opt ? C.blueDim : 'transparent', color: hours === opt ? C.blue : t.fg3, transition: 'all 0.2s' }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Confirmation */}
                <div style={{ marginBottom: 20, padding: '16px 18px', background: t.surf, borderRadius: 10, border: `1px solid ${t.bord}` }}>
                  <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: t.fg3, marginBottom: 12 }}>Confirmation</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      [confirm1, setC1, 'I understand Blueprint OTU requires a minimum commitment of approximately 12 hours per week.'],
                      [confirm2, setC2, 'I understand some roles may require an interview, portfolio review, or role-specific follow-up.'],
                      [confirm3, setC3, 'I confirm the information in my application is accurate.'],
                    ].map(([val, setter, label], idx) => (
                      <label key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'default' }}>
                        <input type="checkbox" checked={val as boolean} onChange={e => (setter as React.Dispatch<React.SetStateAction<boolean>>)(e.target.checked)} style={{ accentColor: C.blue, marginTop: 2, flexShrink: 0 }} />
                        <span style={{ fontFamily: F.mono, fontSize: '0.72rem', color: t.fg2, lineHeight: 1.55, fontWeight: 400 }}>{label as string}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div style={{ marginBottom: 24, padding: '14px 18px', background: C.blueDim, borderRadius: 10, border: `1px solid ${C.blueBorder}` }}>
                  <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.blue, marginBottom: 10 }}>Stay Updated</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'default' }}>
                      <input type="checkbox" checked={newsletter} onChange={e => setNews(e.target.checked)} style={{ accentColor: C.blue }} />
                      <span style={{ fontFamily: F.mono, fontSize: '0.72rem', color: t.fg2, fontWeight: 400 }}>Subscribe to Blueprint OTU newsletter for general updates and events</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'default' }}>
                      <input type="checkbox" checked={careersNews} onChange={e => setCareers(e.target.checked)} style={{ accentColor: C.blue }} />
                      <span style={{ fontFamily: F.mono, fontSize: '0.72rem', color: t.fg2, fontWeight: 400 }}>Subscribe to careers updates for new roles and recruitment news</span>
                    </label>
                  </div>
                </div>

                <button type="submit" disabled={!confirm1 || !confirm2 || !confirm3}
                  style={{ width: '100%', fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: confirm1 && confirm2 && confirm3 ? C.blue : t.bord, color: confirm1 && confirm2 && confirm3 ? '#fff' : t.fg3, padding: '14px', borderRadius: 10, border: 'none', transition: 'background 0.2s', marginBottom: 8 }}
                  onMouseEnter={e => { if (confirm1 && confirm2 && confirm3) (e.currentTarget as HTMLElement).style.background = C.blueMid }}
                  onMouseLeave={e => { if (confirm1 && confirm2 && confirm3) (e.currentTarget as HTMLElement).style.background = C.blue }}>
                  Submit Application
                </button>
                <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: t.fg3, textAlign: 'center' }}>
                  All three boxes must be checked before submitting
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════
            VIEW: SUBMITTED — success screen
        ══════════════════════════════════════════ */}
        {view === 'submitted' && (
          <motion.div
            key="submitted"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
            style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 52px', textAlign: 'center' }}
          >
            {/* Green tick */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16,1,0.3,1], delay: 0.1 }}
              style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', border: '2px solid #4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}
            >
              <motion.svg
                width="36" height="36" viewBox="0 0 36 36" fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              >
                <motion.path
                  d="M8 18l7 7 13-13"
                  stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
                />
              </motion.svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.16,1,0.3,1] }}
            >
              <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(2.2rem,5vw,4.5rem)', color: t.fg, marginBottom: 12, letterSpacing: '-0.04em', lineHeight: 1 }}>
                Application received.
              </div>
              <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '1rem', color: C.blue, marginBottom: 20 }}>
                {activeRole || 'Your application'} · {currentTeam?.name || ''}
              </div>
              <p style={{ fontFamily: F.mono, fontSize: '0.86rem', color: t.fg2, maxWidth: 400, margin: '0 auto 36px', lineHeight: 1.84, fontWeight: 400 }}>
                We review every application within 7 days. Some applicants will be invited for a short conversation. You will hear from us via your OTU email.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button
                  onClick={() => { setView('teams'); setActiveTeam(null); setActiveRole('') }}
                  style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: C.blue, color: '#fff', padding: '11px 26px', borderRadius: 10, border: 'none', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.blueMid}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.blue}
                >
                  Browse More Teams
                </button>
                <button
                  onClick={() => navigate('/')}
                  style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', color: t.fg2, padding: '11px 26px', borderRadius: 10, border: `1px solid ${t.bord}`, transition: 'border-color 0.2s, color 0.2s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = C.blue; el.style.color = C.blue }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = t.bord; el.style.color = t.fg2 }}
                >
                  Go Home
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Mailing list modal */}
      <AnimatePresence>
        {showMail && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 900, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
            onClick={() => { setShowMail(false); setMailSent(false) }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
              onClick={e => e.stopPropagation()}
              style={{ background: t.bg, border: `1px solid ${t.bord}`, borderRadius: 16, padding: 36, width: '100%', maxWidth: 440 }}
            >
              {mailSent ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: '2rem', color: C.blue, marginBottom: 12, letterSpacing: '-0.03em' }}>You're in.</div>
                  <p style={{ fontFamily: F.mono, fontSize: '0.8rem', color: t.fg2, lineHeight: 1.7, fontWeight: 400 }}>
                    We will reach out when {mailType === 'careers' ? 'new roles drop' : 'Blueprint OTU updates go live'}.
                  </p>
                  <button onClick={() => { setShowMail(false); setMailSent(false) }}
                    style={{ marginTop: 20, fontFamily: F.mono, fontSize: '0.65rem', color: t.fg3, background: 'none', border: `1px solid ${t.bord}`, borderRadius: 8, padding: '8px 18px' }}>
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '1.2rem', color: t.fg, marginBottom: 6 }}>
                    {mailType === 'careers' ? 'Careers Updates' : 'Join our Mailing List'}
                  </div>
                  <p style={{ fontFamily: F.mono, fontSize: '0.76rem', color: t.fg2, lineHeight: 1.65, fontWeight: 400, marginBottom: 20 }}>
                    {mailType === 'careers' ? 'Get notified when new roles and deadlines drop.' : 'Stay up to date with Blueprint OTU events and news.'}
                  </p>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                    {(['newsletter','careers'] as const).map(type => (
                      <button key={type} onClick={() => setMailType(type)}
                        style={{ fontFamily: F.mono, fontSize: '0.6rem', letterSpacing: '0.08em', padding: '5px 12px', borderRadius: 8, border: `1px solid ${mailType === type ? C.blue : t.bord}`, background: mailType === type ? C.blueDim : 'transparent', color: mailType === type ? C.blue : t.fg3, transition: 'all 0.2s' }}>
                        {type === 'newsletter' ? 'General Updates' : 'Careers & Roles'}
                      </button>
                    ))}
                  </div>
                  <input placeholder="Your name (optional)" value={mailName} onChange={e => setMailName(e.target.value)}
                    style={{ display: 'block', width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${fb}`, color: t.fg, fontFamily: F.mono, fontSize: '0.8rem', fontWeight: 400, padding: '10px 0', outline: 'none', marginBottom: 12, boxSizing: 'border-box' }}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />
                  <input type="email" placeholder="your@email.com" value={mailEmail} onChange={e => setMailEmail(e.target.value)} required
                    style={{ display: 'block', width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${fb}`, color: t.fg, fontFamily: F.mono, fontSize: '0.8rem', fontWeight: 400, padding: '10px 0', outline: 'none', marginBottom: 24, boxSizing: 'border-box' }}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />
                  <button onClick={submitMail}
                    style={{ width: '100%', fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: C.blue, color: '#fff', padding: '13px', borderRadius: 10, border: 'none', transition: 'background 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.blueMid}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.blue}>
                    Subscribe
                  </button>
                  <button onClick={() => setShowMail(false)}
                    style={{ width: '100%', marginTop: 10, fontFamily: F.mono, fontSize: '0.65rem', color: t.fg3, background: 'none', border: 'none' }}>
                    No thanks
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}