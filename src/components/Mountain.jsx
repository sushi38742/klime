import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { createNoise2D } from 'simplex-noise'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Mountain geometry using simplex noise
function MountainMesh({ scrollProgress }) {
  const meshRef = useRef()
  const snowRef = useRef()
  const noise2D = useMemo(() => createNoise2D(), [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const resolution = 120
    const width = 24
    const depth = 24
    const maxHeight = 18

    const vertices = []
    const indices = []
    const colors = []

    for (let z = 0; z <= resolution; z++) {
      for (let x = 0; x <= resolution; x++) {
        const nx = x / resolution
        const nz = z / resolution
        const px = (nx - 0.5) * width
        const pz = (nz - 0.5) * depth

        // Distance from center for mountain shape
        const distFromCenter = Math.sqrt(px * px + pz * pz)
        const mountainBase = Math.max(0, 1 - distFromCenter / 10)
        const peakShape = Math.pow(mountainBase, 1.6)

        // Simplex noise for rocky terrain
        const n1 = noise2D(px * 0.3, pz * 0.3) * 0.5
        const n2 = noise2D(px * 0.7, pz * 0.7) * 0.25
        const n3 = noise2D(px * 1.5, pz * 1.5) * 0.1
        const n4 = noise2D(px * 3.0, pz * 3.0) * 0.05
        const noiseVal = n1 + n2 + n3 + n4

        const y = peakShape * maxHeight + noiseVal * peakShape * 3

        vertices.push(px, Math.max(-1, y), pz)

        // Color based on height
        const heightRatio = y / maxHeight
        if (heightRatio > 0.85) {
          // Snow - bright white/blue
          colors.push(0.92, 0.95, 1.0)
        } else if (heightRatio > 0.7) {
          // Rocky with snow patches
          colors.push(0.5 + heightRatio * 0.2, 0.52 + heightRatio * 0.2, 0.6 + heightRatio * 0.1)
        } else if (heightRatio > 0.4) {
          // Rocky terrain - grey/brown
          colors.push(0.28 + heightRatio * 0.1, 0.26 + heightRatio * 0.1, 0.3 + heightRatio * 0.05)
        } else {
          // Lower terrain - dark rock
          colors.push(0.15 + heightRatio * 0.2, 0.14 + heightRatio * 0.2, 0.18 + heightRatio * 0.15)
        }
      }
    }

    for (let z = 0; z < resolution; z++) {
      for (let x = 0; x < resolution; x++) {
        const a = z * (resolution + 1) + x
        const b = a + 1
        const c = (z + 1) * (resolution + 1) + x
        const d = c + 1
        indices.push(a, c, b)
        indices.push(b, c, d)
      }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geo.setIndex(indices)
    geo.computeVertexNormals()
    return geo
  }, [noise2D])

  // Snow cap geometry (small tip for bloom)
  const snowGeometry = useMemo(() => {
    const geo = new THREE.ConeGeometry(0.6, 1.2, 8)
    return geo
  }, [])

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <meshLambertMaterial vertexColors side={THREE.DoubleSide} />
      </mesh>
      {/* Snow cap glow object */}
      <mesh ref={snowRef} position={[0, 18.2, 0]} geometry={snowGeometry}>
        <meshStandardMaterial
          color="#e8f0ff"
          emissive="#aaccff"
          emissiveIntensity={1.2}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

// Tree sprites at lower mountain
function Trees() {
  const trees = useMemo(() => {
    const arr = []
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2
      const r = 7 + Math.random() * 3
      arr.push({
        x: Math.cos(angle) * r + (Math.random() - 0.5) * 2,
        z: Math.sin(angle) * r + (Math.random() - 0.5) * 2,
        scale: 0.3 + Math.random() * 0.4,
      })
    }
    return arr
  }, [])

  return (
    <group>
      {trees.map((t, i) => (
        <mesh key={i} position={[t.x, 0.5, t.z]} scale={[t.scale, t.scale * 2, t.scale]}>
          <coneGeometry args={[0.5, 1.8, 5]} />
          <meshLambertMaterial color="#1a2a1a" />
        </mesh>
      ))}
    </group>
  )
}

// Campfire particles at base
function CampfireGlow() {
  const pointsRef = useRef()
  const count = 80

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = Math.random() * 0.5
      pos[i * 3] = Math.cos(angle) * r - 3
      pos[i * 3 + 1] = Math.random() * 2
      pos[i * 3 + 2] = Math.sin(angle) * r + 2
    }
    return pos
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime
      const pos = pointsRef.current.geometry.attributes.position.array
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] = (pos[i * 3 + 1] + 0.012) % 2
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
      pointsRef.current.material.opacity = 0.4 + Math.sin(time * 3) * 0.15
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ff8833"
        size={0.12}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

// Tents at base camp
function Tents() {
  return (
    <group>
      {[[-5, 0, 3], [5.5, 0, 2.5], [-6.5, 0, 4]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <coneGeometry args={[0.7, 1.1, 4]} />
          <meshLambertMaterial color="#1a1f2e" wireframe={false} />
        </mesh>
      ))}
    </group>
  )
}

// Scene with camera control
function Scene({ scrollProgress }) {
  const { camera, scene } = useThree()
  const starsRef = useRef()

  useEffect(() => {
    scene.fog = new THREE.FogExp2('#0a1030', 0.012)
  }, [scene])

  useFrame(() => {
    const p = scrollProgress.current

    // Camera path: start tight at peak, pull back and down as we scroll
    const startY = 22
    const endY = 4
    const startZ = 2
    const endZ = 28
    const startFov = 30
    const endFov = 65

    camera.position.y = startY + (endY - startY) * p
    camera.position.z = startZ + (endZ - startZ) * p
    camera.position.x = Math.sin(p * 0.3) * 1.5

    camera.fov = startFov + (endFov - startFov) * p
    camera.updateProjectionMatrix()

    // Look target shifts down
    const lookY = 18 - p * 16
    camera.lookAt(0, lookY, 0)

    // Fog density increases at bottom
    if (scene.fog) {
      scene.fog.density = 0.008 + p * 0.018
    }

    // Stars fade out as we descend
    if (starsRef.current) {
      starsRef.current.material.opacity = Math.max(0, 1 - p * 2.5)
    }
  })

  // Lighting shifts from cold to warm
  const coldColor = new THREE.Color(0.5, 0.6, 0.9)
  const warmColor = new THREE.Color(1.0, 0.7, 0.3)

  return (
    <>
      {/* Sky gradient ambient */}
      <ambientLight intensity={0.4} color="#334466" />

      {/* Key light - shifts warm */}
      <directionalLight
        position={[5, 20, 5]}
        intensity={1.2}
        color="#aabbdd"
      />

      {/* Warm fill from below */}
      <pointLight position={[0, -2, 5]} intensity={1.5} color="#ff9944" distance={20} />

      {/* Cold rim at peak */}
      <pointLight position={[-8, 25, -5]} intensity={0.8} color="#4466cc" distance={30} />

      <Stars
        ref={starsRef}
        radius={80}
        depth={40}
        count={3000}
        factor={3}
        saturation={0.2}
        fade
        speed={0.3}
      />

      <MountainMesh scrollProgress={scrollProgress} />
      <Trees />
      <Tents />
      <CampfireGlow />

      <EffectComposer>
        <Bloom
          intensity={1.8}
          luminanceThreshold={0.7}
          luminanceSmoothing={0.4}
          radius={0.6}
        />
      </EffectComposer>
    </>
  )
}

export default function Mountain({ scrollProgress }) {
  return (
    <div className="mountain-canvas">
      <Canvas
        camera={{ position: [0, 22, 2], fov: 30, near: 0.1, far: 500 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#060a18' }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}
