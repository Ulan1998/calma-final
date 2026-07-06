'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei'
import type { Mesh } from 'three'

function GoldenBlob() {
  const ref = useRef<Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.12
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.07) * 0.15
  })

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.0}>
      <mesh ref={ref} scale={1.15}>
        <torusKnotGeometry args={[0.85, 0.28, 200, 32, 2, 3]} />
        <MeshTransmissionMaterial
          color="#C9A84C"
          backside
          samples={8}
          resolution={256}
          transmission={0.25}
          roughness={0.05}
          metalness={0.0}
          thickness={0.5}
          chromaticAberration={0.06}
          anisotropy={0.3}
          clearcoat={1}
          clearcoatRoughness={0.05}
          attenuationDistance={0.5}
          attenuationColor="#C9A84C"
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh scale={0.55}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#E8C86A"
          emissive="#C9A84C"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

export function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 40 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 6, 4]} intensity={2.5} color="#F5DEB3" />
      <directionalLight position={[-6, -2, 2]} intensity={0.8} color="#8B4513" />
      <pointLight position={[0, 0, 6]} intensity={1.2} color="#FFF8DC" />
      <Environment preset="studio" />
      <GoldenBlob />
    </Canvas>
  )
}
