import { C, F } from '../tokens'
export default function ThemeToggle({ theme, toggle }: { theme:'dark'|'light'; toggle:()=>void }) {
  const on = theme === 'light'
  return (
    <button onClick={toggle} style={{ display:'flex', alignItems:'center', gap:8, background:'none', border:'none', fontFamily:F.mono, fontSize:'0.6rem', letterSpacing:'0.12em', textTransform:'uppercase', color: theme==='dark' ? 'rgba(240,237,232,0.4)' : 'rgba(11,31,75,0.45)' }}>
      <div style={{ width:36, height:20, borderRadius:10, background: theme==='dark' ? 'rgba(255,255,255,0.08)' : 'rgba(11,31,75,0.1)', border:`1px solid ${theme==='dark' ? 'rgba(255,255,255,0.1)' : 'rgba(11,31,75,0.12)'}`, position:'relative', transition:'background 0.3s' }}>
        <div style={{ position:'absolute', top:2, left: on ? 18 : 2, width:14, height:14, borderRadius:'50%', background: on ? C.blue : 'rgba(240,237,232,0.5)', transition:'left 0.28s cubic-bezier(0.16,1,0.3,1), background 0.28s' }} />
      </div>
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}
