import { Project } from "@/types";

export const projectsData: Project[] = [
  {
    id: "lingualdub",
    slug: "lingualdub",
    title: "LingualDub",
    tagline: "Composable, registry-based speech-AI framework for low-resource languages",
    description:
      "An open, modular speech-AI framework designed as reusable research and production infrastructure for underrepresented languages. Standardizes language metadata, audio datasets, model adapters, and evaluation metrics, with Luganda (lug) as initial validation baseline.",
    category: "AI & Speech",
    featured: true,
    tags: ["Python 3.10+", "PyTorch", "Mypy", "Ruff", "Speech-AI", "Luganda NLP", "FastAPI"],
    image: "/projects/lingualdub.png",
    demoUrl: "https://lingualdub.pages.dev",
    repoUrl: "https://github.com/allannuwamanya/lingualdub",
    stars: 5,
    metrics: [
      { label: "Reference Lang", value: "Luganda (lug)" },
      { label: "Architecture", value: "Registry-Driven" },
      { label: "License", value: "Apache 2.0" },
    ],
    caseStudy: {
      challenge:
        "Speech AI pipelines (ASR, TTS, Voice Conversion, Dubbing) have predominantly been built and optimized for high-resource languages like English and Mandarin. Developing speech tools for African languages often meant rebuilding fragile glue-code from scratch for each language, with zero standardized metadata, inconsistent phoneme sets, and tightly coupled model runtimes.",
      approach:
        "Designed LingualDub from first principles around a decoupled, registry-based architecture. Language metadata, audio datasets, model adapters, execution pipelines, and evaluation metrics are isolated behind standard interfaces. Any researcher or engineer can plug in a new low-resource language adapter or benchmark model without modifying framework internals.",
      architectureDiagram: `┌────────────────────────────────────────────────────────┐
│                   LingualDub Core                      │
├───────────────────┬───────────────────┬────────────────┤
│ Language Registry │ Pipeline Engine   │ Model Adapters │
│ • Luganda (lug)   │ • Preprocessing   │ • Whisper      │
│ • Dialect maps    │ • Alignment       │ • VITS / TTS   │
│ • Phoneme tables  │ • Evaluation      │ • Custom ONNX  │
└───────────────────┴───────────────────┴────────────────┘
                            │
              Automated CI & Validation Suite
              (Mypy Strict · Ruff · PyTest)`,
      decisions: [
        {
          title: "Registry-Based Extensibility",
          explanation:
            "Implemented dependency inversion where language packs and models register themselves dynamically, allowing zero-friction community contributions for new African dialects.",
        },
        {
          title: "Strict Static Typing & Ruff Linting",
          explanation:
            "Enforced 100% strict Mypy type-checking and automated Ruff lints to guarantee industrial reliability across research experimentation.",
        },
        {
          title: "Luganda as Initial Ground Truth",
          explanation:
            "Selected Luganda (Bantu / Great Lakes) as the reference validation language due to its agglutinative morphology and complex tonal characteristics, proving the framework can handle demanding linguistic structures.",
        },
      ],
      impact: [
        "Live interactive documentation and portal shipped at lingualdub.pages.dev",
        "Automated CI/CD validation running continuous acoustic and lexical checks",
        "Standardized interface adopted for ongoing Bantu low-resource speech benchmarks",
      ],
    },
  },
  {
    id: "collosy",
    slug: "collosy",
    title: "Collosy",
    tagline: "Enterprise social media scheduling & analytics engine with Temporal workflows",
    description:
      "Production-grade social media management monorepo. Uses Temporal.io durable orchestrators for resilient multi-platform post execution, a NestJS REST backend with strict DTO/Service/Repository layering, a Next.js dashboard, and a Chrome extension for web scheduling.",
    category: "Systems & Backend",
    featured: true,
    tags: ["Temporal.io", "NestJS", "Next.js", "TypeScript", "Prisma", "PostgreSQL", "pnpm Monorepo"],
    image: "/projects/collosy.png",
    repoUrl: "https://github.com/allannuwamanya/collosy",
    metrics: [
      { label: "Orchestrator", value: "Temporal.io" },
      { label: "Architecture", value: "Clean Monorepo" },
      { label: "Reliability", value: "100% Durable" },
    ],
    caseStudy: {
      challenge:
        "Traditional cron-based social media schedulers fail catastrophically when API rate limits hit, third-party social endpoints crash, or server instances restart during scheduled publication windows. Lost posts, duplicate publications, and desynchronized analytics erode user trust immediately.",
      approach:
        "Architected the scheduling and publishing engine on top of Temporal.io. Every post schedule is a durable, stateful workflow. When an external API (like X/Twitter, LinkedIn, or Meta) rate-limits or fails, Temporal automatically pauses, executes exponential jitter retries, and guarantees exact-once execution across server restarts.",
      architectureDiagram: `┌────────────────────────────────────────────────────────┐
│                   Collosy Monorepo                     │
├───────────────────────┬────────────────────────────────┤
│ apps/frontend         │ Next.js / Vite React Dashboard │
│ apps/backend          │ NestJS Core REST API           │
│ apps/orchestrator     │ Temporal.io Durable Workers    │
│ apps/extension        │ Web Scheduling Browser Tool    │
│ libraries/server      │ Shared Prisma, DTOs & Services │
└───────────────────────┴────────────────────────────────┘
        │                               │
┌───────▼────────┐             ┌────────▼────────┐
│ PostgreSQL DB  │             │ Social APIs     │
│ (Via Prisma)   │             │ (Meta/X/LI/YT)  │
└────────────────┘             └─────────────────┘`,
      decisions: [
        {
          title: "Temporal.io Durable Workflows over BullMQ",
          explanation:
            "Chose Temporal's event-sourced workflow engine over Redis-based queues because it preserves exact code execution state across weeks or months of scheduled downtime without manual database polling.",
        },
        {
          title: "Strict Layering Pattern",
          explanation:
            "Mandated DTO -> Controller -> Service -> Repository separation. Generic social engine files never contain provider-specific logic; all platform quirks are encapsulated behind clean provider interfaces.",
        },
        {
          title: "Immutable Workflow Definitions",
          explanation:
            "Implemented strict workflow versioning rules so evolving the scheduling logic never breaks in-flight production executions.",
        },
      ],
      impact: [
        "Eliminated post drops and duplicate publications through durable execution",
        "Seamless multi-tenant publishing across all major social networks from one dashboard",
        "Unified shared DTOs and Prisma schemas across backend, worker, and CLI apps",
      ],
    },
  },
  {
    id: "crypto-fiat-bridge-pos",
    slug: "crypto-fiat-bridge-pos",
    title: "Crypto-Fiat Bridge POS",
    tagline: "Self-custody TRC20 (USDT) point-of-sale system for Sunmi Android devices",
    description:
      "Physical and digital fiat-to-crypto on-ramp designed for point-of-sale hardware. Enables retail merchants to accept local fiat mobile money (UGX via Flutterwave) and automatically disburse USDT on the TRON network with live pricing, energy top-ups, and a 3-tier wallet failover system.",
    category: "Fintech & Web3",
    featured: true,
    tags: ["Node.js", "Express", "TRON Network", "TRC20", "Supabase", "Flutterwave API", "Sunmi POS"],
    image: "/projects/crypto-pos.png",
    repoUrl: "https://github.com/allannuwamanya/crypto-fiat-bridge-POS",
    metrics: [
      { label: "On-Ramp", value: "UGX → USDT" },
      { label: "Hardware", value: "Sunmi POS" },
      { label: "Failover", value: "3-Tier Wallet" },
    ],
    caseStudy: {
      challenge:
        "Local merchants and informal traders in East Africa frequently handle mobile money (MTN / Airtel via Flutterwave) but struggle to hedge against local currency depreciation or participate in global digital trade. Converting fiat cash into digital stablecoins was previously slow, expensive, and required technical crypto knowledge.",
      approach:
        "Engineered an automated end-to-end POS bridge on Sunmi Android handheld terminals. The merchant types a fiat amount, the backend fetches real-time CoinGecko rate calculations, generates a Flutterwave checkout request, and upon payment confirmation webhook, executes an automated TRC20 payout over TRON with 3-wallet redundancy and automatic energy management.",
      architectureDiagram: `┌──────────────┐     ┌──────────────┐     ┌──────────────────┐
│  Sunmi POS   │────▶│  Express API │────▶│   Supabase (DB)  │
│  (Android)   │     │  :3000       │     │  transactions    │
└──────────────┘     └──────┬───────┘     └──────────────────┘
                            │
               ┌────────────┴────────────┐
               │ CoinGecko Live Pricing  │
               │ Flutterwave Webhook     │
               └────────────┬────────────┘
                            │
               ┌────────────┴────────────┐
               │      TRON Network       │
               │ Master → Backup A → B   │
               │ (Auto Energy Reserve)   │
               └─────────────────────────┘`,
      decisions: [
        {
          title: "TRON (TRC20) for Low-Fee Settlement",
          explanation:
            "Selected TRON for stablecoin transfer fees under $1.50 and sub-3-second block finality, which is essential for retail merchant checkout speeds.",
        },
        {
          title: "3-Wallet Redundant Failover",
          explanation:
            "Built a resilient payout cascade: Master Wallet -> Backup A -> Backup B. If a hot wallet runs low on balance or bandwidth, the transaction immediately falls over without human intervention.",
        },
        {
          title: "Automated Energy Reserve Top-Ups",
          explanation:
            "Integrated pre-flight energy checks before every USDT payout, triggering automated energy rentals to minimize burned TRX network fees.",
        },
      ],
      impact: [
        "Enabled sub-15-second fiat-to-crypto conversions on handheld Android POS hardware",
        "Zero failed payouts thanks to 3-tier wallet failover and webhook idempotency",
        "Reduced transaction network overhead by over 60% using smart TRON energy leasing",
      ],
    },
  },
  {
    id: "open-data-uganda",
    slug: "open-data-uganda",
    title: "Open Data Uganda",
    tagline: "Standardized open data clearinghouse for Ugandan demographics & public health",
    description:
      "Centralized public data democratization hub standardizing 14+ public datasets from UBOS, UN OCHA, WHO, and the World Bank. Distributed in clean, machine-readable open formats (.csv and .jsonl) with automated GitHub Actions dataset validation and Python Pandas loading scripts.",
    category: "Open Data",
    featured: true,
    tags: ["Data Engineering", "JavaScript", "Python / Pandas", "GitHub Actions CI", "Open Formats"],
    image: "/projects/open-data.png",
    repoUrl: "https://github.com/allannuwamanya/open-data-uganda",
    stars: 14,
    metrics: [
      { label: "Curated Datasets", value: "14 Available" },
      { label: "Community", value: "14 Stars ⭐" },
      { label: "Format", value: "CSV & JSONL" },
    ],
    caseStudy: {
      challenge:
        "Crucial public datasets in Uganda across district populations, administrative boundaries, health facilities, and economic indicators were fragmented in locked PDF reports, obsolete portal endpoints, or inconsistent spreadsheets, making data science and civic tech development prohibitively slow.",
      approach:
        "Built a central open-access repository curating, normalizing, and versioning verified data from UBOS, UN OCHA, WFP, and World Bank. Published standardized `.csv` and `.jsonl` schemas backed by continuous CI validation workflows that check row schemas, geographic codes, and null-safety.",
      architectureDiagram: `┌────────────────────────────────────────────────────────┐
│                   Open Data Uganda                     │
├────────────────────────────────────────────────────────┤
│ Sources: UBOS · UN OCHA · World Bank · WHO · UNESCO    │
└──────────────────────────┬─────────────────────────────┘
                           │
             Automated Cleaning & Parsing
                           │
             ┌─────────────┴─────────────┐
             │ GitHub Actions Validation │
             │ • Schema integrity checks │
             │ • Geo-boundary verification│
             │ • Encoding & null audits  │
             └─────────────┬─────────────┘
                           │
      ┌────────────────────┴────────────────────┐
      ▼                                         ▼
Standardized CSV                         Streamable JSONL
(Pandas direct URLs)                     (High-throughput ingest)`,
      decisions: [
        {
          title: "Zero-Dependency Direct URL Loading",
          explanation:
            "Structured repository releases and raw URLs so data scientists can ingest clean datasets directly into Python Pandas or R with a single `pd.read_csv(url)` call without API keys.",
        },
        {
          title: "Dual Format Distribution",
          explanation:
            "Supplied both tabular `.csv` for business analysis and newline-delimited `.jsonl` for large-scale data pipelines and machine learning training corpora.",
        },
        {
          title: "Automated Schema Linting on PRs",
          explanation:
            "Configured CI actions to validate every incoming dataset contribution against strict column definitions and geographic identifier standards.",
        },
      ],
      impact: [
        "14+ standardized public datasets actively used by civic tech developers and researchers",
        "14 organic stars on GitHub with open contribution guidelines under CC BY 4.0 license",
        "Saves researchers hours of manual data extraction from government PDF bulletins",
      ],
    },
  },
  {
    id: "cs224n-nlp-study",
    slug: "cs224n-nlp-study",
    title: "Stanford CS224N Deep Learning NLP",
    tagline: "Research and implementation of deep learning NLP models and transformers",
    description:
      "Comprehensive research repository implementing core architectures from Stanford's CS224N: Natural Language Processing with Deep Learning. Implements Word2Vec skip-gram negative sampling, neural dependency parsers, Seq2Seq with attention, and Transformer attention heads.",
    category: "AI & Speech",
    featured: false,
    tags: ["Python", "PyTorch", "Transformers", "Self-Attention", "Word2Vec", "NLP"],
    repoUrl: "https://github.com/allannuwamanya/CS224N-Stanford-NLP-Study",
    stars: 16,
    metrics: [
      { label: "Curriculum", value: "Stanford CS224N" },
      { label: "Community", value: "16 Stars ⭐" },
      { label: "Framework", value: "PyTorch" },
    ],
    caseStudy: {
      challenge:
        "Mastering modern state-of-the-art Natural Language Processing requires understanding math-first fundamentals—from loss gradients in Word2Vec and softmax temperature down to multi-head self-attention mechanisms and beam search decoding.",
      approach:
        "Developed clean, documented PyTorch implementations of the complete Stanford CS224N curriculum, implementing foundational neural network models from mathematical formulas to validated code with benchmark evaluations.",
      decisions: [
        {
          title: "From-Scratch Mathematical Implementations",
          explanation:
            "Wrote gradient checks, word vector projections, and attention weighting matrices from scratch before utilizing high-level PyTorch modules.",
        },
        {
          title: "Modular Training Loops",
          explanation:
            "Built standardized training pipelines with learning rate scheduling, gradient clipping, and perplexity tracking.",
        },
      ],
      impact: [
        "16 stars on GitHub as a reference study guide for university NLP researchers",
        "Directly informed the architectural principles applied in the LingualDub framework",
      ],
    },
  },
  {
    id: "foundry",
    slug: "foundry",
    title: "Foundry Workspace Manager",
    tagline: "Developer desktop workspace for CLI-driven workflows and terminal orchestration",
    description:
      "A developer productivity application built to organize complex project workflows for developers who live in the terminal. Provides structured session management for multiple coding assistants, CLI processes, and environments with a custom dark engineering brand system.",
    category: "Systems & Backend",
    featured: false,
    tags: ["TypeScript", "Desktop App", "CLI Tools", "Terminal Emulation", "Developer Tooling"],
    repoUrl: "https://github.com/allannuwamanya/foundry",
    metrics: [
      { label: "Focus", value: "CLI Workflows" },
      { label: "Target", value: "Power Developers" },
      { label: "Brand System", value: "Custom Design" },
    ],
    caseStudy: {
      challenge:
        "Modern development requires juggling multiple terminal tabs: background servers, database watchers, Docker logs, and AI coding assistants. Standard terminal emulators turn into an unorganized sea of tabs with lost context and dead processes.",
      approach:
        "Created Foundry as a workspace organizer that clusters terminal sessions and processes by project context, keeping active commands, logs, and coding agents visually structured and persistent.",
      decisions: [
        {
          title: "Non-Intrusive Workflow Architecture",
          explanation:
            "Designed to sit alongside existing developer IDEs and shells rather than forcing proprietary terminal replacements.",
        },
        {
          title: "Bespoke Engineering Design System",
          explanation:
            "Constructed a high-contrast dark palette (charcoal, forge orange, hot metal gold) tuned for prolonged command-line readability.",
        },
      ],
      impact: [
        "Streamlines context-switching across multi-service monorepos and local microservices",
        "Provides persistent workspace states across system reboots",
      ],
    },
  },
  {
    id: "discover-uganda",
    slug: "discover-uganda",
    title: "Discover Uganda",
    tagline: "Physical tourism card game paired with a modern digital booking platform",
    description:
      "Full-stack tourism platform combining physical card game mechanics with digital QR codes. Unlocks exclusive tour booking discounts, deep-dive cultural histories, and direct connections to local tour operators across Uganda.",
    category: "Web Apps",
    featured: false,
    tags: ["React 19", "Express 5", "Drizzle ORM", "PostgreSQL", "Tailwind 4", "Cloudinary CDN"],
    demoUrl: "https://discover-uganda.vercel.app",
    repoUrl: "https://github.com/allannuwamanya/discoveruganda",
    metrics: [
      { label: "Frontend", value: "React 19" },
      { label: "Backend", value: "Express 5 + Drizzle" },
      { label: "Media", value: "Cloudinary CDN" },
    ],
    caseStudy: {
      challenge:
        "Uganda boasts incredible tourism destinations, but local operators struggle to reach domestic and regional travelers through digital ads. Physical card games offered high engagement but lacked instant booking conversion.",
      approach:
        "Created a bridge connecting physical game cards with digital web experiences. Each printed card features a unique cryptographic QR code that scans into a React 19 web app, unlocking rich video media, historic context, and direct booking discounts with certified operators.",
      decisions: [
        {
          title: "React 19 + Express 5 Architecture",
          explanation:
            "Used the latest React 19 client features coupled with an Express 5 backend using Drizzle ORM for type-safe PostgreSQL queries.",
        },
        {
          title: "Cloudinary Media Optimization",
          explanation:
            "Implemented auto-format, adaptive bitrate streaming, and responsive image transformations to deliver sub-second media on cellular connections.",
        },
      ],
      impact: [
        "Live deployment running on Vercel at discover-uganda.vercel.app",
        "Directly connects local safari and cultural operators to new booking channels",
      ],
    },
  },
  {
    id: "meridian",
    slug: "meridian",
    title: "Meridian Career Toolkit",
    tagline: "AI-powered resume builder, real-time template engine, and ATS scoring agent",
    description:
      "Full-featured career platform combining a guided 3-panel structured resume editor, real-time preview, job-description targeting, automated bullet quantification, ATS keyword scoring, and post-application career agent support.",
    category: "Web Apps",
    featured: false,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Cloudflare Pages", "AI Prompting"],
    repoUrl: "https://github.com/allannuwamanya/Meridian",
    metrics: [
      { label: "Editor", value: "3-Panel Real-Time" },
      { label: "Intelligence", value: "ATS + AI Rewrite" },
      { label: "Deployment", value: "Cloudflare Pages" },
    ],
    caseStudy: {
      challenge:
        "Job seekers struggle with generic resume advice and rigid online editors that either break PDF layouts or fail automated applicant tracking systems (ATS) due to poor semantic structuring.",
      approach:
        "Built a guided 3-panel workspace: structured schema input on the left, real-time reactive PDF preview in the center, and an AI Career Assistant on the right providing ATS keyword scoring and bullet impact quantification.",
      decisions: [
        {
          title: "Schema-First Resume Data Model",
          explanation:
            "Separated resume content from rendering templates, allowing users to switch styles instantly without losing formatting or data.",
        },
        {
          title: "ATS-Conforming PDF Export",
          explanation:
            "Engineered PDF generation to guarantee standard single-column text extraction layers, ensuring 100% parsing fidelity in enterprise ATS platforms.",
        },
      ],
      impact: [
        "Assists engineers and professionals in tailoring resumes with measurable impact bullets",
        "Real-time scoring helps applicants optimize keyword density before applying",
      ],
    },
  },
  {
    id: "school-run",
    slug: "school-run",
    title: "SchoolRun Geo-Logistics",
    tagline: "School commute logistics backend with Haversine routing and PostGIS",
    description:
      "Geo-logistics service powering student commute coordination, driver route optimization, and live event-stamped trip manifests. Built with Django REST Framework, PostGIS spatial queries, Haversine nearest-neighbour algorithms, and nightly Celery manifest generation.",
    category: "Systems & Backend",
    featured: false,
    tags: ["Django REST", "Python", "PostgreSQL / PostGIS", "Celery", "Redis", "Geo-Logistics"],
    repoUrl: "https://github.com/allannuwamanya/school-run-be",
    metrics: [
      { label: "Routing", value: "Haversine Engine" },
      { label: "Spatial DB", value: "PostgreSQL + PostGIS" },
      { label: "Task Queue", value: "Celery + Redis" },
    ],
    caseStudy: {
      challenge:
        "Real-time GPS socket streaming from dozens of school vans across fluctuating cellular networks in Kampala causes excessive battery drain and drops connection constantly, leaving parents blind to pickup statuses.",
      approach:
        "Replaced fragile continuous socket streams with an event-driven GPS checkpoint architecture. Drivers check in at milestone waypoints; the Haversine engine calculates remaining route distance and estimated arrival, and Celery workers generate nightly optimized manifests.",
      decisions: [
        {
          title: "PostGIS Spatial Indexing",
          explanation:
            "Leveraged PostGIS spatial geometry indexes for ultra-fast point-in-polygon queries and student pickup cluster calculations.",
        },
        {
          title: "Nightly Celery Manifests",
          explanation:
            "Automated overnight route generation using Celery workers with Redis, ensuring drivers have cached offline-ready manifests before morning runs begin.",
        },
      ],
      impact: [
        "Rock-solid delivery reliability over 3G/4G cellular connections",
        "Zero battery drain issues on driver Android devices",
      ],
    },
  },
  {
    id: "pawn-academy",
    slug: "pawn-academy",
    title: "Pawn Academy",
    tagline: "Browser chess training platform with in-browser WebAssembly Stockfish engine",
    description:
      "Interactive chess study platform featuring tactics puzzles, an opening explorer, endgame training, and client-side Stockfish chess engine analysis compiled to WebAssembly, backed by a Neon serverless PostgreSQL database.",
    category: "Web Apps",
    featured: false,
    tags: ["React", "Vite", "WebAssembly", "Stockfish", "Neon PostgreSQL", "Vitest"],
    repoUrl: "https://github.com/allannuwamanya/pawnacademy",
    metrics: [
      { label: "Analysis Engine", value: "WASM Stockfish" },
      { label: "Database", value: "Neon Serverless" },
      { label: "Testing", value: "Vitest Suite" },
    ],
    caseStudy: {
      challenge:
        "Chess analysis usually requires heavy, expensive backend servers running Stockfish instances, leading to high hosting bills and noticeable network latency during live moves.",
      approach:
        "Compiled Stockfish into client-side WebAssembly running inside a dedicated Web Worker. Analysis, evaluation bars, and engine moves compute directly on the user's browser CPU with zero latency and zero server CPU cost.",
      decisions: [
        {
          title: "WebAssembly + Web Workers",
          explanation:
            "Offloaded Stockfish engine calculations to a Web Worker so the main UI thread never drops a frame during deep depth evaluations.",
        },
        {
          title: "Neon Serverless PostgreSQL",
          explanation:
            "Utilized Neon serverless PostgreSQL for instant autoscaling of puzzle tactics databases and player game archives.",
        },
      ],
      impact: [
        "Zero server compute costs for infinite-depth chess engine analysis",
        "Sub-10ms response times for tactical blunder checks and move suggestions",
      ],
    },
  },
  {
    id: "dukafy",
    slug: "dukafy",
    title: "Dukafy Online Storefronts",
    tagline: "Mobile-first store builder for East African merchants migrating off social commerce",
    description:
      "Lightweight e-commerce creator engineered for mobile browsers. Enables Ugandan micro-retailers to create branded digital storefronts, manage catalogs, and collect structured customer orders directly from their smartphone.",
    category: "Web Apps",
    featured: false,
    tags: ["React", "JavaScript", "Mobile-First", "E-Commerce", "SME Tooling"],
    repoUrl: "https://github.com/allannuwamanya/Dukafy",
    metrics: [
      { label: "Target", value: "East African SMEs" },
      { label: "Form Factor", value: "Mobile Browser" },
      { label: "Focus", value: "Low-Bandwidth" },
    ],
    caseStudy: {
      challenge:
        "Thousands of small business owners across Uganda sell goods via WhatsApp chats and Instagram DMs, losing orders, mixing up customer details, and wasting hours sharing manual photo catalogs.",
      approach:
        "Built Dukafy as a smartphone-first web store generator. In less than 3 minutes, a shopkeeper uploads product photos, sets prices in UGX, and shares a clean catalog link that sends structured WhatsApp order summaries with one tap.",
      decisions: [
        {
          title: "Ultra-Lightweight Bundle Size",
          explanation:
            "Optimized for low-bandwidth cellular connections across East Africa with minimal assets and progressive image loading.",
        },
        {
          title: "WhatsApp Order Bridge",
          explanation:
            "Formatted customer cart checkout directly into pre-composed WhatsApp messages to align with established local business behavior.",
        },
      ],
      impact: [
        "Replaces chaotic chat screenshots with structured order management",
        "Zero barrier to entry: runs directly on low-cost smartphones without app store downloads",
      ],
    },
  },
  {
    id: "bastian-data-studio",
    slug: "bastian-data-studio",
    title: "Bastian Data Studio",
    tagline: "Interactive web studio for tokenizing and preparing AI training datasets",
    description:
      "A modern developer playground built with Next.js 15, Zustand, and Tailwind CSS for cleaning, normalizing, and formatting raw text datasets before fine-tuning LLMs.",
    category: "AI & Speech",
    featured: false,
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand"],
    repoUrl: "https://github.com/allannuwamanya/bastian",
    metrics: [
      { label: "Framework", value: "Next.js 15" },
      { label: "State", value: "Zustand" },
      { label: "Focus", value: "LLM Dataset Prep" },
    ],
    caseStudy: {
      challenge:
        "Pre-training and fine-tuning custom machine learning models requires extensive data scrubbing—removing special characters, standardizing encodings, and splitting training/validation splits.",
      approach:
        "Built an interactive client-side playground with fast live previews, token counters, regex transformer presets, and JSONL format exporters.",
      decisions: [
        {
          title: "Next.js 15 + Zustand Reactive State",
          explanation:
            "Paired React 19 Server Components with a lightweight client-side Zustand store for instant, zero-lag dataset transformations.",
        },
      ],
      impact: [
        "Accelerates dataset preparation workflows for natural language processing experiments",
      ],
    },
  },
];
