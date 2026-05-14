import { C, F } from '../tokens'
export default function Eyebrow({ children, dark=true }: { children: React.ReactNode; dark?: boolean }) {
  const c = dark ? 'rgba(240,237,232,0.3)' : 'rgba(11,31,75,0.35)'
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, fontFamily:F.mono, fontSize:'0.6rem', fontWeight:400, letterSpacing:'0.2em', textTransform:'uppercase', color:c, marginBottom:18 }}>
      <span style={{ display:'block', width:18, height:1, background:c }} />
      {children}
    </div>
  )
}
