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

function getGeometry(style: BuildingType['style']): JSX.Element {
  switch (style) {
    case 'gothic-spire':
      return (
        <group>
          <mesh position={[0, 2, 0]} castShadow>
            <boxGeometry args={[2.5, 4, 2.5]} />
            <meshStandardMaterial color="#1a0a2e" roughness={0.8} metalness={0.3} />
          </mesh>
          <mesh position={[0, 5.5, 0]} castShadow>
            <cylinderGeometry args={[0.8, 1.2, 3, 6]} />
            <meshStandardMaterial color="#2d1b69" roughness={0.7} metalness={0.3} />
          </mesh>
          <mesh position={[0, 8.5, 0]} castShadow>
            <coneGeometry args={[0.8, 4, 6]} />
            <meshStandardMaterial color="#4c1d95" roughness={0.5} metalness={0.5} />
          </mesh>
          {/* Side spires */}
          {[[-1.2, 0], [1.2, 0], [0, -1.2], [0, 1.2]].map(([x, z], i) => (
            <mesh key={i} position={[x, 6, z]} castShadow>
              <coneGeometry args={[0.25, 2.5, 5]} />
              <meshStandardMaterial color="#5b21b6" roughness={0.6} metalness={0.4} />
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
              <meshStandardMaterial color={`hsl(175, 60%, ${10 + i * 3}%)`} roughness={0.9} metalness={0.2} />
            </mesh>
          ))}
        </group>
      )

    case 'civic':
      return (
        <group>
          <mesh position={[0, 1.2, 0]} castShadow>
            <boxGeometry args={[4, 2.4, 3]} />
            <meshStandardMaterial color="#1c1005" roughness={0.8} metalness={0.2} />
          </mesh>
          {/* Columns */}
          {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
            <mesh key={i} position={[x, 1.2, 1.6]} castShadow>
              <cylinderGeometry args={[0.1, 0.1, 2.2, 8]} />
              <meshStandardMaterial color="#3d2a00" roughness={0.7} />
            </mesh>
          ))}
          {/* Roof */}
          <mesh position={[0, 2.6, 0]} castShadow>
            <boxGeometry args={[4.4, 0.3, 3.4]} />
            <meshStandardMaterial color="#2d1f00" roughness={0.9} />
          </mesh>
        </group>
      )

    case 'clock-tower':
      return (
        <group>
          <mesh position={[0, 2, 0]} castShadow>
            <boxGeometry args={[1.5, 4, 1.5]} />
            <meshStandardMaterial color="#0a1929" roughness={0.7} metalness={0.5} />
          </mesh>
          <mesh position={[0, 4.5, 0]} castShadow>
            <cylinderGeometry args={[0.9, 0.9, 0.4, 16]} />
            <meshStandardMaterial color="#0c2340" roughness={0.5} metalness={0.7} />
          </mesh>
          <mesh position={[0, 5.5, 0]} castShadow>
            <coneGeometry args={[0.9, 1.5, 8]} />
            <meshStandardMaterial color="#0e2d50" roughness={0.5} metalness={0.8} />
          </mesh>
        </group>
      )

    case 'ledger':
      return (
        <group>
          <mesh position={[0, 0.8, 0]} castShadow>
            <boxGeometry args={[2.5, 1.6, 2]} />
            <meshStandardMaterial color="#1a0f00" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.8, 0.9]} castShadow>
            <boxGeometry args={[2, 0.8, 0.15]} />
            <meshStandardMaterial color="#0f0800" roughness={0.9} />
          </mesh>
        </group>
      )

    case 'workshop':
      return (
        <group>
          <mesh position={[0, 0.7, 0]} castShadow>
            <boxGeometry args={[3, 1.4, 2.5]} />
            <meshStandardMaterial color="#111111" roughness={0.95} metalness={0.3} />
          </mesh>
          {/* Roof ridge */}
          <mesh position={[0, 1.6, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 2.6, 4]} />
            <meshStandardMaterial color="#222222" roughness={0.9} />
          </mesh>
        </group>
      )

    case 'dome':
      return (
        <group>
          <mesh position={[0, 0.6, 0]} castShadow>
            <cylinderGeometry args={[1.8, 1.8, 1.2, 16]} />
            <meshStandardMaterial color="#050f1a" roughness={0.7} metalness={0.4} />
          </mesh>
          <mesh position={[0, 1.8, 0]} castShadow>
            <sphereGeometry args={[1.8, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#0a1f33" roughness={0.5} metalness={0.6} />
          </mesh>
          <mesh position={[0, 3.7, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 2, 6]} />
            <meshStandardMaterial color="#1d4ed8" roughness={0.3} metalness={0.9} />
          </mesh>
        </group>
      )

    case 'loft':
      return (
        <group>
          <mesh position={[0, 1.2, 0]} castShadow>
            <boxGeometry args={[2.8, 2.4, 2.5]} />
            <meshStandardMaterial color="#1a0020" roughness={0.8} metalness={0.2} />
          </mesh>
          {/* Neon sign */}
          <mesh position={[0, 2.8, 1.26]} castShadow>
            <boxGeometry args={[2.2, 0.4, 0.05]} />
            <meshStandardMaterial color="#d946ef" emissive="#d946ef" emissiveIntensity={2} />
          </mesh>
        </group>
      )

    case 'glass-tower':
      return (
        <group>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[0, i * 1.2 + 0.6, 0]} castShadow>
              <boxGeometry args={[2.2 - i * 0.1, 1.1, 2.2 - i * 0.1]} />
              <meshStandardMaterial color="#051a10" roughness={0.2} metalness={0.8} transparent opacity={0.9} />
            </mesh>
          ))}
        </group>
      )

    case 'sterile-cube':
      return (
        <group>
          <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[2.5, 2, 2.5]} />
            <meshStandardMaterial color="#0d0d0d" roughness={0.3} metalness={0.5} />
          </mesh>
          {/* Warning stripe */}
          <mesh position={[0, 1, 1.26]} castShadow>
            <boxGeometry args={[2.5, 0.2, 0.02]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} />
          </mesh>
        </group>
      )

    case 'press':
      return (
        <group>
          <mesh position={[0, 0.9, 0]} castShadow>
            <boxGeometry args={[3.2, 1.8, 2.5]} />
            <meshStandardMaterial color="#1a0800" roughness={0.9} metalness={0.2} />
          </mesh>
          <mesh position={[0, 1.9, 0]} castShadow>
            <boxGeometry args={[2, 0.3, 1.8]} />
            <meshStandardMaterial color="#2d1200" roughness={0.8} />
          </mesh>
        </group>
      )

    case 'exchange':
      return (
        <group>
          <mesh position={[0, 1.5, 0]} castShadow>
            <boxGeometry args={[3.5, 3, 3]} />
            <meshStandardMaterial color="#0d0a1a" roughness={0.7} metalness={0.4} />
          </mesh>
          <mesh position={[0, 3.1, 0]} castShadow>
            <boxGeometry args={[3.8, 0.3, 3.3]} />
            <meshStandardMaterial color="#1a1230" roughness={0.8} />
          </mesh>
        </group>
      )

    case 'examination-hall':
      return (
        <group>
          <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[3, 2, 3.5]} />
            <meshStandardMaterial color="#140a20" roughness={0.8} metalness={0.3} />
          </mesh>
          {[-1, 1].map((x, i) => (
            <mesh key={i} position={[x, 2.2, 1.8]} castShadow>
              <cylinderGeometry args={[0.12, 0.12, 2, 8]} />
              <meshStandardMaterial color="#2d1050" roughness={0.7} />
            </mesh>
          ))}
        </group>
      )

    case 'filing-cabinet':
      return (
        <group>
          <mesh position={[0, 1.2, 0]} castShadow>
            <boxGeometry args={[1.8, 2.4, 1.2]} />
            <meshStandardMaterial color="#0a0a14" roughness={0.7} metalness={0.7} />
          </mesh>
          {[0.4, 0, -0.4].map((y, i) => (
            <mesh key={i} position={[0, 1.2 + y, 0.62]} castShadow>
              <boxGeometry args={[1.4, 0.35, 0.05]} />
              <meshStandardMaterial color="#1e2a3a" roughness={0.6} metalness={0.8} />
            </mesh>
          ))}
        </group>
      )

    case 'radio-tower':
      return (
        <group>
          {/* Lattice base */}
          <mesh position={[0, 3, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.5, 6, 4]} />
            <meshStandardMaterial color="#0a1929" roughness={0.5} metalness={0.9} />
          </mesh>
          <mesh position={[0, 6.5, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.1, 1.5, 4]} />
            <meshStandardMaterial color="#0c2340" roughness={0.4} metalness={0.9} />
          </mesh>
          {/* Blink light */}
          <mesh position={[0, 7.5, 0]} castShadow>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={3} />
          </mesh>
        </group>
      )

    case 'broadcast-station':
      return (
        <group>
          <mesh position={[0, 0.8, 0]} castShadow>
            <boxGeometry args={[4, 1.6, 3]} />
            <meshStandardMaterial color="#0d0d20" roughness={0.8} metalness={0.3} />
          </mesh>
          {/* Dish */}
          <mesh position={[1.2, 2, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
            <sphereGeometry args={[0.8, 8, 8, 0, Math.PI * 2, 0, Math.PI / 3]} />
            <meshStandardMaterial color="#1e1e3a" roughness={0.5} metalness={0.7} side={2} />
          </mesh>
        </group>
      )

    case 'journal-row':
      return (
        <group>
          {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
            <mesh key={i} position={[x, 0.8, 0]} castShadow>
              <boxGeometry args={[0.6, 1.6, 0.8]} />
              <meshStandardMaterial color={`hsl(40, 70%, ${10 + i * 4}%)`} roughness={0.9} />
            </mesh>
          ))}
        </group>
      )

    case 'bunker':
      return (
        <group>
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[3.5, 0.8, 3]} />
            <meshStandardMaterial color="#051505" roughness={0.95} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0.85, 0]}>
            <boxGeometry args={[1.2, 0.3, 1.2]} />
            <meshStandardMaterial color="#0a2010" roughness={0.9} />
          </mesh>
        </group>
      )

    case 'generator':
      return (
        <group>
          <mesh position={[0, 0.7, 0]} castShadow>
            <cylinderGeometry args={[1, 1.2, 1.4, 8]} />
            <meshStandardMaterial color="#1a0f00" roughness={0.7} metalness={0.6} />
          </mesh>
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.6, 8]} />
            <meshStandardMaterial color="#2d1f00" roughness={0.6} metalness={0.7} />
          </mesh>
        </group>
      )

    case 'observatory-tower':
      return (
        <group>
          <mesh position={[0, 2.5, 0]} castShadow>
            <cylinderGeometry args={[0.8, 1.2, 5, 8]} />
            <meshStandardMaterial color="#050a1a" roughness={0.6} metalness={0.5} />
          </mesh>
          {/* Spinning radar */}
          <mesh position={[0, 5.2, 0]} castShadow>
            <boxGeometry args={[2.5, 0.1, 0.4]} />
            <meshStandardMaterial color="#1d4ed8" emissive="#1d4ed8" emissiveIntensity={1.5} />
          </mesh>
        </group>
      )

    case 'newsroom':
      return (
        <group>
          <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[3, 2, 2.5]} />
            <meshStandardMaterial color="#020c14" roughness={0.3} metalness={0.6} transparent opacity={0.9} />
          </mesh>
          {/* Glowing screens */}
          {[-0.8, 0, 0.8].map((x, i) => (
            <mesh key={i} position={[x, 1, 1.26]} castShadow>
              <boxGeometry args={[0.6, 0.8, 0.02]} />
              <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.5} />
            </mesh>
          ))}
        </group>
      )

    case 'bulletin':
      return (
        <group>
          <mesh position={[0, 0.2, 0]} castShadow>
            <boxGeometry args={[4, 0.4, 3]} />
            <meshStandardMaterial color="#020f0e" roughness={0.9} />
          </mesh>
          <mesh position={[0, 1.2, 0]} castShadow>
            <boxGeometry args={[3.5, 1.6, 0.2]} />
            <meshStandardMaterial color="#0d9488" emissive="#0d9488" emissiveIntensity={0.5} />
          </mesh>
        </group>
      )

    case 'marketplace':
      return (
        <group>
          <mesh position={[0, 0.5, 0]} castShadow>
            <boxGeometry args={[2.5, 1, 2]} />
            <meshStandardMaterial color="#1a0020" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.2, 0]} rotation={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[1.5, 1.5, 0.1, 4]} />
            <meshStandardMaterial color="#2d0040" roughness={0.7} />
          </mesh>
        </group>
      )

    case 'gym':
      return (
        <group>
          <mesh position={[0, 0.8, 0]} castShadow>
            <boxGeometry args={[2.8, 1.6, 2.2]} />
            <meshStandardMaterial color="#1a0800" roughness={0.8} metalness={0.3} />
          </mesh>
          {/* Barbell */}
          <mesh position={[0, 1.8, 0.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 2.5, 6]} />
            <meshStandardMaterial color="#333" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      )

    case 'search-tower':
      return (
        <group>
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.9, 1.1, 3, 6]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0.2} />
          </mesh>
          {/* Dark/locked indicator */}
          <mesh position={[0, 3.2, 0]} castShadow>
            <boxGeometry args={[0.6, 0.8, 0.3]} />
            <meshStandardMaterial color="#111111" roughness={0.9} />
          </mesh>
        </group>
      )

    case 'comms-shack':
      return (
        <group>
          <mesh position={[0, 0.7, 0]} castShadow>
            <boxGeometry args={[2, 1.4, 1.8]} />
            <meshStandardMaterial color="#0d0d20" roughness={0.8} metalness={0.3} />
          </mesh>
          <mesh position={[0.5, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 1, 6]} />
            <meshStandardMaterial color="#818cf8" roughness={0.4} metalness={0.9} />
          </mesh>
        </group>
      )

    case 'meteo-station':
      return (
        <group>
          <mesh position={[0, 0.6, 0]} castShadow>
            <boxGeometry args={[1.8, 1.2, 1.8]} />
            <meshStandardMaterial color="#050a14" roughness={0.8} metalness={0.3} />
          </mesh>
          {/* Wind vane */}
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 1.2, 6]} />
            <meshStandardMaterial color="#7dd3fc" roughness={0.3} metalness={0.9} />
          </mesh>
        </group>
      )

    default:
      return (
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[2, 1.6, 2]} />
          <meshStandardMaterial color="#111111" roughness={0.8} />
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

  const scale = isHovered || isSelected ? 1.05 : 1

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
      scale={[scale, scale, scale]}
    >
      {getGeometry(building.style)}

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
