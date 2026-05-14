import { useState } from 'react'
import { motion } from 'framer-motion'
import { C, F, th } from '../tokens'
import WordStagger from '../components/WordStagger'
import Reveal from '../components/Reveal'
import LineReveal from '../components/LineReveal'
import Eyebrow from '../components/Eyebrow'

interface Props { theme: 'dark'|'light' }

const TIERS = [
  { tier: 'Gold Partner',   color: '#F5A623', perks: ['Premier logo placement on website and all events', 'Speaking slot at Tech for Good Panel', 'Dedicated recruiting table at Hack for Impact', 'Access to member resume book', 'Social media spotlight three times per semester'] },
  { tier: 'Silver Partner', color: '#94a3b8', perks: ['Logo on website and all event materials', 'Recruiting table at Hack for Impact', 'Social media mention twice per semester', 'Access to member resume book'] },
  { tier: 'Bronze Partner', color: '#cd7c4c', perks: ['Logo on website', 'Social media mention once per semester', 'Invitation to NPO Showcase Night'] },
]

const INTEREST_OPTIONS = ['General Inquiry', 'Event Sponsorship', 'Project Sponsorship', 'Become a Partner']

export default function Sponsors({ theme }: Props) {
  const [interest, setInterest] = useState(INTEREST_OPTIONS[3])
  const [sent, setSent] = useState(false)
  const t = th(theme)
  const dark = theme === 'dark'
  const fBord = dark ? 'rgba(245,245,245,0.12)' : 'rgba(17,17,17,0.13)'

  return (
    <div style={{ padding: '100px 52px 80px' }}>
      <Reveal><Eyebrow dark={dark}>sponsors and partners</Eyebrow></Reveal>
      <Reveal delay={60}>
        <WordStagger text="Support tech for good." style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(2.2rem,4.5vw,4rem)', lineHeight: 1.0, letterSpacing: '-0.035em', color: t.fg, marginBottom: 16 }} />
      </Reveal>
      <Reveal delay={120}>
        <p style={{ fontFamily: F.mono, fontSize: '0.88rem', color: t.fg2, lineHeight: 1.84, maxWidth: 520, marginBottom: 52, fontWeight: 400 }}>
          Blueprint OTU sponsorships connect your company with Ontario Tech's strongest students while making real, measurable impact in Durham Region.
        </p>
      </Reveal>

      <LineReveal color={t.bord} />

      {/* Tier cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 0.85fr', gap: 2, marginBottom: 72, marginTop: 1 }}>
        {TIERS.map(({ tier, color, perks }, i) => (
          <Reveal key={tier} delay={i * 60}>
            <motion.div whileHover={{ y: -4 }} style={{ background: t.surf, border: `1px solid ${t.bord}`, borderRadius: 12, padding: 28, position: 'relative', overflow: 'hidden', transition: 'border-color 0.25s' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: color, borderRadius: '12px 12px 0 0' }} />
              <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color, marginBottom: 16, marginTop: 4 }}>{tier}</div>
              {perks.map(p => (
                <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontFamily: F.mono, fontSize: '0.74rem', color: t.fg2, marginBottom: 8, lineHeight: 1.55, fontWeight: 400 }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 6 }} />{p}
                </div>
              ))}
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* Sponsor form + why */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48, alignItems: 'start' }}>
        <Reveal>
          <div>
            <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '1.4rem', color: t.fg, marginBottom: 16, lineHeight: 1.1 }}>Why partner with us?</div>
            {[
              ['Access top students', 'Blueprint OTU connects you directly with Ontario Tech\'s most driven CS and software engineering students before they graduate.'],
              ['Real community impact', 'Your sponsorship funds software that Durham Region nonprofits actually use. Your brand is attached to something that matters.'],
              ['Long-term relationship', 'We are building something that lasts. Founding sponsors get preferred access and recognition every year going forward.'],
            ].map(([title, body]) => (
              <div key={String(title)} style={{ marginBottom: 22 }}>
                <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.88rem', color: t.fg, marginBottom: 5 }}>{title}</div>
                <p style={{ fontFamily: F.mono, fontSize: '0.76rem', color: t.fg2, lineHeight: 1.65, fontWeight: 400 }}>{body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '60px 24px', background: t.surf, borderRadius: 12, border: `1px solid ${t.bord}` }}>
              <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: '2.2rem', color: C.blue, marginBottom: 16, letterSpacing: '-0.03em' }}>Received.</div>
              <p style={{ fontFamily: F.mono, fontSize: '0.82rem', color: t.fg2, lineHeight: 1.8, fontWeight: 400, marginBottom: 24 }}>Thank you for reaching out. We will be in touch within 3 business days.</p>
              <button onClick={() => setSent(false)} style={{ fontFamily: F.mono, fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', background: 'transparent', color: t.fg2, padding: '9px 20px', borderRadius: 10, border: `1px solid ${t.bord}` }}>Submit another</button>
            </motion.div>
          ) : (
            <div style={{ background: t.surf, border: `1px solid ${t.bord}`, borderRadius: 12, padding: 36 }}>
              <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '1rem', color: t.fg, marginBottom: 24 }}>Get in touch</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {['Your name', 'Company name'].map(ph => (
                  <input key={ph} placeholder={ph} style={{ display: 'block', width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${fBord}`, color: t.fg, fontFamily: F.mono, fontSize: '0.8rem', fontWeight: 400, padding: '10px 0', outline: 'none', marginBottom: 16 }}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = fBord)} />
                ))}
              </div>
              <input placeholder="Your role or title" style={{ display: 'block', width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${fBord}`, color: t.fg, fontFamily: F.mono, fontSize: '0.8rem', fontWeight: 400, padding: '10px 0', outline: 'none', marginBottom: 20 }}
                onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)}
                onBlur={e => (e.currentTarget.style.borderBottomColor = fBord)} />

              <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: t.fg3, marginBottom: 10 }}>Area of interest</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 20 }}>
                {INTEREST_OPTIONS.map(opt => (
                  <button key={opt} onClick={() => setInterest(opt)} style={{ fontFamily: F.mono, fontSize: '0.6rem', letterSpacing: '0.08em', padding: '5px 12px', borderRadius: 8, border: `1px solid ${interest === opt ? C.blueBorder : t.bord}`, background: interest === opt ? C.blueDim : 'transparent', color: interest === opt ? C.blue : t.fg3, transition: 'all 0.2s' }}>
                    {opt}
                  </button>
                ))}
              </div>

              <textarea placeholder="Tell us about your company and how you would like to partner with Blueprint OTU." rows={4} style={{ display: 'block', width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${fBord}`, color: t.fg, fontFamily: F.mono, fontSize: '0.8rem', fontWeight: 400, padding: '10px 0', outline: 'none', resize: 'none', marginBottom: 24 }}
                onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)}
                onBlur={e => (e.currentTarget.style.borderBottomColor = fBord)} />

              <button onClick={() => setSent(true)} style={{ width: '100%', fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: C.blue, color: '#fff', padding: '13px', borderRadius: 10, border: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.blueMid}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.blue}>
                Send Inquiry
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </div>
  )
}
