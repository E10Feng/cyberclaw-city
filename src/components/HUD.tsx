'use client'
import { useCityStore } from '@/store/useCity'

export default function HUD() {
  const cameraMode = useCityStore(s => s.cameraMode)
  const setCameraMode = useCityStore(s => s.setCameraMode)

  return (
    <>
      {/* Top left: Title */}
      <div className="fixed top-4 left-4 z-40 font-mono pointer-events-none select-none">
        <div className="text-2xl font-bold text-cyan-400 tracking-widest drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
          CYBERCLAW CITY
        </div>
        <div className="text-xs text-purple-400 tracking-[0.3em] mt-0.5">
          AI AGENT ARCHITECTURE
        </div>
      </div>

      {/* Bottom left: Controls */}
      <div className="fixed bottom-4 left-4 z-40 font-mono text-xs text-gray-500 pointer-events-none select-none space-y-0.5">
        {cameraMode === 'orbit' ? (
          <>
            <div>🖱 Drag to orbit · Scroll to zoom · Right-click to pan</div>
            <div>Press <span className="text-cyan-600">F</span> to enter first-person mode</div>
          </>
        ) : (
          <>
            <div>WASD to move · Mouse to look</div>
            <div>Press <span className="text-cyan-600">Esc</span> or <span className="text-cyan-600">F</span> to return to orbit</div>
          </>
        )}
        <div>Click buildings to inspect</div>
      </div>

      {/* Bottom right: Credits + camera toggle */}
      <div className="fixed bottom-4 right-4 z-40 font-mono flex flex-col items-end gap-2">
        <button
          onClick={() => setCameraMode(cameraMode === 'orbit' ? 'firstperson' : 'orbit')}
          className="text-xs border border-cyan-800 text-cyan-500 hover:text-cyan-300 hover:border-cyan-500 px-3 py-1.5 rounded transition-all bg-black/60 backdrop-blur-sm"
        >
          {cameraMode === 'orbit' ? '👁 First Person (F)' : '🌐 Orbit (F)'}
        </button>
        <div className="text-xs text-gray-600">
          Powered by <span className="text-purple-500">Deez</span> 🌰
        </div>
      </div>
    </>
  )
}
