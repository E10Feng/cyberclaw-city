export type District =
  | 'core'
  | 'build-pipeline'
  | 'job-pipeline'
  | 'comms'
  | 'memory'
  | 'ai-briefing'
  | 'skills'

export type BuildingStyle =
  | 'gothic-spire'
  | 'brutalist-library'
  | 'civic'
  | 'clock-tower'
  | 'ledger'
  | 'workshop'
  | 'dome'
  | 'loft'
  | 'glass-tower'
  | 'sterile-cube'
  | 'press'
  | 'exchange'
  | 'filing-cabinet'
  | 'radio-tower'
  | 'broadcast-station'
  | 'journal-row'
  | 'bunker'
  | 'generator'
  | 'observatory-tower'
  | 'newsroom'
  | 'bulletin'
  | 'marketplace'
  | 'gym'
  | 'search-tower'
  | 'comms-shack'
  | 'meteo-station'
  | 'examination-hall'

export interface Building {
  id: string
  label: string
  description: string
  district: District
  position: [number, number, number]
  style: BuildingStyle
  color: string
  emissive: string
  filePath?: string
  connections: string[]
  scale?: number
}

export const buildings: Building[] = [
  // ── CORE DISTRICT (tall, at origin) ───────────────────────────
  {
    id: 'cathedral',
    label: 'The Cathedral',
    description: 'SOUL.md — Core Identity. The tallest building in the city; everything flows from here.',
    district: 'core',
    position: [0, 0, 0],
    style: 'gothic-spire',
    color: '#7c3aed',
    emissive: '#5b21b6',
    filePath: 'SOUL.md',
    connections: ['archive', 'city-hall', 'clock-tower', 'ledger'],
    scale: 1.8,
  },
  {
    id: 'archive',
    label: 'The Archive',
    description: 'MEMORY.md — Long-term curated memory. A brutalist library with many floors.',
    district: 'core',
    position: [-12, 0, 3],
    style: 'brutalist-library',
    color: '#0d9488',
    emissive: '#0f766e',
    filePath: 'MEMORY.md',
    connections: ['cathedral', 'daily-journals', 'self-improvement-vault'],
    scale: 1.5,
  },
  {
    id: 'city-hall',
    label: 'City Hall',
    description: 'AGENTS.md — Workspace rules and operating instructions.',
    district: 'core',
    position: [12, 0, 3],
    style: 'civic',
    color: '#d97706',
    emissive: '#b45309',
    filePath: 'AGENTS.md',
    connections: ['cathedral', 'clock-tower'],
    scale: 1.4,
  },
  {
    id: 'clock-tower',
    label: 'The Clock Tower',
    description: 'Heartbeat — Periodic lifecycle pulse. Keeps the city alive.',
    district: 'core',
    position: [0, 0, -14],
    style: 'clock-tower',
    color: '#06b6d4',
    emissive: '#0891b2',
    connections: ['cathedral', 'city-hall'],
    scale: 1.6,
  },
  {
    id: 'ledger',
    label: 'The Ledger',
    description: 'USER.md — Information about the human this agent serves.',
    district: 'core',
    position: [-10, 0, -8],
    style: 'ledger',
    color: '#f59e0b',
    emissive: '#d97706',
    filePath: 'USER.md',
    connections: ['cathedral'],
    scale: 1.2,
  },
  {
    id: 'workshop',
    label: 'The Workshop',
    description: 'TOOLS.md — Local tool notes and environment-specific configuration.',
    district: 'core',
    position: [10, 0, -8],
    style: 'workshop',
    color: '#6b7280',
    emissive: '#4b5563',
    filePath: 'TOOLS.md',
    connections: ['cathedral'],
    scale: 1.2,
  },

  // ── BUILD PIPELINE DISTRICT (far left) ────────────────────────
  {
    id: 'observatory',
    label: 'The Observatory',
    description: 'research-agent — Gathers data and intelligence for the pipeline.',
    district: 'build-pipeline',
    position: [-55, 0, -25],
    style: 'dome',
    color: '#3b82f6',
    emissive: '#2563eb',
    connections: ['studio'],
  },
  {
    id: 'studio',
    label: 'The Studio',
    description: 'ideation-agent — Generates creative ideas and possibilities.',
    district: 'build-pipeline',
    position: [-47, 0, -25],
    style: 'loft',
    color: '#d946ef',
    emissive: '#c026d3',
    connections: ['observatory', 'blueprint-office'],
  },
  {
    id: 'blueprint-office',
    label: 'The Blueprint Office',
    description: 'architect-agent — Designs the structure and architecture of solutions.',
    district: 'build-pipeline',
    position: [-39, 0, -25],
    style: 'glass-tower',
    color: '#10b981',
    emissive: '#059669',
    connections: ['studio', 'lab'],
  },
  {
    id: 'lab',
    label: 'The Lab',
    description: 'test-agent — Validates, tests, and quality-checks outputs.',
    district: 'build-pipeline',
    position: [-31, 0, -25],
    style: 'sterile-cube',
    color: '#f8fafc',
    emissive: '#ef4444',
    connections: ['blueprint-office', 'press'],
  },
  {
    id: 'press',
    label: 'The Press',
    description: 'report-agent — Formats and delivers the final output.',
    district: 'build-pipeline',
    position: [-23, 0, -25],
    style: 'press',
    color: '#f97316',
    emissive: '#ea580c',
    connections: ['lab'],
  },

  // ── JOB PIPELINE DISTRICT (far right) ─────────────────────────
  {
    id: 'exchange',
    label: 'The Exchange',
    description: 'job-digest — Aggregates and surfaces job opportunities.',
    district: 'job-pipeline',
    position: [40, 0, -15],
    style: 'exchange',
    color: '#8b5cf6',
    emissive: '#7c3aed',
    connections: ['grading-hall'],
  },
  {
    id: 'grading-hall',
    label: 'The Grading Hall',
    description: 'job-review — Evaluates and scores each job opportunity.',
    district: 'job-pipeline',
    position: [52, 0, -15],
    style: 'examination-hall',
    color: '#ec4899',
    emissive: '#db2777',
    connections: ['exchange', 'filing-cabinet'],
  },
  {
    id: 'filing-cabinet',
    label: 'The Filing Cabinet',
    description: 'applications.json — Tracks all job applications.',
    district: 'job-pipeline',
    position: [64, 0, -15],
    style: 'filing-cabinet',
    color: '#94a3b8',
    emissive: '#64748b',
    connections: ['grading-hall'],
  },

  // ── COMMS DISTRICT (front) ────────────────────────────────────
  {
    id: 'radio-tower',
    label: 'The Radio Tower',
    description: 'Telegram — Primary communication channel with the operator.',
    district: 'comms',
    position: [-18, 0, 50],
    style: 'radio-tower',
    color: '#38bdf8',
    emissive: '#0ea5e9',
    connections: ['broadcast-station', 'cathedral'],
  },
  {
    id: 'broadcast-station',
    label: 'The Broadcast Station',
    description: 'Discord — Community and group communications hub.',
    district: 'comms',
    position: [-8, 0, 50],
    style: 'broadcast-station',
    color: '#818cf8',
    emissive: '#6366f1',
    connections: ['radio-tower'],
  },

  // ── MEMORY DISTRICT (right front) ─────────────────────────────
  {
    id: 'daily-journals',
    label: 'Daily Journals',
    description: 'memory/YYYY-MM-DD.md — Raw daily session logs. The unfiltered record.',
    district: 'memory',
    position: [25, 0, 28],
    style: 'journal-row',
    color: '#fbbf24',
    emissive: '#f59e0b',
    filePath: 'memory',
    connections: ['archive', 'self-improvement-vault'],
  },
  {
    id: 'self-improvement-vault',
    label: 'Self-Improvement Vault',
    description: '~/self-improving/ — Persistent performance lessons. Compounds over time.',
    district: 'memory',
    position: [35, 0, 28],
    style: 'bunker',
    color: '#4ade80',
    emissive: '#22c55e',
    connections: ['archive', 'daily-journals', 'proactivity-engine'],
  },
  {
    id: 'proactivity-engine',
    label: 'Proactivity Engine',
    description: '~/proactivity/ — Tracks active tasks, decisions, and follow-through state.',
    district: 'memory',
    position: [45, 0, 28],
    style: 'generator',
    color: '#fb923c',
    emissive: '#f97316',
    connections: ['self-improvement-vault'],
  },

  // ── AI BRIEFING DISTRICT (front far) ──────────────────────────
  {
    id: 'observatory-tower',
    label: 'The Observatory Tower',
    description: 'ai-news-briefing.py — Scrapes AI/ML news daily for briefings.',
    district: 'ai-briefing',
    position: [-12, 0, 80],
    style: 'observatory-tower',
    color: '#1d4ed8',
    emissive: '#1e40af',
    connections: ['editors-desk'],
  },
  {
    id: 'editors-desk',
    label: "The Editor's Desk",
    description: 'ai-news-agent-prompt — Synthesizes raw news into structured briefings.',
    district: 'ai-briefing',
    position: [0, 0, 80],
    style: 'newsroom',
    color: '#22d3ee',
    emissive: '#06b6d4',
    connections: ['observatory-tower', 'bulletin-board'],
  },
  {
    id: 'bulletin-board',
    label: 'The Bulletin Board',
    description: '#daily-briefing — Discord channel. Where AI news lands every morning.',
    district: 'ai-briefing',
    position: [12, 0, 80],
    style: 'bulletin',
    color: '#f0fdfa',
    emissive: '#0d9488',
    connections: ['editors-desk'],
  },

  // ── SKILLS QUARTER (left side) ────────────────────────────────
  {
    id: 'clawhub-stall',
    label: 'ClawHub Marketplace',
    description: 'clawhub skill — Installs and publishes agent skills from clawhub.com.',
    district: 'skills',
    position: [-40, 0, 15],
    style: 'marketplace',
    color: '#f472b6',
    emissive: '#ec4899',
    connections: ['cathedral'],
  },
  {
    id: 'coding-workshop',
    label: 'Coding Workshop',
    description: 'coding-agent skill — Delegates coding tasks to Codex / Claude Code.',
    district: 'skills',
    position: [-48, 0, 15],
    style: 'workshop',
    color: '#a3e635',
    emissive: '#84cc16',
    connections: [],
  },
  {
    id: 'discord-shack',
    label: 'Discord Shack',
    description: 'discord skill — Sends messages and reactions via Discord.',
    district: 'skills',
    position: [-55, 0, 8],
    style: 'comms-shack',
    color: '#818cf8',
    emissive: '#6366f1',
    connections: ['broadcast-station'],
  },
  {
    id: 'weather-station',
    label: 'Weather Station',
    description: 'weather skill — Current conditions and forecasts via wttr.in.',
    district: 'skills',
    position: [-48, 0, 0],
    style: 'meteo-station',
    color: '#7dd3fc',
    emissive: '#38bdf8',
    connections: [],
  },
  {
    id: 'self-improvement-gym',
    label: 'Self-Improvement Gym',
    description: 'self-improvement skill — Captures corrections and lessons for compounding growth.',
    district: 'skills',
    position: [-40, 0, 0],
    style: 'gym',
    color: '#f97316',
    emissive: '#ea580c',
    connections: ['self-improvement-vault'],
  },
  {
    id: 'search-tower',
    label: 'Search Tower',
    description: 'web-search-exa skill — Neural web search. Currently offline (no API key).',
    district: 'skills',
    position: [-55, 0, 0],
    style: 'search-tower',
    color: '#374151',
    emissive: '#1f2937',
    connections: [],
  },
]

export const districtColors: Record<District, string> = {
  core: '#7c3aed',
  'build-pipeline': '#3b82f6',
  'job-pipeline': '#8b5cf6',
  comms: '#38bdf8',
  memory: '#4ade80',
  'ai-briefing': '#1d4ed8',
  skills: '#f472b6',
}
