'use client'
import { useRef } from 'react'
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { districtColors } from '@/data/city-map'

const DISTRICT_LABELS: { label: string; position: [number, number, number]; color: string }[] = [
  { label: 'CORE', position: [0, 30, 0], color: districtColors.core },
  { label: 'BUILD PIPELINE', position: [-39, 20, -25], color: districtColors['build-pipeline'] },
  { label: 'JOB DISTRICT', position: [52, 20, -15], color: districtColors['job-pipeline'] },
  { label: 'COMMS', position: [-13, 20, 50], color: districtColors.comms },
  { label: 'MEMORY LANE', position: [35, 20, 28], color: districtColors.memory },
  { label: 'AI BRIEFING', position: [0, 20, 80], color: districtColors['ai-briefing'] },
  { label: 'SKILLS QUARTER', position: [-47, 20, 8], color: districtColors.skills },
]

function DistrictLabel({ label, position, color }: { label: string; position: [number, number, number]; color: string }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.2
  })

  return (
    <group ref={groupRef} position={position}>
      <Text
        fontSize={2.5}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        {label}
      </Text>
    </group>
  )
}

export default function DistrictLabels() {
  return (
    <>
      {DISTRICT_LABELS.map(({ label, position, color }) => (
        <DistrictLabel key={label} label={label} position={position} color={color} />
      ))}
    </>
  )
}
