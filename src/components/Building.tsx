'use client'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { Building as BuildingType } from '@/data/city-map'
import { useCityStore } from '@/store/useCity'

interface BuildingProps {
  building: BuildingType
}

function getGeometry(style: BuildingType['style'], color: string, emissive: string): JSX.Element {
  const mat = { color, emissive, emissiveIntensity: 0.6, roughness: 0.4, metalness: 0.6 }
  const darkMat = { color: '#111111', roughness: 0.9, metalness: 0.1 }

  switch (style) {
    case 'gothic-spire':
      return (
        <group>
          <mesh position={[0, 2, 0]} castShadow>
            <boxGeometry args={[2.5, 4, 2.5]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0, 5.5, 0]} castShadow>
            <cylinderGeometry args={[0.8, 1.2, 3, 6]} />
            <meshStandardMaterial {...mat} emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[0, 8.5, 0]} castShadow>
            <coneGeometry args={[0.8, 4, 6]} />
            <meshStandardMaterial {...mat} emissiveIntensity={1.0} />
          </mesh>
          {[[-1.2, 0], [1.2, 0], [0, -1.2], [0, 1.2]].map(([x, z], i) => (
            <mesh key={i} position={[x, 6, z]} castShadow>
              <coneGeometry args={[0.25, 2.5, 5]} />
              <meshStandardMaterial {...mat} emissiveIntensity={0.7} />
            </mesh>
          ))}
        </group>
      )

    case 'brutalist-library':
      return (
        <group>
          {[0, 1.2, 2.4, 3.6].map((y, i) => (
            <mesh key={i} position={[0, y * 0.5 + 0.8, 0]} castShadow>
              <boxGeometry args={[3 - i * 0.2, 0.8, 3 - i * 0.2]} />
              <meshStandardMaterial {...mat} emissiveIntensity={0.4 + i * 0.15} />
            </mesh>
          ))}
        </group>
      )

    case 'civic':
      return (
        <group>
          <mesh position={[0, 1.2, 0]} castShadow>
            <boxGeometry args={[4, 2.4, 3]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
            <mesh key={i} position={[x, 1.2, 1.6]} castShadow>
              <cylinderGeometry args={[0.1, 0.1, 2.2, 8]} />
              <meshStandardMaterial {...mat} />
            </mesh>
          ))}
          <mesh position={[0, 2.6, 0]} castShadow>
            <boxGeometry args={[4.4, 0.3, 3.4]} />
            <meshStandardMaterial {...mat} emissiveIntensity={0.9} />
          </mesh>
        </group>
      )

    case 'clock-tower':
      return (
        <group>
          <mesh position={[0, 2, 0]} castShadow>
            <boxGeometry args={[1.5, 4, 1.5]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0, 4.5, 0]} castShadow>
            <cylinderGeometry args={[0.9, 0.9, 0.4, 16]} />
            <meshStandardMaterial {...mat} emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[0, 5.5, 0]} castShadow>
            <coneGeometry args={[0.9, 1.5, 8]} />
            <meshStandardMaterial {...mat} emissiveIntensity={1.2} />
          </mesh>
        </group>
      )

    case 'ledger':
      return (
        <group>
          <mesh position={[0, 0.8, 0]} castShadow>
            <boxGeometry args={[2.5, 1.6, 2]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0, 1.8, 0.9]} castShadow>
            <boxGeometry args={[2, 0.8, 0.15]} />
            <meshStandardMaterial {...mat} emissiveIntensity={1.0} />
          </mesh>
        </group>
      )

    case 'workshop':
      return (
        <group>
          <mesh position={[0, 0.7, 0]} castShadow>
            <boxGeometry args={[3, 1.4, 2.5]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0, 1.6, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 2.6, 4]} />
            <meshStandardMaterial {...mat} emissiveIntensity={0.8} />
          </mesh>
        </group>
      )

    case 'dome':
      return (
        <group>
          <mesh position={[0, 0.6, 0]} castShadow>
            <cylinderGeometry args={[1.8, 1.8, 1.2, 16]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0, 1.8, 0]} castShadow>
            <sphereGeometry args={[1.8, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial {...mat} emissiveIntensity={0.9} />
          </mesh>
          <mesh position={[0, 3.7, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 2, 6]} />
            <meshStandardMaterial {...mat} emissiveIntensity={1.5} />
          </mesh>
        </group>
      )

    case 'loft':
      return (
        <group>
          <mesh position={[0, 1.2, 0]} castShadow>
            <boxGeometry args={[2.8, 2.4, 2.5]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0, 2.8, 1.26]} castShadow>
            <boxGeometry args={[2.2, 0.4, 0.05]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
          </mesh>
        </group>
      )

    case 'glass-tower':
      return (
        <group>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[0, i * 1.2 + 0.6, 0]} castShadow>
              <boxGeometry args={[2.2 - i * 0.1, 1.1, 2.2 - i * 0.1]} />
              <meshStandardMaterial {...mat} roughness={0.1} metalness={0.9} emissiveIntensity={0.5 + i * 0.2} />
            </mesh>
          ))}
        </group>
      )

    case 'sterile-cube':
      return (
        <group>
          <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[2.5, 2, 2.5]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0, 1, 1.26]} castShadow>
            <boxGeometry args={[2.5, 0.2, 0.02]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
          </mesh>
        </group>
      )

    case 'press':
      return (
        <group>
          <mesh position={[0, 0.9, 0]} castShadow>
            <boxGeometry args={[3.2, 1.8, 2.5]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0, 1.9, 0]} castShadow>
            <boxGeometry args={[2, 0.3, 1.8]} />
            <meshStandardMaterial {...mat} emissiveIntensity={0.8} />
          </mesh>
        </group>
      )

    case 'exchange':
      return (
        <group>
          <mesh position={[0, 1.5, 0]} castShadow>
            <boxGeometry args={[3.5, 3, 3]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0, 3.1, 0]} castShadow>
            <boxGeometry args={[3.8, 0.3, 3.3]} />
            <meshStandardMaterial {...mat} emissiveIntensity={0.9} />
          </mesh>
        </group>
      )

    case 'examination-hall':
      return (
        <group>
          <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[3, 2, 3.5]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          {[-1, 1].map((x, i) => (
            <mesh key={i} position={[x, 2.2, 1.8]} castShadow>
              <cylinderGeometry args={[0.12, 0.12, 2, 8]} />
              <meshStandardMaterial {...mat} />
            </mesh>
          ))}
        </group>
      )

    case 'filing-cabinet':
      return (
        <group>
          <mesh position={[0, 1.2, 0]} castShadow>
            <boxGeometry args={[1.8, 2.4, 1.2]} />
            <meshStandardMaterial {...mat} roughness={0.5} metalness={0.8} />
          </mesh>
          {[0.4, 0, -0.4].map((y, i) => (
            <mesh key={i} position={[0, 1.2 + y, 0.62]} castShadow>
              <boxGeometry args={[1.4, 0.35, 0.05]} />
              <meshStandardMaterial {...mat} emissiveIntensity={0.8} />
            </mesh>
          ))}
        </group>
      )

    case 'radio-tower':
      return (
        <group>
          <mesh position={[0, 3, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.5, 6, 4]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0, 6.5, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.1, 1.5, 4]} />
            <meshStandardMaterial {...mat} emissiveIntensity={1.0} />
          </mesh>
          <mesh position={[0, 7.5, 0]} castShadow>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={4} />
          </mesh>
        </group>
      )

    case 'broadcast-station':
      return (
        <group>
          <mesh position={[0, 0.8, 0]} castShadow>
            <boxGeometry args={[4, 1.6, 3]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[1.2, 2, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
            <sphereGeometry args={[0.8, 8, 8, 0, Math.PI * 2, 0, Math.PI / 3]} />
            <meshStandardMaterial {...mat} emissiveIntensity={0.8} side={2} />
          </mesh>
        </group>
      )

    case 'journal-row':
      return (
        <group>
          {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
            <mesh key={i} position={[x, 0.8, 0]} castShadow>
              <boxGeometry args={[0.6, 1.6, 0.8]} />
              <meshStandardMaterial {...mat} emissiveIntensity={0.5 + i * 0.15} />
            </mesh>
          ))}
        </group>
      )

    case 'bunker':
      return (
        <group>
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[3.5, 0.8, 3]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0, 0.85, 0]}>
            <boxGeometry args={[1.2, 0.3, 1.2]} />
            <meshStandardMaterial {...mat} emissiveIntensity={0.8} />
          </mesh>
        </group>
      )

    case 'generator':
      return (
        <group>
          <mesh position={[0, 0.7, 0]} castShadow>
            <cylinderGeometry args={[1, 1.2, 1.4, 8]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.6, 8]} />
            <meshStandardMaterial {...mat} emissiveIntensity={1.0} />
          </mesh>
        </group>
      )

    case 'observatory-tower':
      return (
        <group>
          <mesh position={[0, 2.5, 0]} castShadow>
            <cylinderGeometry args={[0.8, 1.2, 5, 8]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0, 5.2, 0]} castShadow>
            <boxGeometry args={[2.5, 0.1, 0.4]} />
            <meshStandardMaterial color="#1d4ed8" emissive="#1d4ed8" emissiveIntensity={2.5} />
          </mesh>
        </group>
      )

    case 'newsroom':
      return (
        <group>
          <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[3, 2, 2.5]} />
            <meshStandardMaterial {...mat} roughness={0.2} metalness={0.8} />
          </mesh>
          {[-0.8, 0, 0.8].map((x, i) => (
            <mesh key={i} position={[x, 1, 1.26]} castShadow>
              <boxGeometry args={[0.6, 0.8, 0.02]} />
              <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2.5} />
            </mesh>
          ))}
        </group>
      )

    case 'bulletin':
      return (
        <group>
          <mesh position={[0, 0.2, 0]} castShadow>
            <boxGeometry args={[4, 0.4, 3]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0, 1.2, 0]} castShadow>
            <boxGeometry args={[3.5, 1.6, 0.2]} />
            <meshStandardMaterial color="#0d9488" emissive="#0d9488" emissiveIntensity={1.5} />
          </mesh>
        </group>
      )

    case 'marketplace':
      return (
        <group>
          <mesh position={[0, 0.5, 0]} castShadow>
            <boxGeometry args={[2.5, 1, 2]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0, 1.2, 0]} rotation={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[1.5, 1.5, 0.1, 4]} />
            <meshStandardMaterial {...mat} emissiveIntensity={0.9} />
          </mesh>
        </group>
      )

    case 'gym':
      return (
        <group>
          <mesh position={[0, 0.8, 0]} castShadow>
            <boxGeometry args={[2.8, 1.6, 2.2]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0, 1.8, 0.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 2.5, 6]} />
            <meshStandardMaterial color="#aaaaaa" emissive="#aaaaaa" emissiveIntensity={1.5} metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      )

    case 'search-tower':
      return (
        <group>
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.9, 1.1, 3, 6]} />
            <meshStandardMaterial {...darkMat} />
          </mesh>
          <mesh position={[0, 3.2, 0]} castShadow>
            <boxGeometry args={[0.6, 0.8, 0.3]} />
            <meshStandardMaterial color="#222222" emissive="#ff0000" emissiveIntensity={0.3} />
          </mesh>
        </group>
      )

    case 'comms-shack':
      return (
        <group>
          <mesh position={[0, 0.7, 0]} castShadow>
            <boxGeometry args={[2, 1.4, 1.8]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0.5, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 1, 6]} />
            <meshStandardMaterial {...mat} emissiveIntensity={1.2} />
          </mesh>
        </group>
      )

    case 'meteo-station':
      return (
        <group>
          <mesh position={[0, 0.6, 0]} castShadow>
            <boxGeometry args={[1.8, 1.2, 1.8]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 1.2, 6]} />
            <meshStandardMaterial {...mat} emissiveIntensity={1.5} />
          </mesh>
        </group>
      )

    default:
      return (
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[2, 1.6, 2]} />
          <meshStandardMaterial {...mat} />
        </mesh>
      )
  }
}

export default function Building({ building }: BuildingProps) {
  const meshRef = useRef<THREE.Group>(null)
  const [isHovered, setIsHovered] = useState(false)
  const setHovered = useCityStore(s => s.setHoveredBuilding)
  const setSelected = useCityStore(s => s.setSelectedBuilding)
  const selectedBuilding = useCityStore(s => s.selectedBuilding)
  const isSelected = selectedBuilding?.id === building.id

  useFrame((state) => {
    if (!meshRef.current) return
    // Gentle hover float
    if (isHovered || isSelected) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05
    } else {
      meshRef.current.position.y = 0
    }
    // Clock tower pulse
    if (building.style === 'clock-tower') {
      // pulse handled via emissive in geometry
    }
  })

  const baseScale = building.scale ?? 1
  const hoverScale = isHovered || isSelected ? 1.05 : 1
  const totalScale = baseScale * hoverScale

  return (
    <group
      position={building.position}
      ref={meshRef}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setIsHovered(true)
        setHovered(building)
        document.body.style.cursor = 'pointer'
      }}
      onPointerLeave={() => {
        setIsHovered(false)
        setHovered(null)
        document.body.style.cursor = 'auto'
      }}
      onClick={(e) => {
        e.stopPropagation()
        setSelected(isSelected ? null : building)
      }}
      scale={[totalScale, totalScale, totalScale]}
    >
      {getGeometry(building.style, building.color, building.emissive)}

      {/* Emissive glow base */}
      <mesh position={[0, 0.02, 0]}>
        <circleGeometry args={[1.8, 16]} />
        <meshBasicMaterial
          color={building.emissive}
          transparent
          opacity={isHovered || isSelected ? 0.4 : 0.15}
        />
      </mesh>

      {/* Point light for glow effect */}
      {(isHovered || isSelected) && (
        <pointLight
          color={building.color}
          intensity={2}
          distance={8}
          position={[0, 2, 0]}
        />
      )}

      {/* Tooltip */}
      {isHovered && (
        <Html
          position={[0, 6, 0]}
          center
          style={{ pointerEvents: 'none' }}
        >
          <div className="bg-black/80 border border-cyan-500/50 text-cyan-300 px-3 py-1 rounded text-xs font-mono whitespace-nowrap backdrop-blur-sm">
            {building.label}
          </div>
        </Html>
      )}
    </group>
  )
}
