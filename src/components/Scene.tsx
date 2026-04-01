'use client'
import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'
import { buildings } from '@/data/city-map'
import { useCityStore } from '@/store/useCity'
import Building from './Building'
import Ground from './Ground'
import Roads from './Road'
import CityTitle from './CityTitle'
import DistrictLabels from './DistrictLabels'

const STREET_LEVEL = 2
const DROP_DURATION = 0.8 // seconds to drop from height to street level
const WALK_SPEED = 18

// First-person movement + gravity drop
function FirstPersonController() {
  const { camera } = useThree()
  const keys = useRef<Record<string, boolean>>({})
  const direction = useRef(new THREE.Vector3())

  // Gravity/drop state
  const isDropping = useRef(false)
  const dropTimer = useRef(0)
  const dropStartY = useRef(STREET_LEVEL)
  const wasJustDropped = useRef(false)
  const prevCameraMode = useRef('orbit')

  // Camera mode from store
  const cameraMode = useCityStore(s => s.cameraMode)

  // Detect when first-person mode is entered
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (prevCameraMode.current === 'orbit' && cameraMode === 'firstperson') {
      // Starting first-person — begin gravity drop
      dropStartY.current = camera.position.y
      dropTimer.current = 0
      isDropping.current = true
      wasJustDropped.current = true
    }
    prevCameraMode.current = cameraMode
  }, [cameraMode])

  // Keyboard input
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { keys.current[e.code] = true }
    const onKeyUp = (e: KeyboardEvent) => { keys.current[e.code] = false }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useFrame((_, delta) => {
    // ── Gravity drop ──────────────────────────────────────────
    if (isDropping.current) {
      dropTimer.current += delta
      const t = Math.min(dropTimer.current / DROP_DURATION, 1)
      // Exponential ease-out — fast start, slow landing
      const ease = 1 - Math.exp(-t * 4)
      camera.position.y = dropStartY.current + (STREET_LEVEL - dropStartY.current) * ease

      if (t >= 1) {
        camera.position.y = STREET_LEVEL
        isDropping.current = false
      }
      // Skip movement while dropping
      return
    }

    // ── Normal walking ────────────────────────────────────────
    direction.current.set(0, 0, 0)

    const forward = new THREE.Vector3()
    camera.getWorldDirection(forward)
    forward.y = 0
    forward.normalize()
    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize()

    if (keys.current['KeyW'] || keys.current['ArrowUp']) direction.current.add(forward)
    if (keys.current['KeyS'] || keys.current['ArrowDown']) direction.current.sub(forward)
    if (keys.current['KeyA'] || keys.current['ArrowLeft']) direction.current.sub(right)
    if (keys.current['KeyD'] || keys.current['ArrowRight']) direction.current.add(right)

    direction.current.normalize().multiplyScalar(WALK_SPEED * delta)
    camera.position.add(direction.current)
    camera.position.y = Math.max(STREET_LEVEL, camera.position.y)
  })

  return null
}

function SceneContent() {
  const cameraMode = useCityStore(s => s.cameraMode)

  return (
    <>
      {/* Fog */}
      <fog attach="fog" args={['#050508', 60, 180]} />

      {/* Lighting */}
      <ambientLight intensity={0.6} color="#1a1a2e" />
      <directionalLight
        position={[20, 30, 10]}
        intensity={0.5}
        color="#4040ff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 20, 0]} intensity={1.5} color="#7c3aed" distance={80} />
      <pointLight position={[-20, 10, 20]} intensity={0.8} color="#06b6d4" distance={60} />
      <pointLight position={[20, 10, -20]} intensity={0.8} color="#3b82f6" distance={60} />

      {/* Stars */}
      <Stars radius={100} depth={60} count={3000} factor={4} saturation={0.5} fade speed={0.5} />

      {/* Scene objects */}
      <Ground />
      <Roads />
      <CityTitle />
      <DistrictLabels />

      {buildings.map(b => (
        <Building key={b.id} building={b} />
      ))}

      {/* Camera Controls */}
      {cameraMode === 'orbit' ? (
        <OrbitControls
          makeDefault
          minDistance={5}
          maxDistance={120}
          maxPolarAngle={Math.PI / 2.1}
          enableDamping
          dampingFactor={0.05}
          target={[0, 0, 0]}
        />
      ) : (
        <>
          <PointerLockControls />
          <FirstPersonController />
        </>
      )}
    </>
  )
}

export default function Scene() {
  const cameraMode = useCityStore(s => s.cameraMode)
  const setCameraMode = useCityStore(s => s.setCameraMode)
  const setSelectedBuilding = useCityStore(s => s.setSelectedBuilding)

  // Global key handler for camera mode switching
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'KeyF') {
        setCameraMode(cameraMode === 'orbit' ? 'firstperson' : 'orbit')
      }
      if (e.code === 'Escape') {
        setCameraMode('orbit')
        setSelectedBuilding(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cameraMode, setCameraMode, setSelectedBuilding])

  return (
    <Canvas
      camera={{ position: [0, 35, 60], fov: 60, near: 0.1, far: 500 }}
      shadows
      gl={{ antialias: true, alpha: false }}
      style={{ background: '#050508' }}
      onPointerMissed={() => {
        useCityStore.getState().setSelectedBuilding(null)
      }}
    >
      <SceneContent />
    </Canvas>
  )
}
