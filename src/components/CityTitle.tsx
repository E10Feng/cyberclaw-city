'use client'
import { useRef } from 'react'
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CityTitle() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.position.y = 38 + Math.sin(state.clock.elapsedTime * 0.8) * 0.3
    groupRef.current.lookAt(state.camera.position)
  })

  return (
    <group ref={groupRef} position={[0, 38, -50]}>
      <Text
        fontSize={4}
        color="#00f0ff"
        anchorX="center"
        anchorY="middle"
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
