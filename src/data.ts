import type { BpEvent, Member } from './types'

export const EVENTS: BpEvent[] = [
  { id:1, title:'Hack for Impact',                date:'November 1st, 2026', time:'TBD', loc:'TBD', type:'flagship', desc:'Our first annual hackathon. Student teams build real tech solutions for Durham Region nonprofits. Open to every program at OTU.',                             cap:100, status:'upcoming'    },
  { id:2, title:'Tech for Good Panel',            date:'Nov 2026',           time:'TBD', loc:'TBD', type:'panel',    desc:'90 minutes with OTU professors, Durham nonprofit leaders, and people working in social impact tech. Open to the whole campus.',                             cap:80,  status:'placeholder' },
  { id:3, title:'Learn Lab Series',               date:'Oct 2026',           time:'TBD', loc:'TBD', type:'lab',      desc:'Monthly skill sessions covering React, Figma, Git, agile, and client communication. Hands-on and beginner friendly.',                                        cap:40,  status:'placeholder' },
  { id:4, title:'Fall Info Session',              date:'Sept 2026',          time:'TBD', loc:'TBD', type:'social',   desc:'Learn what Blueprint is, meet the team, and find out how to apply. Food provided. Come as you are.',                                                         cap:60,  status:'upcoming'    },
  { id:5, title:'NPO Showcase Night',             date:'Apr 2027',           time:'TBD', loc:'TBD', type:'flagship', desc:'End of year demo night. Each team presents their delivered software to nonprofit clients, sponsors, faculty, and campus.',                                   cap:120, status:'placeholder' },
  { id:6, title:'Coffee Chats with Industry',     date:'Monthly',            time:'TBD', loc:'TBD', type:'social',   desc:'Monthly 60-minute session with one industry professional. 15 Blueprint members. No slides, just real talk.',                                                 cap:15,  status:'placeholder' },
]

export const TEAM: Member[] = [
  { id:1, name:'Jun Bin Cheng',     role:'Founder',           program:'Ontario Tech University', year:'', initials:'J', isExec:true },
  { id:2, name:'Valerie Ekeigwe',   role:'President',         program:'Ontario Tech University', year:'', initials:'V', isExec:true },
  { id:3, name:'VP of Engineering', role:'VP of Engineering', program:'Ontario Tech University', year:'', initials:'E', isExec:true },
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
    what: 'Build and grow the Blueprint OTU brand across all platforms. Create content that tells our story, documents our work, and brings new members and partners into our orbit.',
    roles: [
      {
        title: 'Social Media Director',
        what: 'Own all Blueprint OTU social channels. Set the content strategy, manage the content calendar, write copy, design posts, and grow our presence on Instagram and LinkedIn.',
        qualifications: [
          'Experience managing a personal or organizational social media account',
          'Strong visual eye and understanding of what performs on Instagram and LinkedIn',
          'Confident, warm writer who can communicate in a non-corporate voice',
          'Consistent with deadlines and comfortable working independently',
          'Photography or video skills are a strong asset but not required',
          'You do not need a huge following — you need genuine curiosity about building one',
        ],
      },
      {
        title: 'Content Creator',
        what: 'Produce reels, graphics, stories, carousels, and written content that brings Blueprint OTU to life across all platforms. You are the voice and face of our day to day.',
        qualifications: [
          'Experience creating content for Instagram, TikTok, or LinkedIn',
          'Comfortable with Canva, CapCut, Adobe, or similar tools',
          'Creative eye for what looks good and what feels authentic',
          'Able to work fast, take direction, and execute independently',
          'No professional portfolio required — show us something you have made',
        ],
      },
      {
        title: 'Photographer / Videographer',
        what: 'Cover Blueprint events, document project work, and create visual assets for the brand. You capture the moments that make people want to join.',
        qualifications: [
          'Access to a camera or smartphone capable of quality photos and video',
          'Basic editing skills using Lightroom, CapCut, Premiere, or similar',
          'Reliable and present at events — this role requires you to show up',
          'Eye for candid, editorial photography rather than just posed shots',
          'A portfolio or camera roll showing your work is helpful but not required',
        ],
      },
      {
        title: 'Director of Design',
        what: 'Own the Blueprint OTU visual identity. Create templates, brand assets, presentation decks, event materials, and ensure design consistency across everything we ship.',
        qualifications: [
          'Strong Figma skills with demonstrated ability to work in a brand system',
          'Portfolio showing range — not just one style',
          'Experience with typography, layout, and visual hierarchy',
          'Able to take a brief and execute without needing constant direction',
          'Motion design or illustration skills are a strong asset',
          'If you have the taste and drive but limited experience, still apply',
        ],
      },
    ],
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
    what: 'Build the culture and connections that make Blueprint OTU more than a club. Own recruitment, partnerships, member experience, and our presence across OTU campus.',
    roles: [
      {
        title: 'Community Director',
        what: 'Own the member experience from onboarding through to semester end. Keep culture strong, resolve conflicts, run check-ins, and make Blueprint feel like a place people want to be.',
        qualifications: [
          'Natural connector who people feel comfortable approaching',
          'Experience leading a team, club, or group in any context',
          'Organized enough to track member wellbeing across a growing organization',
          'Empathetic but direct — you can have hard conversations',
          'No formal HR or management experience required, just genuine people skills',
        ],
      },
      {
        title: 'Outreach / Recruitment Director',
        what: 'Lead all Blueprint OTU recruitment campaigns each semester. Manage applications, coordinate info sessions, represent Blueprint at campus events, and find the right people.',
        qualifications: [
          'Strong written and verbal communicator',
          'Organized and able to manage multiple moving parts at once',
          'Comfortable presenting and tabling on campus',
          'Campus network or familiarity with OTU student organizations is an asset',
          'Experience with recruitment, admissions, or student leadership preferred',
        ],
      },
      {
        title: 'Partnerships Director',
        what: 'Build relationships with companies, student organizations, and community groups. Manage sponsorship outreach, maintain partner relationships, and represent Blueprint externally.',
        qualifications: [
          'Professional and confident written communicator',
          'Persistent with follow-up and comfortable with cold outreach',
          'Organized and able to track multiple relationships simultaneously',
          'Interest in business development, sponsorships, or nonprofit relations',
          'No prior sponsorship experience required — we will teach you the process',
        ],
      },
      {
        title: 'Workshop Director',
        what: 'Plan and run the Blueprint Learn Lab Series. Source speakers, book venues, create materials, promote sessions, and ensure workshops deliver real value to members and campus.',
        qualifications: [
          'Experience planning or facilitating events, workshops, or presentations',
          'Organized and reliable with logistics and follow-through',
          'Comfortable reaching out to speakers and external guests',
          'Creative thinker who can design learning experiences, not just talks',
          'If you have never run a workshop but have strong ideas, still apply',
        ],
      },
    ],
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
    what: 'Ship real software for Durham Region nonprofits. Work in cross-functional teams with designers, PMs, and clients to build production-quality products from scoping through to delivery.',
    roles: [
      {
        title: 'Frontend Developer',
        what: 'Build client-facing features for real nonprofit software products. Work in React or Vue with TypeScript, participate in code reviews, and ship features that real users depend on.',
        qualifications: [
          'Experience building UI components in React, Vue, or similar',
          'Comfortable with TypeScript and version control using Git',
          'Able to read existing code and contribute without breaking things',
          'Understanding of responsive design and accessibility basics',
          'Personal projects or coursework welcome — no job experience required',
          'If you are learning and hungry to grow, that matters more than your current level',
        ],
      },
      {
        title: 'Backend Developer',
        what: 'Build the APIs, databases, and server logic that power nonprofit products. Work alongside frontend developers and PMs to design systems that are reliable and scalable.',
        qualifications: [
          'Experience with Node.js, Python, Go, or similar backend language',
          'Comfortable designing and querying relational or document databases',
          'Understanding of REST APIs and authentication basics',
          'Familiar with version control and collaborative development workflows',
          'Coursework or personal projects count — show us something you have built',
        ],
      },
      {
        title: 'UI/UX Designer',
        what: 'Own the full design process for a nonprofit product from user research through to developer handoff. Create wireframes, prototypes, and high-fidelity designs in Figma.',
        qualifications: [
          'Strong Figma skills — you know components, auto layout, and prototyping',
          'Understanding of UX principles and how to conduct user research',
          'Portfolio showing real design decisions, not just pretty screens',
          'Able to communicate design rationale clearly to developers and clients',
          'Accessibility and inclusive design thinking is a strong asset',
          'If you are earlier in your design journey but have the instincts, apply',
        ],
      },
      {
        title: 'AI/ML Developer',
        what: 'Explore and implement AI features within nonprofit products where they create real value. Work with LLM APIs, build intelligent features, and document what you learn.',
        qualifications: [
          'Experience with Python and at least one ML or AI framework',
          'Familiarity with LLM APIs such as OpenAI, Anthropic, or similar',
          'Curious about applied AI and honest about what it can and cannot do',
          'Able to evaluate whether AI actually improves a product before adding it',
          'Research experience or coursework in ML is helpful but not required',
        ],
      },
      {
        title: 'Mobile Developer',
        what: 'Build iOS or Android features for nonprofit products where mobile is the right solution. Work with cross-functional teams to ship experiences people use in the real world.',
        qualifications: [
          'Experience with React Native, Swift, Kotlin, or Flutter',
          'Familiarity with mobile-specific UX patterns and platform guidelines',
          'Comfortable with version control and collaborative development',
          'Personal projects or app store submissions are a strong asset',
          'If mobile development is where you are headed and you learn fast, apply',
        ],
      },
      {
        title: 'Product / Project Manager',
        what: 'Run a cross-functional project team from scoping through to delivery. Manage sprints, own the client relationship, unblock your team, and ensure the product ships on time.',
        qualifications: [
          'Experience managing group projects, hackathons, or student organizations',
          'Strong communicator who can translate between technical and non-technical stakeholders',
          'Organized with attention to timelines, blockers, and team dynamics',
          'Familiarity with agile or sprint-based workflows is an asset',
          'Technical background preferred but not required — empathy for developers is',
          'Leadership potential matters more than a formal PM title',
        ],
      },
    ],
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
    what: 'Own the strategy, systems, and direction of the chapter. Executive roles require demonstrated leadership, strong communication, and the ability to manage people, processes, and priorities at the same time.',
    roles: [
      {
        title: 'VP Internal',
        what: 'Manage internal operations, member relations, documentation, onboarding, and team health. You are the glue that keeps Blueprint running week to week.',
        qualifications: [
          'Demonstrated experience in an organizational leadership role',
          'Highly organized with strong documentation and follow-through habits',
          'Trustworthy and discreet when handling sensitive team information',
          'Able to proactively identify problems before they become crises',
          'Experience with tools like Notion, Airtable, or similar is an asset',
        ],
      },
      {
        title: 'VP External',
        what: 'Own all external relationships — sponsors, nonprofits, community partners, and press. Represent Blueprint OTU professionally in every external interaction.',
        qualifications: [
          'Professional written and verbal communicator with a strong personal presence',
          'Experience in sponsorship, fundraising, sales, or partnership development',
          'Comfortable with cold outreach and relationship management over time',
          'Strategic thinker who can position Blueprint OTU compellingly to external audiences',
          'Existing relationships within the Durham Region business or nonprofit community is a strong asset',
        ],
      },
      {
        title: 'VP Events',
        what: 'Plan and execute all Blueprint events including Hack for Impact, info sessions, workshops, and socials. You own the calendar, the logistics, and the experience.',
        qualifications: [
          'Demonstrated experience planning and executing events of any scale',
          'Highly organized with the ability to manage venues, catering, RSVPs, and volunteers simultaneously',
          'Calm under pressure and able to make decisions quickly on event day',
          'Creative approach to event design — you think about the experience, not just the logistics',
          'Familiarity with OTSU event booking processes is an asset',
        ],
      },
      {
        title: 'VP Projects',
        what: 'Oversee all nonprofit software projects across the development team. Ensure quality, manage client relationships, track delivery, and support project managers.',
        qualifications: [
          'Technical background with hands-on software development experience',
          'Experience managing or contributing to a multi-person software project',
          'Strong communicator who can represent Blueprint to nonprofit clients professionally',
          'Comfortable with agile workflows, sprint planning, and delivery timelines',
          'Ability to hold teams accountable while staying supportive and constructive',
        ],
      },
      {
        title: 'VP Marketing / Creative',
        what: 'Lead the Creative & Media team and set the overall brand and marketing strategy for Blueprint OTU. Own the story we tell the world.',
        qualifications: [
          'Design or marketing background with a portfolio showing range and craft',
          'Experience leading or managing a creative team or project',
          'Strategic thinker who can connect design decisions to organizational goals',
          'Strong communicator who can give clear, useful creative direction',
          'Familiarity with social media strategy, brand building, and content marketing',
        ],
      },
      {
        title: 'VP Tech / Web',
        what: 'Maintain the Blueprint OTU website, manage technical infrastructure, oversee deployment, and support the development team with tooling and processes.',
        qualifications: [
          'Strong frontend development skills with React and TypeScript',
          'Experience with deployment, hosting, and domain management',
          'Comfortable with Git workflows, CI/CD basics, and developer tooling',
          'Able to independently maintain and update a production codebase',
          'Experience with Vite, GitHub Pages, or similar deployment tools is a strong asset',
        ],
      },
    ],
  },
]

export const ROLE_MAP: Record<string, string[]> = {
  creative:    ['Social Media Director','Content Creator','Photographer / Videographer','Director of Design'],
  community:   ['Community Director','Outreach / Recruitment Director','Partnerships Director','Workshop Director'],
  development: ['Frontend Developer','Backend Developer','UI/UX Designer','AI/ML Developer','Mobile Developer','Product / Project Manager'],
  executive:   ['VP Internal','VP External','VP Events','VP Projects','VP Marketing / Creative','VP Tech / Web'],
}

export const PROCESS_STEPS = [
  { n:'01', title:'Explore teams',      desc:'Browse our four teams and find the one that matches your skills and interests.' },
  { n:'02', title:'Choose your role',   desc:'Click into a team to see all open roles with full qualifications.' },
  { n:'03', title:'Submit application', desc:'Fill out the form honestly. It takes about 15 minutes.' },
  { n:'04', title:'Interview or review',desc:'Some roles include a short conversation, portfolio review, or role-specific follow-up.' },
  { n:'05', title:'Join the cohort',    desc:'Selected applicants are onboarded before the semester begins.' },
]

export const FAQ = [
  { q:'Do I need experience?',                  a:'It depends on the role. Creative and community roles are beginner-friendly. Technical and executive roles require demonstrated ability. But across every role, we care more about your drive and honesty than your resume.' },
  { q:'Do I need to meet every qualification?', a:'No. Qualifications are guidelines, not gates. If you have some of the listed skills and genuine motivation to learn the rest, we want to hear from you. Apply and tell us your story.' },
  { q:'How much time is required?',             a:'All selected members commit approximately 12 hours per week minimum. Some roles, especially executive and project-facing ones, may require more during busy periods.' },
  { q:'Can first-years apply?',                 a:'Yes. First-years are welcome if you are reliable, motivated, and ready to contribute consistently from day one.' },
  { q:'Can non-engineering students apply?',    a:'Absolutely. Blueprint needs designers, communicators, event planners, storytellers, and strategists just as much as developers. Your program is not a barrier.' },
  { q:'Can I apply to more than one role?',     a:'Yes. Select your strongest fit as your primary role, then choose a secondary team or role if you are genuinely open to being considered elsewhere. Do not pick a second role just to increase your chances.' },
  { q:'What happens after I apply?',            a:'Applications are reviewed by the leadership team. Some applicants will be invited for a short conversation. You will hear back via your OTU email within 7 days.' },
  { q:'Is this paid?',                          a:'No. Blueprint OTU is a volunteer student organization. We are here for the experience, the community, and the impact, not a paycheque.' },
  { q:'What if I do not have an OTU email yet?', a:'If you are an incoming student who does not have your OTU email yet, apply with your personal email and note that in your application.' },
]

export const TICKER = [
  'Technology for Good','Ontario Tech University','Durham Region',
  'Pro Bono Software','Student Developers','Community Impact',
  'Hack for Impact','Applications Open Now',
  'Zero Cost to Nonprofits','First Cohort Fall 2026',
]