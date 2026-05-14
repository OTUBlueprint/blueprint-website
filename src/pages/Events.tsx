import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { C, F, th } from '../tokens'
import { EVENTS } from '../data'
import WordStagger from '../components/WordStagger'
import Reveal from '../components/Reveal'
import LineReveal from '../components/LineReveal'
import Eyebrow from '../components/Eyebrow'
import StatusDot from '../components/StatusDot'

interface Props { theme: 'dark'|'light' }
const TYPE_C: Record<string,string> = { flagship:C.blue, workshop:'#4ade80', panel:'#c084fc', social:'#fb923c' }
const TYPE_L: Record<string,string> = { flagship:'Flagship', workshop:'Workshop', panel:'Speaker Panel', social:'Social' }

export default function Events({ theme }: Props) {
  const [tab, setTab]             = useState<'upcoming'|'past'|'all'>('upcoming')
  const [signupId, setSignupId]   = useState<number|null>(null)
  const [email, setEmail]         = useState('')
  const [submitted, setSubmitted] = useState<number[]>([])
  const t = th(theme)
  const dark = theme === 'dark'

  const shown = tab === 'all' ? EVENTS : EVENTS.filter(e =>
    tab === 'upcoming' ? e.status !== 'past' : e.status === 'past'
  )

  function handleSignup(id: number) {
    if (!email.endsWith('@ontariotechu.net')) {
      alert('Please use your OntarioTechU email address ending in @ontariotechu.net')
      return
    }
    setSubmitted(p => [...p, id])
    setSignupId(null)
    setEmail('')
  }

  return (
    <div style={{padding:'100px 52px 80px'}}>
      <Reveal><Eyebrow dark={dark}>events</Eyebrow></Reveal>
      <Reveal delay={60}>
        <WordStagger text="What we are running." style={{fontFamily:F.syne,fontWeight:800,fontSize:'clamp(2.2rem,4.5vw,4rem)',lineHeight:1.0,letterSpacing:'-0.035em',color:t.fg,marginBottom:16}} />
      </Reveal>
      <Reveal delay={120}>
        <p style={{fontFamily:F.mono,fontSize:'0.88rem',color:t.fg2,lineHeight:1.84,maxWidth:480,marginBottom:44,fontWeight:400}}>
          Hackathons. Workshops. Speaker panels. Coffee chats. Mentorship. This is Blueprint beyond the project room.
        </p>
      </Reveal>

      <Reveal delay={180}>
        <div style={{display:'flex',gap:5,marginBottom:44}}>
          {(['upcoming','past','all'] as const).map(tk => (
            <button key={tk} onClick={()=>setTab(tk)}
              style={{fontFamily:F.mono,fontSize:'0.6rem',letterSpacing:'0.1em',textTransform:'uppercase',padding:'5px 14px',borderRadius:20,border:`1px solid ${tab===tk?'rgba(26,86,240,0.3)':t.bord}`,background:tab===tk?'rgba(26,86,240,0.1)':'transparent',color:tab===tk?C.blue:t.fg3,transition:'all 0.2s'}}>
              {tk==='upcoming'?'Upcoming':tk==='past'?'Past':'All'}
            </button>
          ))}
        </div>
      </Reveal>

      <LineReveal color={t.bord} />

      <AnimatePresence mode="popLayout">
        {shown.map((ev,i) => (
          <motion.div key={ev.id} layout initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.35,ease:[0.16,1,0.3,1],delay:i*0.04}}>
            <motion.div whileHover={{x:4}} style={{borderTop:`1px solid ${t.bord}`,padding:'28px 0',opacity:ev.status==='placeholder'?0.62:1,position:'relative',overflow:'visible'}}>
              <motion.div style={{position:'absolute',top:-1,left:0,height:2,background:TYPE_C[ev.type],width:0}} whileHover={{width:'100%'}} transition={{duration:0.4,ease:[0.16,1,0.3,1]}} />

              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:20}}>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:10}}>
                    <span style={{fontFamily:F.mono,fontSize:'0.58rem',letterSpacing:'0.14em',textTransform:'uppercase',color:TYPE_C[ev.type]}}>{TYPE_L[ev.type]}</span>
                    <span style={{width:1,height:10,background:t.bord,display:'inline-block'}} />
                    <span style={{fontFamily:F.mono,fontSize:'0.6rem',color:t.fg3,letterSpacing:'0.06em'}}>{ev.date}</span>
                  </div>

                  <div style={{fontFamily:F.syne,fontWeight:800,fontSize:'clamp(1.1rem,2vw,1.6rem)',color:t.fg,marginBottom:10,lineHeight:1.1,letterSpacing:'-0.02em'}}>{ev.title}</div>
                  <p style={{fontFamily:F.mono,fontSize:'0.8rem',color:t.fg2,lineHeight:1.65,maxWidth:560,fontWeight:400,marginBottom:20}}>{ev.desc}</p>

                  {ev.status !== 'past' && (
                    submitted.includes(ev.id) ? (
                      <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'10px 18px',borderRadius:10,background:'rgba(74,222,128,0.1)',border:'1px solid rgba(74,222,128,0.25)'}}>
                        <span style={{width:6,height:6,borderRadius:'50%',background:'#4ade80',display:'inline-block'}} />
                        <span style={{fontFamily:F.mono,fontSize:'0.72rem',color:'#4ade80',fontWeight:400}}>You are on the list. We will send updates to your OTU email.</span>
                      </div>
                    ) : signupId === ev.id ? (
                      <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
                        style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',padding:'16px 20px',borderRadius:10,border:`1px solid ${C.blueBorder}`,background:C.blueDim}}>
                        <input type="email" placeholder="your@ontariotechu.net" value={email}
                          onChange={e=>setEmail(e.target.value)}
                          onKeyDown={e=>e.key==='Enter'&&handleSignup(ev.id)}
                          style={{fontFamily:F.mono,fontSize:'0.78rem',fontWeight:400,padding:'8px 0',background:'transparent',border:'none',borderBottom:`1px solid ${C.blue}`,color:t.fg,outline:'none',minWidth:240,flex:1}} />
                        <div style={{display:'flex',gap:8}}>
                          <button onClick={()=>handleSignup(ev.id)}
                            style={{fontFamily:F.syne,fontWeight:700,fontSize:'0.68rem',letterSpacing:'0.1em',textTransform:'uppercase',background:C.blue,color:'#fff',padding:'9px 20px',borderRadius:8,border:'none',transition:'background 0.2s',whiteSpace:'nowrap'}}
                            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background=C.blueMid}
                            onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background=C.blue}>
                            Notify me
                          </button>
                          <button onClick={()=>{setSignupId(null);setEmail('')}}
                            style={{fontFamily:F.mono,fontSize:'0.68rem',color:t.fg3,background:'none',border:`1px solid ${t.bord}`,borderRadius:8,padding:'9px 14px'}}>
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <button onClick={()=>setSignupId(ev.id)}
                        style={{fontFamily:F.syne,fontWeight:700,fontSize:'0.7rem',letterSpacing:'0.08em',textTransform:'uppercase',background:C.blue,color:'#fff',padding:'10px 22px',borderRadius:9,border:'none',transition:'background 0.2s, transform 0.15s',display:'inline-flex',alignItems:'center',gap:8}}
                        onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background=C.blueMid;el.style.transform='translateY(-1px)'}}
                        onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background=C.blue;el.style.transform=''}}>
                        Get notified <span style={{fontSize:'0.75rem'}}>→</span>
                      </button>
                    )
                  )}
                </div>

                <div style={{textAlign:'right',flexShrink:0}}>
                  <StatusDot status={ev.status} />
                  <div style={{fontFamily:F.mono,fontSize:'0.6rem',color:t.fg3,marginTop:8}}>📍 {ev.loc}</div>
                  <div style={{fontFamily:F.mono,fontSize:'0.6rem',color:t.fg3,marginTop:4}}>Cap. {ev.cap}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}