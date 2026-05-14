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

// Real LinkedIn brandmark
function LinkedInBrand({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <rect width="72" height="72" rx="8" fill="#0A66C2" />
      <path d="M13.5 26.5h9v32h-9v-32zM18 22.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zM58.5 58.5h-9V43c0-3.7-.1-8.5-5.2-8.5-5.2 0-6 4-6 8.2v15.8h-9v-32h8.6v4.4h.1c1.2-2.3 4.1-4.7 8.5-4.7 9.1 0 10.8 6 10.8 13.8v18.5z" fill="white" />
    </svg>
  )
}

// Real Discord brandmark
function DiscordBrand({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <rect width="72" height="72" rx="8" fill="#5865F2" />
      <path d="M49.5 17.5a35.4 35.4 0 0 0-8.7-2.7l-.4.8a24.5 24.5 0 0 0-7.7 0l-.4-.8a35.5 35.5 0 0 0-8.8 2.8C17 26.2 14.8 34.7 15.7 43a35.7 35.7 0 0 0 10.9 5.5 27 27 0 0 0 2.3-3.8 23.2 23.2 0 0 1-3.7-1.8l.9-.7a25.4 25.4 0 0 0 21.8 0l.9.7a23.3 23.3 0 0 1-3.7 1.8 27 27 0 0 0 2.3 3.8 35.6 35.6 0 0 0 10.9-5.5c1-9.8-1.7-18.2-7.8-25.5zM28.4 38c-2 0-3.7-1.9-3.7-4.1s1.6-4.1 3.7-4.1 3.7 1.8 3.7 4.1-1.6 4.1-3.7 4.1zm15.2 0c-2 0-3.7-1.9-3.7-4.1s1.6-4.1 3.7-4.1 3.7 1.8 3.7 4.1-1.6 4.1-3.7 4.1z" fill="white" />
    </svg>
  )
}

const LI_POSTS = [
  {
    title: 'Blueprint OTU is officially open for applications',
    body: 'We are building a team of developers, designers, and community builders at Ontario Tech University. Applications open May 20th. No experience required.',
    date: 'May 2026', likes: 24, comments: 5,
  },
  {
    title: 'Technology for good starts here',
    body: 'Blueprint OTU will build free software for Durham Region nonprofits starting Fall 2026. We are looking for our founding cohort right now.',
    date: 'Apr 2026', likes: 18, comments: 3,
  },
]

export default function Social({ theme }: Props) {
  const t    = th(theme)
  const dark = theme === 'dark'

  function ctaOn(e: React.MouseEvent<HTMLAnchorElement>)  { e.currentTarget.style.background = C.blueMid; e.currentTarget.style.transform = 'translateY(-1px)' }
  function ctaOff(e: React.MouseEvent<HTMLAnchorElement>) { e.currentTarget.style.background = C.blue;    e.currentTarget.style.transform = '' }

  const bigCardStyle: React.CSSProperties = {
    border: `2px solid ${C.blue}`,
    borderRadius: 16,
    overflow: 'hidden',
    background: t.surf,
    transition: 'border-color 0.3s',
  }

  const smallCardStyle: React.CSSProperties = {
    border: `2px solid ${C.blue}`,
    borderRadius: 16,
    overflow: 'hidden',
    background: t.surf,
    transition: 'border-color 0.3s',
    flex: 1,
  }

  const ctaBtnStyle: React.CSSProperties = {
    fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem',
    letterSpacing: '0.1em', textTransform: 'uppercase',
    background: C.blue, color: '#fff',
    padding: '10px 22px', borderRadius: 10,
    textDecoration: 'none',
    transition: 'background 0.2s, transform 0.15s',
    display: 'inline-flex', alignItems: 'center', gap: 8,
  }

  return (
    <div style={{ padding: '100px 52px 80px' }}>
      <Reveal><Eyebrow dark={dark}>community</Eyebrow></Reveal>
      <Reveal delay={60}>
        <WordStagger
          text="Find us everywhere."
          style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(2.2rem,4.5vw,4rem)', lineHeight: 1.0, letterSpacing: '-0.035em', color: t.fg, marginBottom: 16 }}
        />
      </Reveal>
      <Reveal delay={120}>
        <p style={{ fontFamily: F.mono, fontSize: '0.88rem', color: t.fg2, lineHeight: 1.84, maxWidth: 480, marginBottom: 72, fontWeight: 400 }}>
          Follow along on Instagram, stay connected on LinkedIn, and join our Discord community.
        </p>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* ── INSTAGRAM — big ── */}
        <Reveal delay={0}>
          <motion.div whileHover={{ y: -4, borderColor: C.blueMid }} transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }} style={bigCardStyle}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '28px 36px', borderBottom: `1px solid ${t.bord}`, flexWrap: 'wrap', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <IgIcon size={28} />
                <div>
                  <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '1.1rem', color: t.fg, marginBottom: 2 }}>Instagram</div>
                  <div style={{ fontFamily: F.mono, fontSize: '0.7rem', color: C.blue, letterSpacing: '0.1em' }}>@otublueprint</div>
                </div>
              </div>
              <a href="https://www.instagram.com/otublueprint/" target="_blank" rel="noreferrer" style={ctaBtnStyle} onMouseEnter={ctaOn} onMouseLeave={ctaOff}>
                Follow on Instagram
              </a>
            </div>

            {/* Description */}
            <div style={{ padding: '20px 36px', borderBottom: `1px solid ${t.bord}` }}>
              <p style={{ fontFamily: F.mono, fontSize: '0.82rem', color: t.fg2, lineHeight: 1.72, fontWeight: 400, maxWidth: 560 }}>
                Behind the scenes, event coverage, team culture, and announcements. This is Blueprint day to day.
              </p>
            </div>

            {/* Feed area */}
            <div style={{ padding: '28px 36px' }}>
              <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: t.fg3, marginBottom: 16 }}>
                Recent posts
              </div>
              <div style={{ borderRadius: 10, overflow: 'hidden', border: `1px solid ${t.bord}`, minHeight: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/*
                  TO ACTIVATE REAL FEED:
                  1. Sign up free at behold.so
                  2. Connect @otublueprint
                  3. Copy your Feed ID
                  4. Replace YOUR_FEED_ID_HERE and uncomment the two lines below
                  5. Delete the placeholder div below
                */}
                {/* <div id="behold-widget" data-feed-id="YOUR_FEED_ID_HERE" /> */}
                {/* <script src="https://w.behold.so/widget.js" type="module" /> */}

                <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                  <IgIcon size={40} />
                  <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.95rem', color: t.fg, marginTop: 16, marginBottom: 8 }}>
                    Connect your Instagram feed
                  </div>
                  <div style={{ fontFamily: F.mono, fontSize: '0.72rem', color: t.fg3, lineHeight: 1.65, maxWidth: 300, fontWeight: 400, marginBottom: 20 }}>
                    Sign up free at behold.so, connect @otublueprint, and paste your feed ID into Social.tsx to show real posts here.
                  </div>
                  <a href="https://www.instagram.com/otublueprint/" target="_blank" rel="noreferrer"
                    style={{ fontFamily: F.mono, fontSize: '0.7rem', color: C.blue, letterSpacing: '0.08em', textDecoration: 'none', borderBottom: `1px solid ${C.blue}`, paddingBottom: 2 }}>
                    View on Instagram →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* ── LINKEDIN + DISCORD — side by side, compact ── */}
        <Reveal delay={80}>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>

            {/* LINKEDIN */}
            <motion.div whileHover={{ y: -4, borderColor: C.blueMid }} transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }} style={smallCardStyle}>
              <div style={{ padding: '28px 32px' }}>
                {/* App icon + name row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                  <LinkedInBrand size={44} />
                  <div>
                    <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '1rem', color: t.fg, marginBottom: 2 }}>LinkedIn</div>
                    <div style={{ fontFamily: F.mono, fontSize: '0.68rem', color: C.blue, letterSpacing: '0.08em' }}>Blueprint OTU</div>
                  </div>
                </div>

                <p style={{ fontFamily: F.mono, fontSize: '0.78rem', color: t.fg2, lineHeight: 1.7, fontWeight: 400, marginBottom: 24 }}>
                  Professional updates, project launches, and hiring announcements from our team.
                </p>

                <a href="https://www.linkedin.com/company/otu-blueprint/" target="_blank" rel="noreferrer"
                  style={{ ...ctaBtnStyle, width: '100%', justifyContent: 'center', boxSizing: 'border-box' }}
                  onMouseEnter={ctaOn} onMouseLeave={ctaOff}>
                  <svg width="16" height="16" viewBox="0 0 72 72" fill="none">
                    <path d="M13.5 26.5h9v32h-9v-32zM18 22.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zM58.5 58.5h-9V43c0-3.7-.1-8.5-5.2-8.5-5.2 0-6 4-6 8.2v15.8h-9v-32h8.6v4.4h.1c1.2-2.3 4.1-4.7 8.5-4.7 9.1 0 10.8 6 10.8 13.8v18.5z" fill="white" />
                  </svg>
                  Connect with us
                </a>
              </div>
            </motion.div>

            {/* DISCORD */}
            <motion.div whileHover={{ y: -4, borderColor: C.blueMid }} transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }} style={smallCardStyle}>
              <div style={{ padding: '28px 32px' }}>
                {/* App icon + name row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                  <DiscordBrand size={44} />
                  <div>
                    <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '1rem', color: t.fg, marginBottom: 2 }}>Discord</div>
                    <div style={{ fontFamily: F.mono, fontSize: '0.68rem', color: C.blue, letterSpacing: '0.08em' }}>Blueprint OTU Community</div>
                  </div>
                </div>

                <p style={{ fontFamily: F.mono, fontSize: '0.78rem', color: t.fg2, lineHeight: 1.7, fontWeight: 400, marginBottom: 24 }}>
                  Our community server. Collaborate, ask questions, share resources, and stay connected between events.
                </p>

                <a href="https://discord.gg/nxRccCVU" target="_blank" rel="noreferrer"
                  style={{ ...ctaBtnStyle, width: '100%', justifyContent: 'center', boxSizing: 'border-box', background: '#5865F2' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#4752c4'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#5865F2'; e.currentTarget.style.transform = '' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.031.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  Join our Discord
                </a>
              </div>
            </motion.div>

          </div>
        </Reveal>

      </div>
    </div>
  )
}