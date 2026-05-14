import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { C, F, th } from '../tokens'
import { OPEN_ROLES, UPCOMING_ROLES, PROCESS_STEPS, FAQ } from '../data'
import WordStagger from '../components/WordStagger'
import Reveal from '../components/Reveal'
import LineReveal from '../components/LineReveal'
import Eyebrow from '../components/Eyebrow'
import StatusDot from '../components/StatusDot'

interface Props { theme: 'dark'|'light' }

type Track = 'member' | 'role'

export default function Apply({ theme }: Props) {
  const [track, setTrack]           = useState<Track>('role')
  const [selectedRole, setRole]     = useState(0)
  const [sent, setSent]             = useState(false)
  const [memberSent, setMemberSent] = useState(false)
  const [openFaq, setFaq]           = useState<number|null>(null)
  const t  = th(theme)
  const dark = theme === 'dark'
  const fb = dark ? 'rgba(245,245,245,0.12)' : 'rgba(17,17,17,0.13)'

  const DEST = 'Chinonye.ekeigwe@ontariotechu.net'

  function submitApp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`Blueprint OTU Application — ${OPEN_ROLES[selectedRole].title}`)
    const body = encodeURIComponent(
      Array.from(data.entries()).map(([k, v]) => `${k}: ${v}`).join('\n')
    )
    const link = document.createElement('a')
    link.href = `mailto:${DEST}?subject=${subject}&body=${body}`
    link.click()
    setSent(true)
  }

  function submitMember(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = encodeURIComponent('Blueprint OTU — General Member Signup')
    const body = encodeURIComponent(
      Array.from(data.entries()).map(([k, v]) => `${k}: ${v}`).join('\n')
    )
    const link = document.createElement('a')
    link.href = `mailto:${DEST}?subject=${subject}&body=${body}`
    link.click()
    setMemberSent(true)
  }

  const inputStyle: React.CSSProperties = {
    display: 'block', width: '100%', background: 'transparent',
    border: 'none', borderBottom: `1px solid ${fb}`,
    color: t.fg, fontFamily: F.mono, fontSize: '0.8rem',
    fontWeight: 400, padding: '10px 0', outline: 'none', marginBottom: 16,
  }

  return (
    <div style={{ padding: '100px 52px 80px' }}>
      <Reveal><Eyebrow dark={dark}>applications open may 20 — july 1</Eyebrow></Reveal>
      <Reveal delay={60}>
        <WordStagger
          text="Join Blueprint OTU."
          style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(2.2rem,4.5vw,4rem)', lineHeight: 1.0, letterSpacing: '-0.035em', color: t.fg, marginBottom: 16 }}
        />
      </Reveal>
      <Reveal delay={120}>
        <p style={{ fontFamily: F.mono, fontSize: '0.88rem', color: t.fg2, lineHeight: 1.84, maxWidth: 480, marginBottom: 52, fontWeight: 400 }}>
          No prior experience required. Applications open May 20th and close July 1st. We recruit again every January.
        </p>
      </Reveal>

      <Reveal delay={160}>
        <div style={{ display: 'flex', gap: 2, marginBottom: 64, background: t.surf, border: `1px solid ${t.bord}`, borderRadius: 12, padding: 4, width: 'fit-content' }}>
          {([
            { key: 'role',   label: 'Apply for a Role',  sub: 'Developers, designers, coordinators and more' },
            { key: 'member', label: 'General Member',    sub: 'Events, merch, and community access' },
          ] as { key: Track; label: string; sub: string }[]).map(opt => (
            <button key={opt.key} onClick={() => setTrack(opt.key)}
              style={{ padding: '14px 24px', borderRadius: 10, border: 'none', background: track === opt.key ? C.blue : 'transparent', transition: 'background 0.25s', textAlign: 'left' }}>
              <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.82rem', color: track === opt.key ? '#fff' : t.fg, marginBottom: 3 }}>{opt.label}</div>
              <div style={{ fontFamily: F.mono, fontSize: '0.65rem', color: track === opt.key ? 'rgba(255,255,255,0.7)' : t.fg3, fontWeight: 400 }}>{opt.sub}</div>
            </button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        {track === 'member' && (
          <motion.div key="member" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}>
            {memberSent ? (
              <div style={{ textAlign: 'center', padding: '72px 0' }}>
                <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(2rem,4vw,3.2rem)', color: C.blue, marginBottom: 16, letterSpacing: '-0.04em' }}>Welcome to Blueprint OTU.</div>
                <p style={{ fontFamily: F.mono, fontSize: '0.86rem', color: t.fg2, lineHeight: 1.84, maxWidth: 400, margin: '0 auto', fontWeight: 400 }}>You will receive an email shortly with next steps. See you at our first event.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48, alignItems: 'start' }}>
                <div>
                  <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '1.3rem', color: t.fg, marginBottom: 20, lineHeight: 1.1 }}>What general members get</div>
                  {[
                    ['Event access','First access to all Blueprint OTU events including workshops, panels, and Hack for Impact.'],
                    ['Merch','Access to Blueprint OTU merchandise drops exclusive to registered members.'],
                    ['Community','Access to our member Discord, announcements, and community updates.'],
                    ['Priority updates','Be the first to know when project applications and paid roles open up.'],
                  ].map(([icon, title, desc]) => (
                    <div key={String(title)} style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
                      <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 2 }}>{icon}</span>
                      <div>
                        <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.84rem', color: t.fg, marginBottom: 4 }}>{title}</div>
                        <p style={{ fontFamily: F.mono, fontSize: '0.74rem', color: t.fg2, lineHeight: 1.65, fontWeight: 400 }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                  <div style={{ padding: '14px 18px', background: C.blueDim, border: `1px solid ${C.blueBorder}`, borderRadius: 10 }}>
                    <div style={{ fontFamily: F.mono, fontSize: '0.68rem', color: t.fg2, fontWeight: 400, lineHeight: 1.6 }}>General membership is free and open to all OTU students. No application required.</div>
                  </div>
                </div>
                <div style={{ background: t.surf, border: `1px solid ${t.bord}`, borderRadius: 12, padding: 36 }}>
                  <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '1rem', color: t.fg, marginBottom: 24 }}>Sign up as a general member</div>
                  <form onSubmit={submitMember}>
                    <input name="Full Name" placeholder="Full name" required style={inputStyle} onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />
                    <input name="Student Number" placeholder="Student number" required style={inputStyle} onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />
                    <input name="Email" type="email" placeholder="your@ontariotechu.net" required style={inputStyle} onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />
                    <input name="Program" placeholder="Program and year (e.g. Software Eng, 2nd Year)" style={inputStyle} onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />
                    <button type="submit" style={{ width: '100%', fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: C.blue, color: '#fff', padding: '13px', borderRadius: 10, border: 'none', marginTop: 8, transition: 'background 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.blueMid} onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.blue}>
                      Join Blueprint OTU
                    </button>
                    <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: t.fg3, textAlign: 'center', marginTop: 10 }}>for OntarioTechU students only · free to join</div>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {track === 'role' && (
          <motion.div key="role" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}>
            <div style={{ marginBottom: 72 }}>
              <div style={{ fontFamily: F.mono, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: t.fg3, marginBottom: 32 }}>How it works</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 28, left: '12.5%', right: '12.5%', height: 1, background: `linear-gradient(90deg, ${C.blue}, ${C.blueLight})` }} />
                {PROCESS_STEPS.map((s, i) => (
                  <div key={s.n} style={{ textAlign: 'center', padding: '0 16px', position: 'relative', zIndex: 1 }}>
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16,1,0.3,1] }}
                      style={{ width: 56, height: 56, borderRadius: '50%', background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontFamily: F.clash, fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>
                      {s.n}
                    </motion.div>
                    <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.88rem', color: t.fg, marginBottom: 8 }}>{s.title}</div>
                    <p style={{ fontFamily: F.mono, fontSize: '0.72rem', color: t.fg2, lineHeight: 1.65, fontWeight: 400 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <LineReveal color={t.bord} />

            {sent ? (
              <div style={{ textAlign: 'center', padding: '72px 0' }}>
                <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(2.2rem,4vw,3.6rem)', color: C.blue, marginBottom: 16, letterSpacing: '-0.04em' }}>Application received.</div>
                <p style={{ fontFamily: F.mono, fontSize: '0.86rem', color: t.fg2, maxWidth: 400, margin: '0 auto 28px', lineHeight: 1.84, fontWeight: 400 }}>Reviewed within 7 days. Decision via your OTU email. We read every one.</p>
                <button onClick={() => setSent(false)} style={{ fontFamily: F.mono, fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', background: 'transparent', color: t.fg2, padding: '10px 22px', borderRadius: 10, border: `1px solid ${t.bord}`, transition: 'border-color 0.2s, color 0.2s' }} onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = C.blue; el.style.color = C.blue }} onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = t.bord; el.style.color = t.fg2 }}>Submit another</button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.55fr', gap: 48, alignItems: 'start', marginTop: 56 }}>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: t.fg3, marginBottom: 16 }}>Open roles — fall 2026</div>
                  {OPEN_ROLES.map((r, i) => (
                    <motion.div key={r.title} onClick={() => setRole(i)} whileHover={{ x: 3 }}
                      style={{ padding: '14px 16px', marginBottom: 5, borderRadius: 10, border: `1px solid ${selectedRole === i ? C.blueBorder : t.bord}`, background: selectedRole === i ? C.blueDim : t.surf, transition: 'all 0.2s', cursor: 'default' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.84rem', color: selectedRole === i ? C.blue : t.fg, marginBottom: 2 }}>{r.title}</div>
                        <span style={{ fontFamily: F.mono, fontSize: '0.58rem', color: selectedRole === i ? C.blue : t.fg3, background: selectedRole === i ? 'rgba(26,86,240,0.15)' : t.card, padding: '2px 8px', borderRadius: 6, whiteSpace: 'nowrap', marginLeft: 8 }}>{r.count}</span>
                      </div>
                      <div style={{ fontFamily: F.mono, fontSize: '0.68rem', color: t.fg2, fontWeight: 400, lineHeight: 1.5 }}>{r.desc.slice(0, 65)}...</div>
                    </motion.div>
                  ))}
                  <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: t.fg3, margin: '28px 0 14px', paddingTop: 20, borderTop: `1px solid ${t.bord}` }}>Coming soon</div>
                  {UPCOMING_ROLES.map(r => (
                    <div key={r.title} style={{ padding: '10px 16px', marginBottom: 4, borderRadius: 10, border: `1.5px dashed ${t.bord}`, opacity: 0.55, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.78rem', color: t.fg }}>{r.title}</div>
                      <span style={{ fontFamily: F.mono, fontSize: '0.55rem', color: t.fg3, background: t.card, padding: '2px 7px', borderRadius: 6 }}>Soon</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: t.surf, border: `1px solid ${t.bord}`, borderRadius: 12, padding: 36 }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={selectedRole} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '1.1rem', color: t.fg, marginBottom: 6 }}>Apply: {OPEN_ROLES[selectedRole].title}</div>
                        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                          {OPEN_ROLES[selectedRole].skills.map(s => (
                            <span key={s} style={{ fontFamily: F.mono, fontSize: '0.6rem', padding: '3px 9px', borderRadius: 6, background: C.blueDim, border: `1px solid ${C.blueBorder}`, color: C.blue }}>{s}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <form onSubmit={submitApp}>
                    <input name="Role" type="hidden" value={OPEN_ROLES[selectedRole].title} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <input name="Full Name" placeholder="Full name" required style={inputStyle} onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />
                      <input name="OTU Email" type="email" placeholder="your@ontariotechu.net" required style={inputStyle} onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />
                    </div>
                    <input name="Program and Year" placeholder="Program and year (e.g. Software Eng, 2nd Year)" required style={inputStyle} onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />
                    <input name="LinkedIn or GitHub" placeholder="LinkedIn or GitHub (optional)" style={inputStyle} onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />
                    <textarea name="Why Blueprint" rows={3} placeholder="Why do you want to join Blueprint OTU? (2 to 3 sentences)" required style={{ ...inputStyle, resize: 'none' }} onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />
                    <textarea name="Experience" rows={3} placeholder="Describe a project or experience that shows how you work." required style={{ ...inputStyle, resize: 'none' }} onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />
                    <textarea name="Tech for Good" rows={3} placeholder="What does technology for social good mean to you?" style={{ ...inputStyle, resize: 'none' }} onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />

                    <div style={{ marginBottom: 20 }}>
                      <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: t.fg3, marginBottom: 8 }}>Resume (optional)</div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 10, border: `1.5px dashed ${t.bord}`, background: t.card, cursor: 'default', transition: 'border-color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = C.blue}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = t.bord}>
                        <span style={{ fontSize: '1.1rem' }}>📎</span>
                        <div>
                          <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.78rem', color: t.fg, marginBottom: 2 }}>Attach your resume</div>
                          <div style={{ fontFamily: F.mono, fontSize: '0.62rem', color: t.fg3, fontWeight: 400 }}>PDF or Word · max 5MB</div>
                        </div>
                        <input name="Resume" type="file" accept=".pdf,.doc,.docx" style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }} />
                      </label>
                    </div>

                    <button type="submit" style={{ width: '100%', fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: C.blue, color: '#fff', padding: '13px', borderRadius: 10, border: 'none', marginTop: 4, transition: 'background 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.blueMid} onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.blue}>
                      Submit Application
                    </button>
                    <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: t.fg3, textAlign: 'center', marginTop: 10 }}>
                      applications open may 20 · close july 1 · reviewed within 7 days
                    </div>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginTop: 96, paddingTop: 56, borderTop: `1px solid ${t.bord}` }}>
        <Reveal><Eyebrow dark={dark}>FAQ</Eyebrow></Reveal>
        <Reveal delay={60}>
          <WordStagger text="Questions we get asked." style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,3rem)', lineHeight: 1.0, letterSpacing: '-0.025em', color: t.fg, marginBottom: 44 }} />
        </Reveal>
        {FAQ.map((item, i) => (
          <Reveal key={i} delay={i * 25}>
            <div style={{ borderBottom: `1px solid ${t.bord}` }}>
              <button onClick={() => setFaq(openFaq === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', background: 'none', border: 'none', textAlign: 'left' }}>
                <span style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.92rem', color: t.fg, lineHeight: 1.4 }}>{item.q}</span>
                <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} style={{ fontFamily: F.mono, fontSize: '1.2rem', color: openFaq === i ? C.blue : t.fg3, flexShrink: 0, marginLeft: 16, lineHeight: 1 }}>+</motion.span>
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
      </div>
    </div>
  )
}