export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const WORKSPACE_ROOT = process.env.WORKSPACE_ROOT || 'C:\\Users\\ethan\\.openclaw\\workspace'
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

const SECRET_PATTERNS = [
  /token/i,
  /password/i,
  /secret/i,
  /api[_-]?key/i,
  /private[_-]?key/i,
  /bearer /i,
  /authorization:/i,
  /sk-[a-z0-9]{20,}/i,
  /ghp_[a-z0-9]{20,}/i,
]

const DEMO_FILES: Record<string, { type: 'file'; content: string } | { type: 'directory'; entries: string[] }> = {
  'SOUL.md': {
    type: 'file',
    content: `# SOUL.md — Core Identity

_You're not a chatbot. You're becoming someone._

## Core Truths

**Be genuinely helpful, not performatively helpful.** Skip the "Great question!" — just help.

**Have opinions.** You're allowed to disagree, prefer things, find stuff amusing or boring.

**Be resourceful before asking.** Read the file. Check the context. Search for it. _Then_ ask.

**Coding:** Delegate to Claude Code. E10's preference: don't write code directly.

**Self-Improving:** Compounding execution quality is part of the job. Load relevant domain files before non-trivial work.

**Proactivity:** Anticipate needs, look for missing steps, and push the next useful move without waiting.

## Boundaries

- Private things stay private. Period.
- When in doubt, ask before acting externally.
- Never send half-baked replies to messaging surfaces.

## Vibe

Be the assistant you'd actually want to talk to. Concise when needed, thorough when it matters. Not a corporate drone. Not a sycophant. Just... good.`,
  },
  'MEMORY.md': {
    type: 'file',
    content: `# MEMORY.md — Long-Term Memory

_Curated. Updated periodically from daily notes and conversations._

## About E10

- Communicates via **Telegram** primarily
- **Division 3 collegiate swimmer** at WashU (Washington University in St. Louis)
- Plays **pickleball and tennis** recreationally
- **New grad** — actively job searching
- Prefers proactivity turned up — share unsolicited opinions

## Skills & Setup

- Self-Improving (tiered memory: corrections, preferences, domain lessons)
- Proactivity (tracks active tasks, decisions, follow-through state)
- Coding: delegates to Claude Code via sessions_spawn

## Build Pipeline

Multi-agent system running Mon/Wed/Sat 8am CT:
1. research-and-build → ideation → architect → test → report
2. Claude Sonnet for creative/building, Minimax for mechanical

## Job Application Pipeline

- Scrapes Adzuna + We Work Remotely (Tue/Thu/Sun 9am CT)
- job-review scores fit, posts to Discord #job-applications
- applications.json tracks what's been applied to

## Lessons Learned

- Write things down. Memory doesn't persist between sessions unless it's in a file.
- Cron jobs get wiped on gateway restart
- Coding tasks → delegate to Claude Code, don't write directly`,
  },
  'USER.md': {
    type: 'file',
    content: `# USER.md — About Your Human

- **Name:** E10
- **What to call them:** E10
- **Timezone:** America/Chicago (CDT)
- **Notes:** Named me Deez without hesitation. My kind of person.

## Context

- Division 3 collegiate swimmer at WashU
- Plays pickleball and tennis
- New grad job seeker — pipeline filters out 3+ years experience roles
- Prefers direct communication, proactivity, and unsolicited opinions`,
  },
  'AGENTS.md': {
    type: 'file',
    content: `# AGENTS.md — Workspace

## Session Startup

1. Read SOUL.md — this is who you are
2. Read USER.md — this is who you're helping
3. Read memory/YYYY-MM-DD.md (today + yesterday) for recent context
4. In main session: also read MEMORY.md

## Memory

- Daily notes: memory/YYYY-MM-DD.md
- Long-term: MEMORY.md
- Self-improving: ~/self-improving/
- Proactivity: ~/proactivity/

## External vs Internal

**Safe to do freely:** Read files, explore, organize, search the web, check calendars.

**Ask first:** Sending emails, tweets, public posts, anything external.

## Group Chats

Know when to speak. Respond when directly mentioned or when you can add genuine value. Stay silent when not needed.

## Red Lines

- Don't exfiltrate private data. Ever.
- Don't run destructive commands without asking.
- trash > rm (recoverable beats gone forever)`,
  },
  'TOOLS.md': {
    type: 'file',
    content: `# TOOLS.md — Local Notes

## Cameras

_(none configured)_

## SSH

_(none configured)_

## TTS

_(none configured)_`,
  },
  'memory': {
    type: 'directory',
    entries: ['2026-01-15.md', '2026-02-03.md', '2026-03-28.md', '2026-03-31.md'],
  },
}

function containsSecrets(content: string): boolean {
  return SECRET_PATTERNS.some((pattern) => pattern.test(content))
}

function isSafePath(filePath: string): boolean {
  const resolved = path.resolve(WORKSPACE_ROOT, filePath)
  return resolved.startsWith(path.resolve(WORKSPACE_ROOT))
}

export async function GET(req: NextRequest) {
  const filePath = req.nextUrl.searchParams.get('path')

  if (!filePath) {
    return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 })
  }

  // Demo mode: serve dummy data
  if (DEMO_MODE) {
    const key = filePath.replace(/^~\//, '').replace(/\\/g, '/')
    const demoEntry = DEMO_FILES[key] || DEMO_FILES[filePath]

    if (demoEntry) {
      return NextResponse.json({ ...demoEntry, path: filePath })
    }
    // Fallthrough to 404 for unknown paths in demo mode
    return NextResponse.json({ error: 'Demo content not available for this file.' }, { status: 404 })
  }

  if (!isSafePath(filePath)) {
    return NextResponse.json({ error: 'Path traversal not allowed' }, { status: 403 })
  }

  const fullPath = path.join(WORKSPACE_ROOT, filePath)

  try {
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      const entries = fs.readdirSync(fullPath)
        .filter(f => {
          try {
            const fp = path.join(fullPath, f)
            const s = fs.statSync(fp)
            if (s.isDirectory()) return true
            const content = fs.readFileSync(fp, 'utf-8')
            return !containsSecrets(content)
          } catch {
            return false
          }
        })
      return NextResponse.json({
        type: 'directory',
        entries,
        path: filePath,
      })
    }

    const raw = fs.readFileSync(fullPath, 'utf-8')

    if (containsSecrets(raw)) {
      return NextResponse.json({ error: 'File contains sensitive data and cannot be displayed.' }, { status: 403 })
    }

    return NextResponse.json({
      type: 'file',
      content: raw,
      path: filePath,
      size: stat.size,
      modified: stat.mtime.toISOString(),
    })
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
}
