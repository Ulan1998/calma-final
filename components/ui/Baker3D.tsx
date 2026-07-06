'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, ContactShadows } from '@react-three/drei'
import { Group } from 'three'

function BakerModel() {
  const rootRef = useRef<Group>(null)
  const leftArmRef = useRef<Group>(null)
  const rightArmRef = useRef<Group>(null)
  const rollingPinRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (rootRef.current) {
      rootRef.current.position.y = Math.sin(t * 1.4) * 0.03
      rootRef.current.rotation.z = Math.sin(t * 0.9) * 0.012
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(t * 1.4) * 0.18
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = -Math.sin(t * 1.4) * 0.18
    }
    if (rollingPinRef.current) {
      rollingPinRef.current.rotation.y = t * 0.5
    }
  })

  return (
    <group ref={rootRef}>

      {/* HAT brim */}
      <mesh position={[0, 2.19, 0]}>
        <cylinderGeometry args={[0.43, 0.43, 0.06, 40]} />
        <meshStandardMaterial color="#F7F3EA" roughness={0.35} />
      </mesh>
      {/* HAT crown */}
      <mesh position={[0, 2.53, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.58, 40]} />
        <meshStandardMaterial color="#F7F3EA" roughness={0.35} />
      </mesh>
      {/* Hat gold band */}
      <mesh position={[0, 2.27, 0]}>
        <cylinderGeometry args={[0.302, 0.302, 0.07, 40]} />
        <meshStandardMaterial color="#C9A84C" roughness={0.2} metalness={0.4} />
      </mesh>

      {/* HEAD */}
      <mesh position={[0, 1.82, 0]}>
        <sphereGeometry args={[0.31, 36, 36]} />
        <meshStandardMaterial color="#F4CA96" roughness={0.65} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.11, 1.88, 0.29]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#2C1A0E" roughness={0.9} />
      </mesh>
      <mesh position={[0.11, 1.88, 0.29]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#2C1A0E" roughness={0.9} />
      </mesh>
      {/* Eyebrows */}
      <mesh position={[-0.115, 1.955, 0.28]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[0.1, 0.022, 0.022]} />
        <meshStandardMaterial color="#8B5E3C" roughness={0.8} />
      </mesh>
      <mesh position={[0.115, 1.955, 0.28]} rotation={[0, 0, -0.25]}>
        <boxGeometry args={[0.1, 0.022, 0.022]} />
        <meshStandardMaterial color="#8B5E3C" roughness={0.8} />
      </mesh>
      {/* Smile */}
      <mesh position={[0, 1.74, 0.3]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.085, 0.018, 8, 20, Math.PI]} />
        <meshStandardMaterial color="#C1604A" roughness={0.8} />
      </mesh>
      {/* Blush */}
      <mesh position={[-0.22, 1.76, 0.26]}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshStandardMaterial color="#F08070" roughness={1} transparent opacity={0.55} />
      </mesh>
      <mesh position={[0.22, 1.76, 0.26]}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshStandardMaterial color="#F08070" roughness={1} transparent opacity={0.55} />
      </mesh>

      {/* TORSO */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.64, 0.66, 0.46]} />
        <meshStandardMaterial color="#8B4513" roughness={0.5} />
      </mesh>
      {/* Collar */}
      <mesh position={[0, 1.44, 0.24]}>
        <boxGeometry args={[0.3, 0.12, 0.04]} />
        <meshStandardMaterial color="#F7F3EA" roughness={0.3} />
      </mesh>
      {/* Apron */}
      <mesh position={[0, 1.0, 0.245]}>
        <boxGeometry args={[0.46, 0.62, 0.03]} />
        <meshStandardMaterial color="#F7F3EA" roughness={0.4} />
      </mesh>
      {/* Apron pocket */}
      <mesh position={[0, 0.82, 0.265]}>
        <boxGeometry args={[0.22, 0.14, 0.03]} />
        <meshStandardMaterial color="#EDE8DA" roughness={0.4} />
      </mesh>

      {/* LEFT ARM */}
      <group ref={leftArmRef} position={[-0.47, 1.12, 0]}>
        <mesh rotation={[0.55, 0, 0.38]}>
          <capsuleGeometry args={[0.09, 0.36, 8, 16]} />
          <meshStandardMaterial color="#8B4513" roughness={0.5} />
        </mesh>
        <mesh position={[-0.12, -0.32, 0.22]}>
          <sphereGeometry args={[0.1, 18, 18]} />
          <meshStandardMaterial color="#F4CA96" roughness={0.65} />
        </mesh>
      </group>

      {/* RIGHT ARM */}
      <group ref={rightArmRef} position={[0.47, 1.12, 0]}>
        <mesh rotation={[0.55, 0, -0.38]}>
          <capsuleGeometry args={[0.09, 0.36, 8, 16]} />
          <meshStandardMaterial color="#8B4513" roughness={0.5} />
        </mesh>
        <mesh position={[0.12, -0.32, 0.22]}>
          <sphereGeometry args={[0.1, 18, 18]} />
          <meshStandardMaterial color="#F4CA96" roughness={0.65} />
        </mesh>
      </group>

      {/* ROLLING PIN */}
      <group ref={rollingPinRef} position={[0, 0.77, 0.38]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.055, 0.055, 0.72, 24]} />
          <meshStandardMaterial color="#DEB887" roughness={0.35} metalness={0.1} />
        </mesh>
        <mesh position={[-0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 0.1, 20]} />
          <meshStandardMaterial color="#C9A84C" roughness={0.2} metalness={0.5} />
        </mesh>
        <mesh position={[0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 0.1, 20]} />
          <meshStandardMaterial color="#C9A84C" roughness={0.2} metalness={0.5} />
        </mesh>
      </group>

      {/* HIPS */}
      <mesh position={[0, 0.66, 0]}>
        <boxGeometry args={[0.6, 0.38, 0.44]} />
        <meshStandardMaterial color="#6B3210" roughness={0.5} />
      </mesh>

      {/* LEGS */}
      <mesh position={[-0.15, 0.3, 0]}>
        <boxGeometry args={[0.24, 0.38, 0.4]} />
        <meshStandardMaterial color="#6B3210" roughness={0.5} />
      </mesh>
      <mesh position={[0.15, 0.3, 0]}>
        <boxGeometry args={[0.24, 0.38, 0.4]} />
        <meshStandardMaterial color="#6B3210" roughness={0.5} />
      </mesh>

      {/* SHOES */}
      <mesh position={[-0.155, 0.07, 0.07]}>
        <boxGeometry args={[0.27, 0.12, 0.48]} />
        <meshStandardMaterial color="#1C0F08" roughness={0.6} />
      </mesh>
      <mesh position={[0.155, 0.07, 0.07]}>
        <boxGeometry args={[0.27, 0.12, 0.48]} />
        <meshStandardMaterial color="#1C0F08" roughness={0.6} />
      </mesh>

    </group>
  )
}

interface Baker3DProps {
  className?: string
}

export function Baker3D({ className }: Baker3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.35, 5.2], fov: 32 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      className={className}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 4]} intensity={1.8} color="#FFF8E7" castShadow />
      <directionalLight position={[-4, 2, 2]} intensity={0.5} color="#C9A84C" />
      <pointLight position={[0, 4, 3]} intensity={0.6} color="#FFF4D0" />
      <Environment preset="studio" />
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.25}
        scale={3}
        blur={1.5}
        far={3}
        color="#8B4513"
      />
      <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.4}>
        <BakerModel />
      </Float>
    </Canvas>
  )
}
