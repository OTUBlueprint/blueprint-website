import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { C, F, th } from '../tokens'
import WordStagger from '../components/WordStagger'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'

interface Props { theme: 'dark'|'light' }

const BEHOLD_FEED_ID = 'mOqaicUmJyJqOF4j9DpU'

function IgIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill={color} stroke="none" />
    </svg>
  )
}

function DiscordIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.031.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

function GhIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LiIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

interface BeholdPost {
  id: string
  mediaUrl: string
  permalink: string
  caption?: string
  mediaType: string
  thumbnailUrl?: string
}

export default function Social({ theme }: Props) {
  const t    = th(theme)
  const dark = theme === 'dark'

  const [posts,    setPosts]    = useState<BeholdPost[]>([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(false)

  useEffect(() => {
    fetch(`https://feeds.behold.so/${BEHOLD_FEED_ID}`)
      .then(r => r.json())
      .then(data => {
        const items = Array.isArray(data) ? data : data.posts || []
        setPosts(items.slice(0, 9))
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  const platforms = [
    {
      name: 'Discord',
      handle: 'Join our server',
      url: 'https://discord.gg/nxRccCVU',
      color: '#5865F2',
      icon: <DiscordIcon size={22} color="#5865F2" />,
      desc: 'Connect with Blueprint OTU members, get updates, and stay in the loop.',
      cta: 'Join Discord',
    },
    {
      name: 'GitHub',
      handle: 'OTUBlueprint',
      url: 'https://github.com/OTUBlueprint',
      color: dark ? '#e6edf3' : '#0D0D0D',
      icon: <GhIcon size={22} color={dark ? '#e6edf3' : '#0D0D0D'} />,
      desc: 'Follow our open source work. See what we are building for nonprofits.',
      cta: 'Follow on GitHub',
    },
    {
      name: 'LinkedIn',
      handle: 'Blueprint OTU',
      url: 'https://www.linkedin.com/company/otu-blueprint/',
      color: '#0A66C2',
      icon: <LiIcon size={22} color="#0A66C2" />,
      desc: 'Follow us for updates, announcements, and opportunities.',
      cta: 'Follow on LinkedIn',
    },
  ]

  return (
    <div style={{ padding: '100px 52px 80px' }}>

      <Reveal><Eyebrow dark={dark}>Find us online</Eyebrow></Reveal>
      <Reveal delay={60}>
        <WordStagger text="Follow Blueprint OTU." style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.0, letterSpacing: '-0.035em', color: t.fg, marginBottom: 16 }} />
      </Reveal>
      <Reveal delay={120}>
        <p style={{ fontFamily: F.mono, fontSize: '0.88rem', color: t.fg2, lineHeight: 1.84, maxWidth: 480, marginBottom: 56, fontWeight: 400 }}>
          Stay connected across Instagram, Discord, GitHub, and LinkedIn.
        </p>
      </Reveal>

      {/* Instagram — full width hero */}
      <Reveal>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <IgIcon size={22} color={t.fg} />
              <div>
                <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '1rem', color: t.fg }}>Instagram</div>
                <div style={{ fontFamily: F.mono, fontSize: '0.65rem', color: t.fg3 }}>@otublueprint</div>
              </div>
            </div>
            <a href="https://www.instagram.com/otublueprint/" target="_blank" rel="noreferrer"
              style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: C.blue, color: '#fff', padding: '8px 18px', borderRadius: 8, textDecoration: 'none', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.blueMid}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.blue}>
              Follow
            </a>
          </div>

          {/* Feed grid */}
          {loading && (
            <div style={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.surf, borderRadius: 12, border: `1px solid ${t.bord}` }}>
              <span style={{ fontFamily: F.mono, fontSize: '0.75rem', color: t.fg3 }}>Loading feed...</span>
            </div>
          )}

          {error && (
            <div style={{ height: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: t.surf, borderRadius: 12, border: `1px solid ${t.bord}`, gap: 12 }}>
              <IgIcon size={32} color={t.fg3} />
              <span style={{ fontFamily: F.mono, fontSize: '0.75rem', color: t.fg3 }}>Could not load feed</span>
              <a href="https://www.instagram.com/otublueprint/" target="_blank" rel="noreferrer"
                style={{ fontFamily: F.mono, fontSize: '0.65rem', color: C.blue, textDecoration: 'none' }}>
                View on Instagram →
              </a>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, borderRadius: 12, overflow: 'hidden', border: `1px solid ${t.bord}` }}>
              {posts.slice(0, 9).map((post, i) => (
                <motion.a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ opacity: 0.85 }}
                  style={{ display: 'block', aspectRatio: '1', overflow: 'hidden', position: 'relative' }}
                >
                  <img
                    src={post.thumbnailUrl || post.mediaUrl}
                    alt={post.caption?.slice(0, 60) || 'Blueprint OTU post'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </Reveal>

      {/* Discord, GitHub, LinkedIn — three equal cards */}
      <Reveal delay={80}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 12 }}>
          {platforms.map(p => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: [0.16,1,0.3,1] }}
              style={{ display: 'block', padding: '28px 24px', borderRadius: 12, border: `1px solid ${t.bord}`, background: t.surf, textDecoration: 'none', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = p.color}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = t.bord}
            >
              <div style={{ marginBottom: 14 }}>{p.icon}</div>
              <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '1rem', color: t.fg, marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontFamily: F.mono, fontSize: '0.65rem', color: t.fg3, marginBottom: 10 }}>{p.handle}</div>
              <p style={{ fontFamily: F.mono, fontSize: '0.74rem', color: t.fg2, lineHeight: 1.65, fontWeight: 400, marginBottom: 16 }}>{p.desc}</p>
              <span style={{ fontFamily: F.mono, fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: p.color }}>
                {p.cta} →
              </span>
            </motion.a>
          ))}
        </div>
      </Reveal>
    </div>
  )
}