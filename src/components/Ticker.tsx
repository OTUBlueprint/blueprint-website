import { TICKER } from '../data'
import { C, F } from '../tokens'

export default function Ticker({ dark=true }: { dark?: boolean }) {
  const all = [...TICKER, ...TICKER]
  const borderC = dark ? 'rgba(255,255,255,0.05)' : 'rgba(11,31,75,0.07)'
  const textC   = dark ? 'rgba(240,237,232,0.2)'  : 'rgba(11,31,75,0.22)'
  return (
    <div style={{ overflow:'hidden', padding:'12px 0', borderTop:`1px solid ${borderC}`, borderBottom:`1px solid ${borderC}`, background: dark ? 'rgba(255,255,255,0.012)' : 'rgba(0,0,0,0.015)' }}>
      <div style={{ display:'flex', gap:52, width:'max-content', animation:'ticker 32s linear infinite', whiteSpace:'nowrap' }}>
        {all.map((w,i) => (
          <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:12, fontFamily:F.mono, fontSize:'0.62rem', fontWeight:400, letterSpacing:'0.16em', textTransform:'uppercase', color:textC }}>
            <span style={{ color:C.blue, fontSize:'0.4rem' }}>■</span>{w}
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
