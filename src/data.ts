import type { BpEvent, Member } from './types'

export const EVENTS: BpEvent[] = [
  { id:1, title:'Hack for Impact',                 date:'November 1st, 2026', time:'TBD', loc:'TBD', type:'flagship', desc:'Our first annual hackathon. Student teams build real tech solutions for Durham Region nonprofits. Open to every program at OTU.',                                cap:100, status:'upcoming'    },
  { id:2, title:'Tech for Good Panel',             date:'Nov 2026',           time:'TBD', loc:'TBD', type:'panel',    desc:'90 minutes with OTU professors, Durham nonprofit leaders, and people working in social impact tech. Open to the whole campus.',                                cap:80,  status:'placeholder' },
  { id:3, title:'Learn Lab Series',                date:'Oct 2026',           time:'TBD', loc:'TBD', type:'lab',      desc:'Monthly skill sessions covering React, Figma, Git, agile, and client communication. Hands-on and beginner friendly.',                                           cap:40,  status:'placeholder' },
  { id:4, title:'Fall Info Session',               date:'Sept 2026',          time:'TBD', loc:'TBD', type:'social',   desc:'Learn what Blueprint is, meet the team, and find out how to apply. Food provided. Come as you are.',                                                            cap:60,  status:'upcoming'    },
  { id:5, title:'NPO Showcase Night',              date:'Apr 2027',           time:'TBD', loc:'TBD', type:'flagship', desc:'End of year demo night. Each team presents their delivered software to nonprofit clients, sponsors, faculty, and campus.',                                      cap:120, status:'placeholder' },
  { id:6, title:'Coffee Chats with Industry',      date:'Monthly',            time:'TBD', loc:'TBD', type:'social',   desc:'Monthly 60-minute session with one industry professional. 15 Blueprint members. No slides, just real talk.',                                                    cap:15,  status:'placeholder' },
]

export const TEAM: Member[] = [
  { id:1, name:'Jun Bin Cheng',     role:'Founder',           program:'Ontario Tech University', year:'', initials:'J', isExec:true },
  { id:2, name:'Valerie Ekeigwe',   role:'President',         program:'Ontario Tech University', year:'', initials:'V', isExec:true },
  { id:3, name:'Kumayl', role:'Vice ', program:'Ontario Tech University', year:'', initials:'E', isExec:true },
  { id:4, name:'VP of Design',      role:'VP of Design',      program:'Ontario Tech University', year:'', initials:'D', isExec:true },
]

export const TEAMS = [
  {
    id: 'creative',
    name: 'Creative & Media Team',
    type: 'Creative',
    tagline: "Shape Blueprint OTU's brand, content, and storytelling.",
    experience: 'Beginner-Friendly',
    status: 'Open Now',
    commitment: '12 hrs/week minimum',
    skills: ['Social media strategy','Instagram','LinkedIn','Content planning','Canva','Figma','Photography','Video editing','Branding','Graphic design','Copywriting'],
    roles: ['Social Media Director','Content Creator','Photographer / Videographer','Director of Design'],
    what: 'Build and grow the Blueprint OTU brand across all platforms. Create content that tells our story, documents our work, and brings new members and partners into our orbit.',
  },
  {
    id: 'community',
    name: 'Community & Outreach Team',
    type: 'Outreach',
    tagline: "Grow Blueprint OTU's campus presence, member experience, and external relationships.",
    experience: 'Experience Preferred',
    status: 'Open Now',
    commitment: '12 hrs/week minimum',
    skills: ['Community building','Member engagement','Recruitment','Partnerships','Sponsorship outreach','Workshop planning','Public speaking','Professional communication'],
    roles: ['Community Director','Outreach / Recruitment Director','Partnerships Director','Workshop Director'],
    what: 'Build the culture and connections that make Blueprint OTU more than a club. Own recruitment, partnerships, member experience, and our presence across OTU campus.',
  },
  {
    id: 'development',
    name: 'Development Team',
    type: 'Technical',
    tagline: 'Build real software and digital products for community impact.',
    experience: 'Experience Preferred',
    status: 'Open Now',
    commitment: '12 hrs/week minimum',
    skills: ['React','Vue','TypeScript','JavaScript','Git / GitHub','APIs','Databases','Backend development','Figma','UI / UX','AI / ML','Mobile development','Project management'],
    roles: ['Frontend Developer','Backend Developer','UI/UX Designer','AI/ML Developer','Mobile Developer','Product / Project Manager'],
    what: 'Ship real software for Durham Region nonprofits. Work in cross-functional teams with designers, PMs, and clients to build production-quality products from scoping through to delivery.',
  },
  {
    id: 'executive',
    name: 'Executive Team',
    type: 'Leadership',
    tagline: 'Lead the systems, strategy, and execution behind the chapter.',
    experience: 'Experience Required',
    status: 'Open Now',
    commitment: '12 hrs/week minimum',
    skills: ['Leadership','Team management','Operations','Communication','Sponsorships','Event planning','Project oversight','Marketing strategy','Website management','Documentation'],
    roles: ['VP Internal','VP External','VP Events','VP Projects','VP Marketing / Creative','VP Tech / Web'],
    what: 'Own the strategy, systems, and direction of the chapter. Executive roles require demonstrated leadership, strong communication, and the ability to manage people, processes, and priorities.',
  },
]

export const ROLE_MAP: Record<string, string[]> = {
  creative:    ['Social Media Director','Content Creator','Photographer / Videographer','Director of Design'],
  community:   ['Community Director','Outreach / Recruitment Director','Partnerships Director','Workshop Director'],
  development: ['Frontend Developer','Backend Developer','UI/UX Designer','AI/ML Developer','Mobile Developer','Product / Project Manager'],
  executive:   ['VP Internal','VP External','VP Events','VP Projects','VP Marketing / Creative','VP Tech / Web'],
}

export const PROCESS_STEPS = [
  { n:'01', title:'Explore roles',       desc:'Filter by team, experience level, role type, and status.' },
  { n:'02', title:'Choose your fit',     desc:'Select the team and role that best match your skills and interests.' },
  { n:'03', title:'Submit application',  desc:'Share your experience, links, availability, and why you want to join Blueprint OTU.' },
  { n:'04', title:'Interview or review', desc:'Some roles may include a short interview, portfolio review, or role-specific conversation.' },
  { n:'05', title:'Join the cohort',     desc:'Selected applicants will be onboarded before the semester begins.' },
]

export const FAQ = [
  { q:'Do I need experience?',                  a:'Experience requirements vary by role. Some roles are beginner-friendly, while technical, project, and leadership roles require relevant experience or demonstrated ability.' },
  { q:'Do I need to meet every qualification?', a:'No. Qualifications are guidelines. If you have some of the skills listed and are willing to learn, we encourage you to apply.' },
  { q:'How much time is required?',             a:'All selected members are expected to commit approximately 12 hours per week minimum. Some roles may require more during recruitment, major events, or project deadlines.' },
  { q:'Can first-years apply?',                 a:'Yes. First-years are welcome to apply if they are reliable, motivated, and ready to contribute consistently.' },
  { q:'Can non-engineering students apply?',    a:'Yes. Blueprint OTU welcomes students from all programs, especially those interested in technology, design, operations, marketing, community impact, and leadership.' },
  { q:'Can I apply to more than one role?',     a:'Yes. Select your strongest role first, then choose a secondary team or role if you are open to being considered elsewhere.' },
  { q:'What happens after I apply?',            a:'Applications will be reviewed by the leadership team. Some applicants may be invited for a short interview, portfolio review, or role-specific conversation.' },
  { q:'Is this paid?',                          a:'No. Blueprint OTU is a student-led volunteer organization focused on community impact, skill-building, and nonprofit technology.' },
]

export const TICKER = [
  'Technology for Good','Ontario Tech University','Durham Region',
  'Pro Bono Software','Student Developers','Community Impact',
  'Hack for Impact','Applications Open May 20th',
  'Zero Cost to Nonprofits','First Cohort Fall 2026',
]