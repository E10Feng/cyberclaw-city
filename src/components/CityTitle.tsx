'use client'
import { useRef } from 'react'
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CityTitle() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.position.y = 18 + Math.sin(state.clock.elapsedTime * 0.8) * 0.3
  })

  return (
    <group ref={groupRef} position={[0, 18, -30]}>
      <Text
        fontSize={3}
        color="#00f0ff"
        anchorX="center"
        anchorY="middle"
        font={undefined}
        outlineWidth={0.05}
        outlineColor="#0080ff"
      >
        CYBERCLAW CITY
      </Text>
      <Text
        fontSize={1}
        color="#7c3aed"
        anchorX="center"
        anchorY="middle"
        position={[0, -3.5, 0]}
      >
        AI AGENT ARCHITECTURE VISUALIZER
      </Text>
    </group>
  )
}
