export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const WORKSPACE_ROOT = process.env.WORKSPACE_ROOT || 'C:\\Users\\ethan\\.openclaw\\workspace'

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
