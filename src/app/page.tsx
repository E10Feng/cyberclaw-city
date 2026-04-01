'use client'
import dynamic from 'next/dynamic'
import HUD from '@/components/HUD'
import InfoPanel from '@/components/InfoPanel'

// Scene must be dynamically imported — Three.js is client-only
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })

export default function Home() {
  return (
    <main className="w-full h-screen bg-[#050508] overflow-hidden relative">
      <Scene />
      <HUD />
      <InfoPanel />
    </main>
  )
}
