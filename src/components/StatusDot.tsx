import { F } from '../tokens'
const MAP: Record<string,{c:string;l:string}> = {
  live:        { c:'#4ade80', l:'Live'        },
  active:      { c:'#fb923c', l:'In Progress' },
  planned:     { c:'rgba(240,237,232,0.28)', l:'Planned' },
  upcoming:    { c:'#1A56F0', l:'Upcoming'    },
  past:        { c:'rgba(240,237,232,0.22)', l:'Past'    },
  placeholder: { c:'rgba(240,237,232,0.16)', l:'Soon'    },
}
export default function StatusDot({ status }: { status: string }) {
  const { c, l } = MAP[status] ?? MAP.planned
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontFamily:F.mono, fontSize:'0.58rem', fontWeight:400, letterSpacing:'0.1em', textTransform:'uppercase', color:c, whiteSpace:'nowrap' }}>
      <span style={{ width:4, height:4, borderRadius:'50%', background:c, display:'inline-block' }} />
      {l}
    </span>
  )
}
