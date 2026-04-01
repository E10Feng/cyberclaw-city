'use client'
import { useRef } from 'react'
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { districtColors } from '@/data/city-map'

const DISTRICT_LABELS: { label: string; position: [number, number, number]; color: string }[] = [
  { label: 'CORE', position: [0, 22, 0], color: districtColors.core },
  { label: 'BUILD PIPELINE', position: [-39, 12, -25], color: districtColors['build-pipeline'] },
  { label: 'JOB DISTRICT', position: [52, 12, -15], color: districtColors['job-pipeline'] },
  { label: 'COMMS', position: [-13, 12, 50], color: districtColors.comms },
  { label: 'MEMORY LANE', position: [35, 12, 28], color: districtColors.memory },
  { label: 'AI BRIEFING', position: [0, 12, 80], color: districtColors['ai-briefing'] },
  { label: 'SKILLS QUARTER', position: [-47, 12, 8], color: districtColors.skills },
]

// Billboard wrapper — text always faces the camera
function BillboardText({ children, position, color, fontSize = 1.5 }: {
  children: React.ReactNode
  position: [number, number, number]
  color: string
  fontSize?: number
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.lookAt(state.camera.position)
  })

  return (
    <group ref={groupRef} position={position}>
      <Text
        fontSize={fontSize}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        {children}
      </Text>
    </group>
  )
}

export default function DistrictLabels() {
  return (
    <>
      {DISTRICT_LABELS.map(({ label, position, color }) => (
        <BillboardText key={label} position={position} color={color}>
          {label}
        </BillboardText>
      ))}
    </>
  )
}
