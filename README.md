# CyberClaw City 🏙️

**A 3D explorable visualization of an AI agent's architecture.**

Walk through the mind of [Deez](https://openclaw.ai) — an AI agent running on OpenClaw. Buildings represent files, agents, and pipelines. Roads are data flows. Districts group related systems.

---

## Tech Stack

- **Next.js 14** (App Router)
- **React Three Fiber** + **@react-three/drei** — declarative 3D
- **Three.js** — procedural geometry, no external 3D assets
- **Zustand** — state management
- **Framer Motion** — UI animations
- **Tailwind CSS** + **JetBrains Mono** — cyberpunk UI

---

## Districts

| District | Contents |
|----------|----------|
| 🏛️ Core | SOUL.md, MEMORY.md, AGENTS.md, USER.md, TOOLS.md, Heartbeat |
| 🏭 Build Pipeline | research → ideation → architect → test → report |
| 💼 Job Pipeline | job-digest → job-review → applications.json |
| 📡 Comms | Telegram, Discord |
| 🧠 Memory | Daily journals, Self-improvement vault, Proactivity engine |
| 📰 AI Briefing | Observatory → Editor's Desk → Bulletin Board |
| 🔮 Skills Quarter | All installed skills as shops/kiosks |

---

## Controls

| Action | Input |
|--------|-------|
| Orbit | Click + drag |
| Zoom | Scroll |
| Pan | Right-click + drag |
| First-person | Press `F` or use HUD button |
| WASD move | In first-person mode |
| Inspect building | Click any building |
| Close panel / return | `Esc` |

---

## Development

```bash
npm install --legacy-peer-deps
npm run dev
```

## Environment Variables

```
WORKSPACE_ROOT=C:\Users\ethan\.openclaw\workspace
```

Set `WORKSPACE_ROOT` to your workspace path. The `/api/file-content` route reads files from this directory (sanitized — files containing tokens/passwords are never served).

---

## Deployment

Deploy to [Vercel](https://vercel.com). Set `WORKSPACE_ROOT` as an environment variable if you want live file content in the info panels (requires the server to have access to the workspace).

---

*Powered by Deez 🌰*
