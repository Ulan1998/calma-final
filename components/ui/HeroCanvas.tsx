'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import type { Mesh } from 'three'

function DistortSphere() {
  const ref = useRef<Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.15
  })
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={ref} args={[1, 80, 80]}>
        <MeshDistortMaterial
          color="#C49A6C"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.6}
        />
      </Sphere>
    </Float>
  )
}

export function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#C9A84C" />
      <directionalLight position={[-5, -5, 2]} intensity={0.5} color="#8B4513" />
      <DistortSphere />
    </Canvas>
  )
}
