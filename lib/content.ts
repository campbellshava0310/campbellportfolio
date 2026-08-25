/**
 * Single source of truth for every fact on this site.
 *
 * Everything here is drawn from the CV or from work that exists publicly.
 * Nothing is inferred, rounded up, or invented — if a number appears below,
 * it appears in the CV.
 */

export const profile = {
  name: "Chiurai Campbell Shava Mgonie",
  shortName: "Campbell Shava",
  role: "Software Engineer / Java Engineer",
  secondRole: "Software Project Manager",
  location: "Harare, Zimbabwe",
  timezone: "GMT+2",
  email: "shavachiurai@gmail.com",
  linkedin: {
    url: "https://www.linkedin.com/in/chiurai-campbell-shava-mgonie-530653228",
    handle: "Campbell Shava",
  },
  github: {
    url: "https://github.com/campbellshava2",
    handle: "campbellshava2",
  },
  resume: "/Chiurai-Campbell-Shava-Mgonie-CV.pdf",
  /** Hero positioning. Concrete, present tense, no adjectives about myself. */
  positioning:
    "I build backend systems that run in production — REST services, payment integrations and the Linux infrastructure underneath them. Two years across fintech platforms, distributed systems and shipping software with a team.",
  /** One-line summary used for metadata and the footer. */
  summary:
    "Software engineer with two years in backend development, distributed systems and fintech platforms. Java, Python, Spring Boot, Django, Docker on Linux.",
} as const

export const heroMeta = [
  { label: "Based", value: "Harare, Zimbabwe" },
  { label: "Focus", value: "Backend & distributed systems" },
  { label: "Core", value: "Java · Python" },
  { label: "Also", value: "Product & delivery" },
] as const

export const navigation = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Engineering", href: "#engineering" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const

/* -------------------------------------------------------------------------- */
/*  Ripple — flagship product                                                  */
/* -------------------------------------------------------------------------- */

export const rippleLinks = {
  site: "https://www.ripplestayconnected.com/",
  admin: "https://admindashboard.ripplestayconnected.com/",
  play: "https://play.google.com/store/apps/details?id=com.nojvatech.ripple",
  appStore: "https://apps.apple.com/zw/app/ripple-stay-connected/id6748481065",
} as const

export const ripple = {
  name: "Ripple",
  tagline: "Stay Connected",
  category: "Social platform · Events · Mobile product",
  role: "Lead Software Engineer",
  org: "Navjo Synk Solutions",
  period: "2025 — 2026",
  platforms: "iOS · Android · Web",
  /** Two sentences, above the fold on the case study. */
  intro:
    "An events-driven social platform. People discover what is happening around them, buy a ticket, and keep up with the circles they actually care about — in one app, on iOS and Android.",
  facts: [
    { k: "Role", v: "Lead Software Engineer" },
    { k: "Organisation", v: "Navjo Synk Solutions" },
    { k: "Period", v: "2025 — 2026" },
    { k: "Platforms", v: "iOS · Android · Web" },
  ],
} as const

/** One engineering surface of the system, and what was built on it. */
export type Surface = {
  title: string
  stack: readonly string[]
  points: readonly string[]
}

export type Chapter = {
  id: string
  index: string
  title: string
  lead: string
  body: readonly string[]
  facts?: readonly { k: string; v: string }[]
  surfaces?: readonly Surface[]
}

export const rippleChapters: readonly Chapter[] = [
  {
    id: "overview",
    index: "01",
    title: "Overview",
    lead: "A social platform organised around events rather than a feed.",
    body: [
      "Ripple brings together the two things that usually live in separate apps: the event you want to attend, and the people you want to attend it with. Users discover events on a map, pay for them inside the app, and stay connected to their circles around them.",
      "I led the backend and the platform work — the Java Spring Boot services, the data layer, the payment integration and the deployment that puts all of it in front of users. The product ships on the App Store and Google Play, with a public site and an internal admin platform behind it.",
    ],
    facts: [
      { k: "Role", v: "Lead Software Engineer" },
      { k: "Team", v: "Navjo Synk Solutions" },
      { k: "Surface", v: "Mobile, web, admin" },
      { k: "Status", v: "Live in both app stores" },
    ],
  },
  {
    id: "problem",
    index: "02",
    title: "The problem",
    lead: "Event discovery, payment and the social layer were three disconnected things.",
    body: [
      "Finding out what is happening near you meant scrolling social feeds. Paying for it meant a separate channel entirely, and mobile money is how most people in this market actually pay. Knowing who else was going meant asking around.",
      "Each hand-off between those steps is a place people drop out. The product problem was to collapse discovery, payment and the social signal into one flow — and the engineering problem was to make that flow fast and reliable on mobile networks, with money moving through it.",
    ],
    facts: [],
  },
  {
    id: "product",
    index: "03",
    title: "Product",
    lead: "Discovery on a map, payment in-app, and circles that make it social.",
    body: [
      "Events are geolocated, so discovery starts with a map rather than a search box. Payment runs through EcoCash, the mobile money rail people already use, so the transaction never leaves the app. Chat and social interaction keep the event connected to the people attending it.",
      "The admin platform is the other half of the product: whoever runs an event needs to see attendance, revenue and activity without asking an engineer for a database query.",
    ],
    facts: [
      { k: "Discovery", v: "Mapbox geolocation" },
      { k: "Payments", v: "EcoCash gateway" },
      { k: "Social", v: "Firebase chat" },
      { k: "Access", v: "Role-based permissions" },
    ],
  },
  {
    id: "engineering",
    index: "04",
    title: "Engineering",
    lead: "A Spring Boot service layer, a React Native client, and containers on a Linux VPS.",
    body: [
      "The system is a REST backend in Java Spring Boot, a React Native client on both mobile platforms, and a separate Django application for administration. MongoDB holds the primary data, Redis carries the caching layer, and the whole thing runs as containers behind Nginx.",
    ],
    facts: [],
    /** The four engineering surfaces, each with what was actually built. */
    surfaces: [
      {
        title: "Backend",
        stack: ["Java", "Spring Boot", "MongoDB", "Redis"],
        points: [
          "RESTful APIs in Java Spring Boot as the single service layer for mobile and admin clients.",
          "MongoDB as the primary datastore, with Redis caching in front of the read paths.",
          "Java connection pooling to keep database connections efficient under concurrent load.",
          "Authentication and authorisation with a role-based access control system for permissions.",
          "EcoCash payment gateway integrated for secure transaction processing.",
        ],
      },
      {
        title: "Mobile",
        stack: ["React Native", "Mapbox", "Firebase"],
        points: [
          "One React Native codebase shipping to both the App Store and Google Play.",
          "Mapbox for geolocation and map-led event discovery.",
          "Firebase powering chat and the social side of the product.",
          "Event browsing, ticketing and social interaction as the core mobile flows.",
        ],
      },
      {
        title: "Infrastructure",
        stack: ["Docker", "Linux VPS", "Nginx"],
        points: [
          "Containerised services deployed on a Linux VPS with Docker.",
          "Nginx in front for load balancing across service containers.",
          "Deployed against a 95% uptime SLA — the target the platform was contracted to hold.",
          "Redis caching to keep response times off the database on hot paths.",
        ],
      },
      {
        title: "Admin platform",
        stack: ["Django", "Bootstrap", "JavaScript"],
        points: [
          "A separate Django web application for platform administration.",
          "Event monitoring, financial reporting and user-activity views, presented as graphs.",
          "PDF generation for reports that leave the system.",
          "Two-factor authentication on admin access.",
        ],
      },
    ],
  },
]


/* -------------------------------------------------------------------------- */
/*  Other projects                                                             */
/* -------------------------------------------------------------------------- */

export type Project = {
  id: string
  title: string
  category: string
  year: string
  summary: string
  detail: string
  stack: readonly string[]
  role: string
  outcome?: string
  image?: { src: string; alt: string }
  links?: readonly { label: string; href: string; external?: boolean }[]
}

export const projects: readonly Project[] = [
  {
    id: "ripple-admin",
    title: "Ripple Admin Dashboard",
    category: "Internal platform",
    year: "2025 — 2026",
    summary:
      "The operations side of Ripple: event monitoring, financial reporting and user activity for the people running the platform.",
    detail:
      "A Django web application built alongside the Ripple product. It surfaces event monitoring, financial reports and user activity as graphs, generates PDF reports, and is protected by two-factor authentication on admin access.",
    stack: ["Django", "Bootstrap", "JavaScript", "HTML", "2FA"],
    role: "Lead Software Engineer · Navjo Synk Solutions",
    outcome: "In production alongside the Ripple mobile product.",
    links: [{ label: "Open dashboard", href: rippleLinks.admin, external: true }],
  },
  {
    id: "bmx",
    title: "IoT BMX Racing Timing & AI Insights",
    category: "Real-time systems · Research",
    year: "2024 — 2025",
    summary:
      "Hardware-timed race capture on Raspberry Pi sensors, streamed live over WebSockets, with regression modelling over the results.",
    detail:
      "Final-year research project. RFID and infrared sensors on Raspberry Pi units capture riders at gate and finish; readings stream over WebSockets into a Django backend for live timing. A regression model built with Scikit-learn predicts race outcomes and analyses deviation from a rider's expected performance, and the Claude API turns those results into personalised performance insights for each rider.",
    stack: [
      "Django",
      "Raspberry Pi",
      "RFID",
      "IR sensors",
      "WebSockets",
      "Scikit-learn",
      "Claude API",
      "MySQL",
    ],
    role: "Sole engineer · BSc research project, NUST",
    outcome: "Graded with distinction as part of a First Class degree.",
    image: {
      src: "/bmx-track.jpg",
      alt: "Riders warming up on the BMX track the timing system was built for",
    },
    links: [{ label: "Source", href: "https://github.com/campbellshava2/BMX-management-system", external: true }],
  },
  {
    id: "lunch",
    title: "Lunch Ordering Automation",
    category: "Internal automation",
    year: "2023 — 2024",
    summary:
      "An internal ordering workflow built on the Microsoft 365 stack, replacing a manual process across the business.",
    detail:
      "Built at First Mutual Holdings on Power Apps and SharePoint, using the tooling the organisation already had rather than introducing a new system to support. The workflow moved staff lunch ordering off manual coordination and onto a structured form and list.",
    stack: ["Microsoft Power Apps", "SharePoint", "Microsoft 365"],
    role: "ICT Attaché · First Mutual Holdings",
    outcome: "Reduced ordering errors by 30% and improved staff satisfaction by 25%.",
  },
] as const

/* -------------------------------------------------------------------------- */
/*  Experience                                                                 */
/* -------------------------------------------------------------------------- */

export type Role = {
  id: string
  company: string
  title: string
  period: string
  current?: boolean
  context: string
  points: readonly string[]
  stack?: readonly string[]
}

export const experience: readonly Role[] = [
  {
    id: "ecocash",
    company: "EcoCash",
    title: "Software Project Management Trainee",
    period: "2026",
    current: true,
    context: "Mobile money and fintech platform.",
    points: [
      "Led project and Scrum teams from project onboarding through to completion.",
      "Worked between business teams and software developers to keep delivery moving without translation loss.",
      "Facilitated handover of completed projects from development to the Product Owners.",
    ],
    stack: ["Scrum", "Delivery", "Stakeholder management"],
  },
  {
    id: "navjo",
    company: "Navjo Synk Solutions",
    title: "Lead Software Engineer",
    period: "2025 — 2026",
    context: "Software company. Home of Ripple — Stay Connected.",
    points: [
      "Led development of scalable applications and managed software development teams.",
      "Owned the full project lifecycle, from design through to deployment.",
      "Built the Ripple backend in Java Spring Boot — REST APIs over MongoDB, Redis caching, and connection pooling for efficient database access.",
      "Deployed containerised services on a Linux VPS with Docker and Nginx load balancing, against a 95% uptime SLA.",
      "Integrated the EcoCash payment gateway for secure transaction processing, and an RBAC system for role-based permissions.",
      "Built the Ripple Admin Dashboard in Django — event monitoring, financial reporting, PDF generation and 2FA.",
    ],
    stack: ["Java", "Spring Boot", "MongoDB", "Redis", "Docker", "Nginx", "Django"],
  },
  {
    id: "first-mutual",
    company: "First Mutual Holdings Limited",
    title: "ICT Attaché",
    period: "2023 — 2024",
    context: "Financial services group — insurance, health and fintech systems.",
    points: [
      "Supported and troubleshot fintech, insurtech and health enterprise systems — Sage 300, Sage 100, Exergy, Musoni, Holistic Insurance Platform, Promedic and ProPharm — across 9 business units, holding 99% system uptime.",
      "Administered Azure Active Directory servers and maintained RBAC across company systems and machines.",
      "Migrated local backups to the cloud using Microsoft Azure services.",
      "Ran user education on security and ICT policy to keep the estate secure.",
      "Built an internal lunch ordering automation on Power Apps and SharePoint.",
    ],
    stack: ["Microsoft Azure", "Azure AD", "RBAC", "Power Apps", "SharePoint"],
  },
] as const

/* -------------------------------------------------------------------------- */
/*  Skills — a taxonomy, not a scoreboard                                      */
/* -------------------------------------------------------------------------- */

export const skillGroups = [
  {
    title: "Languages",
    items: ["Java", "Python", "JavaScript", "React Native", "Node.js", "JavaFX"],
  },
  {
    title: "Backend",
    items: ["Spring Boot", "Django", "Django REST Framework", "REST APIs"],
  },
  {
    title: "Data",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "SQL"],
  },
  {
    title: "Infrastructure",
    items: ["Docker", "Linux", "Nginx", "GitHub Actions", "AWS", "Microsoft Azure"],
  },
  {
    title: "Systems",
    items: ["Distributed systems", "WebSockets", "RBAC", "2FA", "Load balancing"],
  },
  {
    title: "AI / ML",
    items: ["RAG", "Feature engineering", "Scikit-learn", "KNN", "TensorFlow", "PyTorch", "AI ethics"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Postman", "Firebase", "Jira", "Power BI", "Excel"],
  },
] as const

/* -------------------------------------------------------------------------- */
/*  Education & certifications                                                 */
/* -------------------------------------------------------------------------- */

export const education = [
  {
    qualification: "Master of Technology — Software Engineering",
    institution: "Harare Institute of Technology",
    period: "2026 — 2028",
    status: "In progress",
    note: null,
  },
  {
    qualification: "BSc Honours in Computer Science",
    institution: "National University of Science and Technology",
    period: "2021 — 2025",
    status: "First Class",
    note: "Research project: IoT BMX Racing Timing & AI Insights System.",
  },
] as const

export const certifications = [
  { name: "Microsoft Azure Fundamentals", code: "AZ-900" },
  { name: "Project Management Fundamentals", code: null },
  { name: "IBM Cybersecurity Fundamentals", code: null },
  { name: "ISC2 Cybersecurity", code: "Candidate" },
] as const

/* -------------------------------------------------------------------------- */
/*  About                                                                      */
/* -------------------------------------------------------------------------- */

export const about = {
  paragraphs: [
    "I work on the backend. Most of what I have built sits behind an interface someone else uses — service layers, data access, payment integrations, the access control that decides who can do what, and the Linux boxes it all runs on.",
    "That work has mostly been in financial services. Two years supporting insurance, health and fintech systems at First Mutual taught me what production actually costs when it breaks, and leading engineering on Ripple at Navjo Synk taught me the other half: designing a system, getting a team through the lifecycle, and putting it in front of real users on two app stores.",
    "At EcoCash I have been on the delivery side of the same problem — running Scrum teams from onboarding to handover, and sitting between business and engineering where most projects are actually won or lost. It is a useful angle on the work; knowing how a system gets built and how it gets delivered are not the same skill.",
    "I am reading for a Master of Technology in Software Engineering, and the direction I keep pulling towards is DevOps, cloud computing and enterprise system design — the parts of the job concerned with how software stays up, not just how it gets written.",
  ],
} as const
