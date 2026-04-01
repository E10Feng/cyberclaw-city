'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCityStore } from '@/store/useCity'
import { districtColors } from '@/data/city-map'

export default function InfoPanel() {
  const selectedBuilding = useCityStore(s => s.selectedBuilding)
  const infoPanelOpen = useCityStore(s => s.infoPanelOpen)
  const fileContent = useCityStore(s => s.fileContent)
  const fileLoading = useCityStore(s => s.fileLoading)
  const setInfoPanelOpen = useCityStore(s => s.setInfoPanelOpen)
  const setFileContent = useCityStore(s => s.setFileContent)
  const setFileLoading = useCityStore(s => s.setFileLoading)
  const setSelectedBuilding = useCityStore(s => s.setSelectedBuilding)

  useEffect(() => {
    if (!selectedBuilding?.filePath) {
      setFileContent(null)
      return
    }

    setFileLoading(true)
    setFileContent(null)

    fetch(`/api/file-content?path=${encodeURIComponent(selectedBuilding.filePath)}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          setFileContent(`⚠️ ${data.error}`)
        } else if (data.type === 'directory') {
          setFileContent(`📁 Directory contents:\n\n${data.entries.join('\n')}`)
        } else {
          setFileContent(data.content)
        }
      })
      .catch(() => setFileContent('Failed to load file content.'))
      .finally(() => setFileLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBuilding])

  const close = () => {
    setInfoPanelOpen(false)
    setSelectedBuilding(null)
  }

  const districtColor = selectedBuilding ? districtColors[selectedBuilding.district] : '#06b6d4'

  return (
    <AnimatePresence>
      {infoPanelOpen && selectedBuilding && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-[420px] max-w-[95vw] bg-black/90 border-l border-cyan-900/50 backdrop-blur-md z-50 flex flex-col font-mono"
          style={{ borderLeftColor: `${districtColor}40` }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 border-b"
            style={{ borderBottomColor: `${districtColor}40`, background: `${districtColor}10` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                  {selectedBuilding.district.replace('-', ' ')}
                </div>
                <h2
                  className="text-lg font-bold truncate"
                  style={{ color: districtColor }}
                >
                  {selectedBuilding.label.toUpperCase()}
                </h2>
              </div>
              <button
                onClick={close}
                className="text-gray-500 hover:text-white transition-colors mt-1 text-xl leading-none flex-shrink-0"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              {selectedBuilding.description}
            </p>
            {selectedBuilding.filePath && (
              <div className="mt-2 text-xs text-cyan-700">
                📄 {selectedBuilding.filePath}
              </div>
            )}
          </div>

          {/* Connections */}
          {selectedBuilding.connections.length > 0 && (
            <div className="px-5 py-3 border-b border-gray-800/50">
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Connections</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedBuilding.connections.map(id => (
                  <span key={id} className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700">
                    {id}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* File Content */}
          {selectedBuilding.filePath && (
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="px-5 py-2 border-b border-gray-800/50 text-xs text-gray-500 uppercase tracking-widest">
                File Contents
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4">
                {fileLoading ? (
                  <div className="text-cyan-600 animate-pulse text-sm">Loading...</div>
                ) : fileContent ? (
                  <pre className="text-xs text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {fileContent}
                  </pre>
                ) : (
                  <div className="text-gray-600 text-sm">No content available.</div>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="px-5 py-3 border-t border-gray-800/50 text-xs text-gray-600 flex justify-between">
            <span>CyberClaw City v1.0</span>
            <span style={{ color: districtColor }}>◆ {selectedBuilding.district}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
