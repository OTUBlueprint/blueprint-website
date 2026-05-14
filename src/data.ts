import type { BpEvent, Member } from './types'

export const NAV_PAGES: { key: string; label: string }[] = [
  { key: 'home',       label: 'Home'       },
  { key: 'about',      label: 'About'      },
  { key: 'projects',   label: 'Projects'   },
  { key: 'events',     label: 'Events'     },
  { key: 'team',       label: 'Team'       },
  { key: 'nonprofits', label: 'Nonprofits' },
  { key: 'sponsors',   label: 'Sponsors'   },
  { key: 'apply',      label: 'Apply'      },
  { key: 'social',     label: 'Social'     },
]

export const EVENTS: BpEvent[] = [
  { id:1, title:'Hack for Impact',                  date:'November 1st, 2026', time:'TBD', loc:'TBD', type:'flagship', desc:'Our first annual hackathon. Student teams build real tech solutions for Durham Region nonprofits. Open to every program at OTU.',                                                              cap:100, status:'upcoming'     },
  { id:2, title:'Tech for Good Panel',              date:'Nov 2026',           time:'TBD', loc:'TBD', type:'panel',    desc:'90 minutes with OTU professors, Durham nonprofit leaders, and people working in social impact tech. Open to the whole campus.',                                                              cap:80,  status:'placeholder'  },
  { id:3, title:'Blueprint Bytes Workshop Series',  date:'Oct 2026',           time:'TBD', loc:'TBD', type:'workshop', desc:'Monthly skill workshops covering React, Figma, Git, agile, and client communication. No experience required.',                                                                             cap:40,  status:'placeholder'  },
  { id:4, title:'Fall Info Session',                date:'Sept 2026',          time:'TBD', loc:'TBD', type:'social',   desc:'Learn what Blueprint is, meet the team, and find out how to apply. Food provided. Come as you are.',                                                                                        cap:60,  status:'upcoming'     },
  { id:5, title:'NPO Showcase Night',               date:'Apr 2027',           time:'TBD', loc:'TBD', type:'flagship', desc:'End of year demo night. Each team presents their delivered software to nonprofit clients, sponsors, faculty, and campus.',                                                                  cap:120, status:'placeholder'  },
  { id:6, title:'Coffee Chats with Industry',       date:'Monthly',            time:'TBD', loc:'TBD', type:'social',   desc:'Monthly 60-minute session with one industry professional. 15 Blueprint members. No slides, just real talk.',                                                                               cap:15,  status:'placeholder'  },
]

export const TEAM: Member[] = [
  { id:1, name:'Jun Bin Cheng',     role:'Founder',           program:'Ontario Tech University', year:'', initials:'J', isExec:true },
  { id:2, name:'Valerie Ekeigwe',   role:'President',         program:'Ontario Tech University', year:'', initials:'V', isExec:true },
  { id:3, name:'VP of Engineering', role:'VP of Engineering', program:'Ontario Tech University', year:'', initials:'E', isExec:true },
  { id:4, name:'VP of Design',      role:'VP of Design',      program:'Ontario Tech University', year:'', initials:'D', isExec:true },
]

export const TICKER = [
  'Technology for Good', 'Ontario Tech University', 'Durham Region',
  'Pro Bono Software', 'Student Developers', 'Community Impact',
  'Hack for Impact', 'Applications Open May 20th',
  'Zero Cost to Nonprofits', 'First Cohort Fall 2026',
]

export const OPEN_ROLES = [
  {
    title: 'Developer', count: 'Multiple',
    desc: 'Build real web and mobile applications for nonprofit clients alongside a team of developers and designers.',
    skills: ['React or Vue', 'TypeScript', 'Git and GitHub', 'Node.js or similar backend'],
    responsibilities: [
      'Build features for a real nonprofit client web or mobile application',
      'Participate in weekly sprints, stand-ups, and code reviews',
      'Review pull requests from teammates and give constructive feedback',
      'Attend client meetings alongside your Project Lead',
      'Write clean, documented code and contribute to architecture decisions',
      'Present progress at our end of semester NPO Showcase Night',
    ],
    qualifications: [
      'Genuine curiosity about how software solves real community problems',
      'Ability to learn new tools and frameworks quickly',
      'Comfortable with version control and collaborative workflows',
      'No minimum GPA or years of experience required',
      'Must be a current OTU student',
    ],
  },
  {
    title: 'Product Designer', count: 'Multiple',
    desc: 'Own the full UX and UI of a product used by real community members. Work directly with developers and clients.',
    skills: ['Figma', 'User research', 'Prototyping', 'Design systems'],
    responsibilities: [
      'Own the full UX and UI for one nonprofit project from research through to developer handoff',
      'Conduct user interviews with real nonprofit clients and their end users',
      'Build wireframes, prototypes, and final high-fidelity designs in Figma',
      'Work directly with developers to ensure your designs ship accurately',
      'Present design decisions to nonprofit clients at check-in meetings',
      'Contribute to the Blueprint OTU design system and brand consistency',
    ],
    qualifications: [
      'Strong Figma skills or demonstrated ability to learn quickly',
      'Empathy for non-technical users and accessible design thinking',
      'Ability to explain and defend design decisions clearly',
      'Portfolio not required but welcomed',
      'Must be a current OTU student',
    ],
  },
  {
    title: 'Illustrator / Motion Designer', count: '3 spots',
    desc: 'Create visual assets, motion graphics, and illustrations that bring Blueprint brand and projects to life.',
    skills: ['After Effects or similar', 'Illustration', 'Brand storytelling', 'Figma'],
    responsibilities: [
      'Create illustrations, motion graphics, and visual assets for Blueprint OTU brand and projects',
      'Design social media content, event materials, and presentation decks',
      'Collaborate with the VP of Design on visual identity and brand consistency',
      'Animate elements for the website, events, and presentations',
      'Deliver assets on time and at production quality for all Blueprint touchpoints',
    ],
    qualifications: [
      'Strong illustration or motion design portfolio demonstrating range and craft',
      'Proficiency in After Effects, Adobe Illustrator, or equivalent tools',
      'Ability to work within and extend an existing brand system',
      'Creative problem solver who can translate ideas into visuals quickly',
      'Must be a current OTU student',
    ],
  },
  {
    title: 'Social Media Manager', count: '1 spot',
    desc: 'Own Blueprint OTU Instagram, LinkedIn, and all social content. Build our presence on campus and beyond.',
    skills: ['Content creation', 'Instagram and LinkedIn', 'Photography', 'Copywriting'],
    responsibilities: [
      'Plan and publish weekly content across Instagram and LinkedIn',
      'Cover Blueprint events through photography, video, and live updates',
      'Write all social copy in a human, non-corporate voice consistent with Blueprint brand',
      'Grow our campus following and track engagement metrics each month',
      'Coordinate with the VP of Marketing on campaign strategy and content calendar',
      'Pitch creative content ideas and execute them independently',
    ],
    qualifications: [
      'Strong eye for visual content and understanding of what performs well on each platform',
      'Familiarity with Instagram and LinkedIn best practices',
      'Ability to write in a warm, confident, non-corporate voice',
      'Consistent and reliable with content deadlines',
      'Photography or video skills are a strong asset',
    ],
  },
  {
    title: 'Finance Officer', count: '2 spots',
    desc: 'Manage club finances, track budgets, handle reimbursements, and support sponsorship financial reporting.',
    skills: ['Budgeting basics', 'Excel or Google Sheets', 'Attention to detail', 'Organizational skills'],
    responsibilities: [
      'Track all Blueprint OTU income and expenses in a shared ledger',
      'Process member and vendor reimbursements in a timely manner',
      'Assist the VP External with sponsorship invoicing and financial reporting',
      'Prepare semesterly budget summaries for the exec team',
      'Ensure all OTSU financial compliance requirements are met',
      'Flag any budget concerns to leadership proactively',
    ],
    qualifications: [
      'Comfortable with spreadsheets and basic accounting or bookkeeping concepts',
      'Detail-oriented and trustworthy when handling financial information',
      'Organized and reliable with recurring administrative tasks',
      'Familiarity with OTSU financial processes is an asset but not required',
      'Must be a current OTU student',
    ],
  },
  {
    title: 'Event Coordinator', count: '2 spots',
    desc: 'Plan and execute Blueprint events including workshops, panels, and Hack for Impact. You run the show.',
    skills: ['Event planning', 'Logistics', 'Communication', 'Creative thinking'],
    responsibilities: [
      'Plan and execute Blueprint OTU events from concept through to day-of logistics',
      'Book rooms through OTSU, coordinate catering, manage RSVPs, and run event communications',
      'Lead the planning committee for Hack for Impact, our flagship annual hackathon',
      'Brief all volunteers and team members before each event',
      'Debrief after every event and document what worked and what to improve',
      'Maintain an events calendar and ensure nothing falls through the cracks',
    ],
    qualifications: [
      'Highly organized with the ability to manage multiple moving parts simultaneously',
      'Strong communicator who can coordinate across exec, members, and external partners',
      'Reliable and calm under pressure when things do not go to plan',
      'Previous event planning experience is an asset but not required',
      'Must be a current OTU student',
    ],
  },
  {
    title: 'Sponsorship Associate', count: 'Multiple',
    desc: 'Build relationships with companies, reach out to sponsors, and secure partnerships that fund what we do.',
    skills: ['Outreach and communication', 'Professional writing', 'Research', 'Persistence'],
    responsibilities: [
      'Research companies aligned with Blueprint OTU mission and build a target outreach list',
      'Send and follow up on sponsorship outreach emails on behalf of Blueprint OTU',
      'Manage the sponsor pipeline and track all outreach in a shared document',
      'Assist in preparing sponsorship decks and customized proposals',
      'Maintain ongoing relationships with active sponsors through updates and touchpoints',
      'Represent Blueprint OTU professionally in all external communications',
    ],
    qualifications: [
      'Confident and persuasive written communicator',
      'Comfortable with cold outreach and persistent follow-up without being pushy',
      'Organized with the ability to track multiple relationships simultaneously',
      'Interest in business development, partnerships, or fundraising',
      'Must be a current OTU student',
    ],
  },
]

export const UPCOMING_ROLES = [
  { title:'VP Technology',               desc:'Oversee all technical project teams and set engineering standards across Blueprint OTU.' },
  { title:'Workshop Lead',               desc:'Design and run our Blueprint Bytes workshop series for students across OTU.' },
  { title:'Community Outreach Lead',     desc:'Build relationships with Durham Region nonprofits and community organizations.' },
  { title:'Photographer / Content Creator', desc:'Capture Blueprint events, project work, and team culture in photos and video.' },
  { title:'Project Manager',             desc:'Lead a client-facing project team from scoping through to final delivery each semester.' },
]

export const PROCESS_STEPS = [
  { n:'01', title:'Apply Online',  desc:'Fill out the application form. It takes about 15 minutes. No portfolio required, just your honest answers.' },
  { n:'02', title:'Review Period', desc:'Our team reviews every application within 7 days. We look for drive and curiosity, not credentials.' },
  { n:'03', title:'Interview',     desc:'A short 20-minute conversation with two Blueprint members. No technical tests. Just a real chat.' },
  { n:'04', title:'Decision',      desc:'You hear back within 5 business days. Accepted members receive an onboarding package and meeting invite.' },
]

export const FAQ = [
  { q:'Who can apply to Blueprint OTU?',           a:'Any Ontario Tech University student regardless of program. We have developers, designers, business students, and everyone in between.' },
  { q:'Do I need prior experience?',               a:'No. We care about your drive and curiosity far more than your resume. Many of our best members had zero professional experience when they joined.' },
  { q:'What is the time commitment?',              a:'Most roles require 8 to 12 hours per week. Project leads commit 15 to 20 hours. We are transparent about this upfront so you can make an informed decision.' },
  { q:'What tech stack does Blueprint use?',       a:'We primarily build with React, TypeScript, Node.js, and PostgreSQL. Designers use Figma. Project managers use Notion and Linear. You do not need to know all of these before joining.' },
  { q:'When does recruitment open?',               a:'Applications open May 20th and close July 1st. We recruit again every January. Keep an eye on our Instagram for updates.' },
  { q:'How does the interview work?',              a:'It is a 20-minute video call with two Blueprint members. We will ask about your interest in tech for good, your experience so far, and what you hope to build. No surprise technical questions.' },
  { q:'Can I apply to multiple roles?',            a:'Yes. You can select up to two roles in your application. Just be specific about which one is your first preference.' },
  { q:'What happens after I am accepted?',         a:'You receive a welcome package with everything you need. Then an onboarding session, a team assignment, and your first sprint within two weeks.' },
  { q:'Is Blueprint OTU affiliated with Cal Blueprint?', a:'We are inspired by and connected to the global Blueprint network founded at UC Berkeley. We operate independently as the Ontario Tech University chapter.' },
  { q:'I am not in Computer Science. Can I still apply?', a:'Absolutely. Blueprint needs designers, communicators, finance minds, event planners, and storytellers just as much as developers. Your program is not a barrier.' },
]