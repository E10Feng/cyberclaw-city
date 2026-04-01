'use client'

export default function Ground() {
  return (
    <group>
      {/* Main ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial
          color="#0a0a0f"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Grid overlay */}
      <gridHelper
        args={[200, 100, '#1a1a2e', '#1a1a2e']}
        position={[0, 0, 0]}
      />

      {/* Subtle glow rings around origin */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[15, 15.3, 64]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[30, 30.3, 64]} />
        <meshBasicMaterial color="#1d4ed8" transparent opacity={0.15} />
      </mesh>
    </group>
  )
}
