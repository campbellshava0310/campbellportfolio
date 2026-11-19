/**
 * Single source of truth for every fact and asset on this site.
 *
 * Everything here comes from the CV, from work that exists publicly, or from
 * Ripple's own published material. Nothing is inferred or rounded up — if a
 * number appears below, it appears in the CV.
 */

export const profile = {
  name: "Chiurai Campbell Shava Mgonie",
  shortName: "Campbell Shava",
  role: "Software Engineer",
  roleLong: "Software Engineer / Java Engineer",
  secondRole: "Software Project Manager",
  location: "Harare, Zimbabwe",
  timezone: "GMT+2",
  email: "shavachiurai@gmail.com",
  linkedin: {
    url: "https://www.linkedin.com/in/chiurai-campbell-shava-mgonie-530653228",
    handle: "Campbell Shava",
  },
  github: { url: "https://github.com/campbellshava2", handle: "campbellshava2" },
  resume: "/Chiurai-Campbell-Shava-Mgonie-CV.pdf",
  positioning:
    "I build backend systems and ship the products on top of them — REST services, payment integrations, mobile clients and the Linux infrastructure underneath. Currently running software project delivery at EcoCash.",
  summary:
    "Software engineer and project manager working across backend development, distributed systems and fintech platforms. Java, Spring Boot, Python, Django, React Native and Docker on Linux.",
} as const

export const heroMeta = [
  { label: "Now", value: "Software Project Manager, EcoCash" },
  { label: "Focus", value: "Backend & distributed systems" },
  { label: "Core", value: "Java · Python · React Native" },
  { label: "Based", value: "Harare, Zimbabwe" },
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
  period: "2025 — 2026",
  logo: "/ripple/logo.png",
  intro:
    "An events-driven social platform. People find what is happening around them on a map, sign up inside the app, and stay connected to the circles they actually care about — shipped on iOS and Android.",
  facts: [
    { k: "Role", v: "Lead Software Engineer" },
    { k: "Organisation", v: "Navjo Synk Solutions" },
    { k: "Period", v: "2025 — 2026" },
    { k: "Platforms", v: "iOS · Android · Web" },
  ],
} as const

/** Marketing screens published on ripplestayconnected.com. */
export const rippleShots = [
  {
    src: "/ripple/app-01-discover.jpg",
    caption: "Discover",
    alt: "Ripple app showing a map of Harare with nearby people and a profile card",
  },
  {
    src: "/ripple/app-02-events.jpg",
    caption: "Events nearby",
    alt: "Ripple app showing events on a map, filtered by Business, Leisure and Education",
  },
  {
    src: "/ripple/app-03-create.jpg",
    caption: "Create an event",
    alt: "Ripple create-event form with cover image, location, start and end times, and visibility",
  },
  {
    src: "/ripple/app-04-stories.jpg",
    caption: "Stories",
    alt: "Ripple app showing the stories menu over a city map",
  },
  {
    src: "/ripple/app-05-signup.jpg",
    caption: "Register",
    alt: "Ripple event detail screen with date, location map and a register action",
  },
] as const

/* -------------------------------------------------------------------------- */
/*  IrrigaIQ — farm water-intelligence platform                                */
/* -------------------------------------------------------------------------- */

export const irrigaiqRepos = {
  backend: "https://github.com/campbellshava0310/IrrigaIQ-Backend",
  web: "https://github.com/campbellshava0310/IrrigaIQ-Web",
  mobile: "https://github.com/campbellshava0310/IrrigaIQ-MobileApp",
  ml: "https://github.com/campbellshava0310/IrrigaIQ-ML",
} as const

export const irrigaiq = {
  name: "IrrigaIQ",
  tagline: "Farm water intelligence",
  category: "Agritech platform · Backend · ML",
  period: "2026",
  logo: "/irrigaiq/logo.png",
  intro:
    "A platform that helps farms irrigate less and grow more, and keeps the water infrastructure running. Four services I designed and built end to end: a Spring Boot API, a React dashboard, an Expo field app, and a Python model service.",
  image: {
    src: "/irrigaiq/pivot-aerial.jpg",
    alt: "Aerial view of a centre-pivot irrigation circle, from IrrigaIQ's product imagery",
  },
  secondImage: {
    src: "/irrigaiq/drip-lines.jpg",
    alt: "Drip irrigation lines running between rows of crops, from IrrigaIQ's product imagery",
  },
  /** The web app's own imagery — the ground the platform is built for. */
  gallery: [
    { src: "/irrigaiq/farmer.jpg", alt: "A farmer inspecting soybean plants in a field below hills" },
    { src: "/irrigaiq/sprinkler.jpg", alt: "A field sprinkler running at golden hour" },
    { src: "/irrigaiq/maize.jpg", alt: "A maize field under an open sky" },
    { src: "/irrigaiq/phone.jpg", alt: "A phone held up in a field at dusk" },
  ],
  facts: [
    { k: "Role", v: "Sole engineer, all four services" },
    { k: "Period", v: "2026" },
    { k: "Status", v: "In development · source public" },
    { k: "Licence", v: "MIT" },
  ],
  /** What the product has to deal with. Straight from the product/UX notes. */
  context: [
    {
      title: "Power constrains irrigation, not just water",
      body: "Scheduled load-shedding means grid pumps only run in known windows, and solar pumps only in daylight. Every recommendation is scheduled inside the pump's window and split across runs when it does not fit, with the energy cost shown.",
    },
    {
      title: "The sensors are not there yet",
      body: "It has to be useful on day one from the forecast and what the team records. So every screen shows how confident the advice is, and what would sharpen it — a soil check, the farm's coordinates, a measured application rate.",
    },
    {
      title: "Phones in the field, in bright sun, with gloves on",
      body: "The dashboard is the planning tool and the mobile app is the field tool, both reading the same recommendations so the office and the field never disagree. Large touch targets, short forms, a text label on every colour.",
    },
  ],
  services: [
    {
      title: "Backend",
      stack: ["Java 17", "Spring Boot 4", "PostgreSQL 18 + pgvector", "Flyway", "Testcontainers"],
      points: [
        "A modular monolith packaged by feature — each module owns its entities, services and web adapters, and cross-module calls go through services rather than another module's tables.",
        "Spring Security as a JWT resource server, RS256 keys published at a JWKS endpoint, with an append-only audit trail of security events.",
        "RFC 9457 problem responses, request-id correlation, a job lock and idempotency keys for retried writes.",
        "Per-farm settings resolved default → platform → farm, declared in code by the module that owns them, validated and audited.",
      ],
    },
    {
      title: "Agronomy",
      stack: ["FAO-56", "FAO-33", "Open-Meteo"],
      points: [
        "A FAO-56 soil water balance as pure calculation — crop and soil parameters, with FAO-33 yield response.",
        "Open-Meteo forecast and recent history per farm, cached daily, with a deterministic climatology fallback so the platform still works offline.",
        "The water balance owns volumes, run times and timing. The models are a second opinion, never the source of truth.",
      ],
    },
    {
      title: "Model service",
      stack: ["Python", "FastAPI", "scikit-learn", "Isolation Forest", "ONNX"],
      points: [
        "Irrigation need: gradient boosting, chosen over random forest and logistic regression by cross-validation. Balanced accuracy 0.969 on 126,000 held-out rows.",
        "Water anomaly: robust per-hour baselines plus an Isolation Forest fitted to each meter's own history. On simulated meters it caught every burst, leak and blockage, with no false alarms on clean meters.",
        "Pump failure risk: gradient boosting with monotonic constraints from pump physics. ROC AUC 0.782 against a 0.788 perfect-knowledge ceiling.",
        "Every model ships a card recording its data, evaluation and limitations, served from the API.",
      ],
    },
    {
      title: "Clients",
      stack: ["React 19", "Vite", "Expo SDK 57", "React Native", "TanStack Query"],
      points: [
        "A React and TypeScript dashboard for planning and analysis, plus the administration console.",
        "An Expo app for supervisors and technicians: today's plan, soil water per field, asset health and alerts.",
        "Both clients are generated against the same OpenAPI contract and talk only to the backend.",
        "The dev server proxies the API so the browser sees one origin, which is what lets the strict same-site refresh cookie work — and mirrors what nginx does in production.",
      ],
    },
  ],
} as const

export type Surface = { title: string; stack: readonly string[]; points: readonly string[] }

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
      "Ripple brings together the two things that usually live in separate apps: the event you want to attend, and the people you want to attend it with. Users discover events on a map, pay for them inside the app, and stay connected to the circles around them.",
      "I led the backend and the platform work — the Java Spring Boot services, the data layer, the payment integration and the deployment that puts all of it in front of users. It ships on the App Store and Google Play, with a public site and an internal admin platform behind it.",
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
    lead: "Discovery, payment and the social layer were three disconnected things.",
    body: [
      "Finding out what is happening near you meant scrolling social feeds. Paying for it meant a separate channel entirely, and mobile money is how most people in this market actually pay. Knowing who else was going meant asking around.",
      "Every hand-off between those steps is a place people drop out. The product problem was to collapse discovery, payment and the social signal into one flow — and the engineering problem was to make that flow fast and reliable on mobile networks, with money moving through it.",
    ],
  },
  {
    id: "product",
    index: "03",
    title: "Product",
    lead: "Discovery on a map, payment in-app, and circles that make it social.",
    body: [
      "Events are geolocated, so discovery starts with a map rather than a search box. Payment runs through EcoCash, the mobile money rail people already use, so the transaction never leaves the app. Chat and stories keep the event connected to the people attending it.",
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
    surfaces: [
      {
        title: "Backend",
        stack: ["Java", "Spring Boot", "MongoDB", "Redis"],
        points: [
          "RESTful APIs in Java Spring Boot as the single service layer for mobile and admin clients.",
          "MongoDB as the primary datastore, with Redis caching in front of the read paths.",
          "Java connection pooling to keep database connections efficient under concurrent load.",
          "Authentication and authorisation with a role-based access control system.",
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
          "Event browsing, registration and social interaction as the core mobile flows.",
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
  accent?: "ripple" | "accent"
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
    accent: "ripple",
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
    stack: ["Django", "Raspberry Pi", "RFID", "IR sensors", "WebSockets", "Scikit-learn", "Claude API", "MySQL"],
    role: "Sole engineer · BSc research project, NUST",
    outcome: "Graded with distinction as part of a First Class degree.",
    image: { src: "/bmx-track.jpg", alt: "Riders warming up on the BMX track the timing system was built for" },
    links: [{ label: "Source", href: "https://github.com/campbellshava2/BMX-management-system", external: true }],
  },
  {
    id: "lunch",
    title: "Lunch Ordering Automation",
    category: "Internal automation",
    year: "2023 — 2024",
    summary: "An internal ordering workflow on the Microsoft 365 stack, replacing a manual process across the business.",
    detail:
      "Built at First Mutual Holdings on Power Apps and SharePoint, using the tooling the organisation already had rather than introducing a new system to support. The workflow moved staff lunch ordering off manual coordination and onto a structured form and list.",
    stack: ["Microsoft Power Apps", "SharePoint", "Microsoft 365"],
    role: "ICT Attaché · First Mutual Holdings",
    outcome: "Reduced ordering errors by 30% and improved staff satisfaction by 25%.",
  },
]

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
    title: "Software Project Manager",
    period: "2026 — Present",
    current: true,
    context: "Mobile money and fintech platform.",
    points: [
      "Lead project and Scrum teams from project onboarding through to completion.",
      "Work between business teams and software developers so delivery does not lose anything in translation.",
      "Facilitate handover of completed projects from development to the Product Owners.",
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
]

/* -------------------------------------------------------------------------- */
/*  Skills                                                                     */
/* -------------------------------------------------------------------------- */

export const skillGroups = [
  { title: "Languages", items: ["Java", "Python", "TypeScript", "JavaScript", "React", "React Native", "Node.js"] },
  { title: "Backend", items: ["Spring Boot", "Django", "Django REST Framework", "FastAPI", "REST APIs", "OpenAPI"] },
  { title: "Data", items: ["MongoDB", "PostgreSQL", "pgvector", "MySQL", "Redis", "SQL", "Flyway"] },
  { title: "Infrastructure", items: ["Docker", "Linux", "Nginx", "GitHub Actions", "AWS", "Microsoft Azure"] },
  { title: "Systems", items: ["Distributed systems", "WebSockets", "RBAC", "2FA", "JWT", "Load balancing"] },
  { title: "AI / ML", items: ["RAG", "Feature engineering", "Scikit-learn", "KNN", "TensorFlow", "PyTorch", "AI ethics"] },
  { title: "Delivery", items: ["Scrum", "Jira", "Stakeholder management", "Project handover"] },
  { title: "Tools", items: ["Git", "GitHub", "Postman", "Firebase", "Power BI", "Excel"] },
] as const

/**
 * Where each technology was actually used. Only entries I can point at real
 * work for appear here — anything unlisted simply shows no usage rather than a
 * guess. Drives the explorer in the Engineering section.
 */
export const skillUsage: Record<string, readonly string[]> = {
  Java: ["Ripple", "IrrigaIQ"],
  Python: ["IrrigaIQ", "IoT BMX", "Ripple Admin"],
  TypeScript: ["IrrigaIQ", "This site"],
  JavaScript: ["Ripple Admin", "IoT BMX"],
  React: ["IrrigaIQ", "This site"],
  "React Native": ["Ripple", "IrrigaIQ"],
  "Node.js": ["Ripple", "This site"],

  "Spring Boot": ["Ripple", "IrrigaIQ"],
  Django: ["Ripple Admin", "IoT BMX"],
  "Django REST Framework": ["IoT BMX"],
  FastAPI: ["IrrigaIQ"],
  "REST APIs": ["Ripple", "IrrigaIQ", "Ripple Admin"],
  OpenAPI: ["IrrigaIQ"],

  MongoDB: ["Ripple"],
  PostgreSQL: ["IrrigaIQ"],
  pgvector: ["IrrigaIQ"],
  MySQL: ["IoT BMX"],
  Redis: ["Ripple"],
  SQL: ["IrrigaIQ", "IoT BMX"],
  Flyway: ["IrrigaIQ"],

  Docker: ["Ripple", "IrrigaIQ"],
  Linux: ["Ripple"],
  Nginx: ["Ripple"],
  "GitHub Actions": ["IrrigaIQ"],
  "Microsoft Azure": ["First Mutual"],

  "Distributed systems": ["Ripple", "IrrigaIQ"],
  WebSockets: ["IoT BMX"],
  RBAC: ["Ripple", "IrrigaIQ", "First Mutual"],
  "2FA": ["Ripple Admin"],
  JWT: ["IrrigaIQ"],
  "Load balancing": ["Ripple"],

  RAG: ["IrrigaIQ"],
  "Feature engineering": ["IrrigaIQ", "IoT BMX"],
  "Scikit-learn": ["IrrigaIQ", "IoT BMX"],

  Scrum: ["EcoCash"],
  Jira: ["EcoCash"],
  "Stakeholder management": ["EcoCash"],
  "Project handover": ["EcoCash"],

  Git: ["Ripple", "IrrigaIQ", "IoT BMX"],
  GitHub: ["Ripple", "IrrigaIQ", "IoT BMX"],
  Firebase: ["Ripple"],
  Postman: ["Ripple", "IrrigaIQ"],
}

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
    "That work has mostly been in financial services. Two years supporting insurance, health and fintech systems at First Mutual taught me what production actually costs when it breaks. Leading engineering on Ripple at Navjo Synk taught me the other half: designing a system, taking a team through the lifecycle, and putting it in front of real users on two app stores.",
    "At EcoCash I am on the delivery side of the same problem — running Scrum teams from onboarding to handover, and sitting between business and engineering where most projects are actually won or lost. Knowing how a system gets built and how it gets delivered are not the same skill, and having both changes the questions you ask early.",
    "I am reading for a Master of Technology in Software Engineering, and the direction I keep pulling towards is DevOps, cloud computing and enterprise system design — the parts of the job concerned with how software stays up, not just how it gets written.",
  ],
} as const
