import { motion } from 'framer-motion'
import { C, F, th } from '../tokens'
import WordStagger from '../components/WordStagger'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'

interface Props { theme: 'dark'|'light' }

function IgIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill={C.blue} stroke="none" />
    </svg>
  )
}

function LiIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={C.blue}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function DiscordIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={C.blue}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.031.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

interface Platform {
  key:     string
  icon:    React.ReactElement
  name:    string
  handle:  string
  desc:    string
  cta:     string
  url:     string
  preview: string
}

export default function Social({ theme }: Props) {
  const t    = th(theme)
  const dark = theme === 'dark'

  const platforms: Platform[] = [
    {
      key:     'instagram',
      icon:    <IgIcon />,
      name:    'Instagram',
      handle:  '@otublueprint',
      desc:    'Behind the scenes, event coverage, team culture, and announcements. This is Blueprint day to day.',
      cta:     'Follow on Instagram',
      url:     'https://www.instagram.com/otublueprint/',
      preview: 'ig',
    },
    {
      key:     'linkedin',
      icon:    <LiIcon />,
      name:    'LinkedIn',
      handle:  'Blueprint OTU',
      desc:    'Professional updates, project launches, hiring announcements, and thought leadership from our team.',
      cta:     'Follow on LinkedIn',
      url:     'https://www.linkedin.com/company/otu-blueprint/',
      preview: 'li',
    },
    {
      key:     'discord',
      icon:    <DiscordIcon />,
      name:    'Discord',
      handle:  'Blueprint OTU Community',
      desc:    'Our active community server. Where members collaborate, ask questions, share resources, and stay connected between events.',
      cta:     'Join the Discord',
      url:     'https://discord.gg/nxRccCVU',
      preview: 'discord',
    },
  ]

  function ctaHoverOn(e: React.MouseEvent<HTMLAnchorElement>) {
    e.currentTarget.style.background = C.blueMid
    e.currentTarget.style.transform  = 'translateY(-1px)'
  }
  function ctaHoverOff(e: React.MouseEvent<HTMLAnchorElement>) {
    e.currentTarget.style.background = C.blue
    e.currentTarget.style.transform  = ''
  }

  return (
    <div style={{ padding: '100px 52px 80px' }}>
      <Reveal><Eyebrow dark={dark}>community</Eyebrow></Reveal>
      <Reveal delay={60}>
        <WordStagger
          text="Find us everywhere."
          style={{
            fontFamily: F.syne, fontWeight: 800,
            fontSize: 'clamp(2.2rem,4.5vw,4rem)',
            lineHeight: 1.0, letterSpacing: '-0.035em',
            color: t.fg, marginBottom: 16,
          }}
        />
      </Reveal>
      <Reveal delay={120}>
        <p style={{ fontFamily: F.mono, fontSize: '0.88rem', color: t.fg2, lineHeight: 1.84, maxWidth: 480, marginBottom: 72, fontWeight: 400 }}>
          Follow along on Instagram, stay connected on LinkedIn, and join our Discord community. This is where Blueprint OTU lives between events and projects.
        </p>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {platforms.map((p, idx) => (
          <Reveal key={p.key} delay={idx * 80}>
            <motion.div
              whileHover={{ y: -4, borderColor: C.blueMid }}
              transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
              style={{
                border: `2px solid ${C.blue}`,
                borderRadius: 16,
                overflow: 'hidden',
                background: t.surf,
                transition: 'border-color 0.3s',
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                padding: '28px 36px',
                borderBottom: `1px solid ${t.bord}`,
                flexWrap: 'wrap', gap: 16,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  {p.icon}
                  <div>
                    <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '1.1rem', color: t.fg, marginBottom: 2 }}>
                      {p.name}
                    </div>
                    <div style={{ fontFamily: F.mono, fontSize: '0.7rem', color: C.blue, letterSpacing: '0.1em' }}>
                      {p.handle}
                    </div>
                  </div>
                               </div>

                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={ctaHoverOn}
                  onMouseLeave={ctaHoverOff}
                  style={{
                    fontFamily: F.syne,
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    background: C.blue,
                    color: '#fff',
                    padding: '10px 22px',
                    borderRadius: 10,
                    textDecoration: 'none',
                    transition: 'background 0.2s, transform 0.15s',
                    display: 'inline-block',
                  }}
                >
                  {p.cta}
                </a>
              </div>

              {/* Description */}
              <div style={{ padding: '20px 36px', borderBottom: `1px solid ${t.bord}` }}>
                <p style={{ fontFamily: F.mono, fontSize: '0.82rem', color: t.fg2, lineHeight: 1.72, fontWeight: 400, maxWidth: 560 }}>
                  {p.desc}
                </p>
              </div>

              {/* Preview */}
              <div style={{ padding: '28px 36px' }}>

                {/* INSTAGRAM */}
                {p.preview === 'ig' && (
                  <div>
                    <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: t.fg3, marginBottom: 16 }}>
                      Recent posts
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.4, 0.7, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                          style={{
                            aspectRatio: '1',
                            borderRadius: 8,
                            background: dark
                              ? 'linear-gradient(135deg,#1a1a1a,#222,#1a1a1a)'
                              : 'linear-gradient(135deg,#e8e4df,#f0ede8,#e8e4df)',
                            border: `1px solid ${t.bord}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          <div style={{
                            width: 24, height: 24, borderRadius: 4,
                            background: `${C.blue}22`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <IgIcon size={12} />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* LINKEDIN */}
                {p.preview === 'li' && (
                  <div>
                    <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: t.fg3, marginBottom: 16 }}>
                      Recent posts
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {[
                        { title: 'Blueprint OTU is officially open for applications', age: '2 days ago' },
                        { title: 'We are building technology for good in Durham Region', age: '1 week ago' },
                      ].map((post, i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.5, 0.85, 0.5] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
                          style={{
                            padding: '18px 20px',
                            borderRadius: 10,
                            border: `1px solid ${t.bord}`,
                            background: t.card,
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                            <div style={{
                              width: 32, height: 32, borderRadius: '50%',
                              background: C.blueDim,
                              border: `1px solid ${C.blueBorder}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                            }}>
                              <LiIcon size={14} />
                            </div>
                            <div>
                              <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.78rem', color: t.fg }}>Blueprint OTU</div>
                              <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: t.fg3 }}>{post.age}</div>
                            </div>
                          </div>
                          <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.84rem', color: t.fg, marginBottom: 6 }}>
                            {post.title}
                          </div>
                          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                            {['14 likes', '3 comments'].map(s => (
                              <span key={s} style={{
                                fontFamily: F.mono, fontSize: '0.6rem', color: t.fg3,
                                padding: '2px 8px', borderRadius: 6,
                                background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                              }}>
                                {s}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* DISCORD */}
                {p.preview === 'discord' && (
                  <div style={{
                    display: 'grid', gridTemplateColumns: '200px 1fr',
                    borderRadius: 10, border: `1px solid ${t.bord}`, overflow: 'hidden',
                  }}>
                    {/* Sidebar */}
                    <div style={{
                      background: dark ? '#111' : '#e8e4df',
                      padding: '16px 12px',
                      borderRight: `1px solid ${t.bord}`,
                    }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        marginBottom: 18, paddingBottom: 14,
                        borderBottom: `1px solid ${t.bord}`,
                      }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: '50%',
                          background: C.blueDim, border: `1px solid ${C.blueBorder}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <DiscordIcon size={14} />
                        </div>
                        <span style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.75rem', color: t.fg }}>
                          Blueprint OTU
                        </span>
                      </div>
                      {['# general', '# projects', '# events', '# resources', '# introductions'].map((ch, i) => (
                        <div key={ch} style={{
                          fontFamily: F.mono, fontSize: '0.7rem',
                          color: i === 0 ? t.fg : t.fg3,
                          padding: '5px 8px', borderRadius: 5, marginBottom: 2,
                          background: i === 0
                            ? (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)')
                            : 'transparent',
                        }}>
                          {ch}
                        </div>
                      ))}
                    </div>

                    {/* Chat */}
                    <div style={{ padding: '16px 18px' }}>
                      <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: t.fg3, marginBottom: 14 }}>
                        # general
                      </div>
                      {[
                        { user: 'Blueprint Bot', msg: 'Welcome to Blueprint OTU. Applications are now open for Fall 2026.', time: 'Today' },
                        { user: 'Member',        msg: 'Super excited to be here, just submitted my application!',           time: 'Today' },
                        { user: 'Member',        msg: 'Anyone else applying for the event coordinator role?',               time: 'Today' },
                      ].map((m, i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.5, 0.85, 0.5] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}
                          style={{ display: 'flex', gap: 10, marginBottom: 14 }}
                        >
                          <div style={{
                            width: 28, height: 28, borderRadius: '50%',
                            background: C.blueDim, flexShrink: 0,
                            border: `1px solid ${C.blueBorder}`,
                          }} />
                          <div>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 3 }}>
                              <span style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.75rem', color: C.blue }}>
                                {m.user}
                              </span>
                              <span style={{ fontFamily: F.mono, fontSize: '0.58rem', color: t.fg3 }}>
                                {m.time}
                              </span>
                            </div>
                            <p style={{ fontFamily: F.mono, fontSize: '0.73rem', color: t.fg2, lineHeight: 1.5, fontWeight: 400 }}>
                              {m.msg}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                      <div style={{
                        marginTop: 8, padding: '10px 14px', borderRadius: 8,
                        border: `1px solid ${t.bord}`,
                        background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                      }}>
                        <span style={{ fontFamily: F.mono, fontSize: '0.7rem', color: t.fg3 }}>
                          Message #general...
                        </span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}