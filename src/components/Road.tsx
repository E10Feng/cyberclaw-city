'use client'
import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { buildings } from '@/data/city-map'
import { useCityStore } from '@/store/useCity'

export default function Roads() {
  const hoveredBuilding = useCityStore(s => s.hoveredBuilding)
  const selectedBuilding = useCityStore(s => s.selectedBuilding)
  const activeBuilding = hoveredBuilding || selectedBuilding

  const buildingMap = useMemo(() => {
    const map: Record<string, [number,number,number]> = {}
    buildings.forEach(b => { map[b.id] = b.position })
    return map
  }, [])

  const roads = useMemo(() => {
    const seen = new Set<string>()
    const result: { key: string; from: THREE.Vector3; to: THREE.Vector3; ids: [string,string] }[] = []
    buildings.forEach(b => {
      b.connections.forEach(connId => {
        const key = [b.id, connId].sort().join('--')
        if (!seen.has(key) && buildingMap[connId]) {
          seen.add(key)
          result.push({
            key,
            from: new THREE.Vector3(b.position[0], 0.05, b.position[2]),
            to: new THREE.Vector3(buildingMap[connId][0], 0.05, buildingMap[connId][2]),
            ids: [b.id, connId],
          })
        }
      })
    })
    return result
  }, [buildingMap])

  return (
    <group>
      {roads.map(r => {
        const isHighlighted = activeBuilding
          ? r.ids.includes(activeBuilding.id)
          : false
        return (
          <Line
            key={r.key}
            points={[r.from, r.to]}
            color={isHighlighted ? '#00f0ff' : '#1e3a4a'}
            lineWidth={1.5}
            transparent
            opacity={isHighlighted ? 0.9 : 0.4}
          />
        )
      })}
    </group>
  )
}
