'use client'
import { useMemo } from 'react'
import * as THREE from 'three'
import { buildings } from '@/data/city-map'
import { useCityStore } from '@/store/useCity'

function RoadLine({ from, to, isHighlighted }: { from: [number,number,number], to: [number,number,number], isHighlighted: boolean }) {
  const points = useMemo(() => {
    return [
      new THREE.Vector3(from[0], 0.05, from[2]),
      new THREE.Vector3(to[0], 0.05, to[2]),
    ]
  }, [from, to])

  const color = isHighlighted ? '#00f0ff' : '#1e3a4a'
  const opacity = isHighlighted ? 0.9 : 0.4

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={opacity} linewidth={2} />
    </line>
  )
}

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
    const result: { key: string; from: [number,number,number]; to: [number,number,number]; ids: [string,string] }[] = []
    buildings.forEach(b => {
      b.connections.forEach(connId => {
        const key = [b.id, connId].sort().join('--')
        if (!seen.has(key) && buildingMap[connId]) {
          seen.add(key)
          result.push({ key, from: b.position, to: buildingMap[connId], ids: [b.id, connId] })
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
          <RoadLine
            key={r.key}
            from={r.from}
            to={r.to}
            isHighlighted={isHighlighted}
          />
        )
      })}
    </group>
  )
}
