'use client'

import { RoundedBox, SpriteAnimator, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'



export function Tile({ modelPath, tileRef, relativePos }) {
  const { scene } = useGLTF(modelPath)

  const boxWidth = 500 // Define the box dimensions
  const boxHeight = 500

  const getDistanceFromCamera = (fitment = 'contain') => {
    const aspect = window.innerWidth / window.innerHeight
    return fitment === 'contain'
      ? Math.max(boxHeight / 2, boxWidth / 2 / aspect)
      : Math.max(boxWidth / 2, (boxHeight / 2) * aspect)
  }

  useFrame(() => {
    const aspect = window.innerWidth / window.innerHeight

    const distanceFromCam = getDistanceFromCamera('contain')
    tileRef.current.position.z = -distanceFromCam
    tileRef.current.position.x = distanceFromCam * (boxWidth / (2 * distanceFromCam)) * aspect * 1.4 + relativePos.x
    tileRef.current.position.y = distanceFromCam * (boxHeight / (2 * distanceFromCam)) * aspect * 0.3 + relativePos.y
  })

  // useFrame((state, delta) => (scene.rotation.y += delta))
  return <primitive ref={tileRef} object={scene} scale={20} />
}

export function Tiles() {
  const tileARef = useRef()
  const tileBRef = useRef()
  const tileCRef = useRef()
  return (
    <>
      {/* <mesh ref={tileARef} position={[100, 200, 1]}>
        <boxGeometry args={[boxWidth, boxHeight, boxDepth]} />
        <meshBasicMaterial color={0x00ff00} />
      </mesh> */}
      <Tile tileRef={tileARef} modelPath={'/tileA.glb'} relativePos={{ x: 0, y: 0 }} />
      <Tile tileRef={tileBRef} modelPath={'/tileB.glb'} relativePos={{ x: 2, y: -550 }} />
      <Tile tileRef={tileCRef} modelPath={'/tileC.glb'} relativePos={{ x: -550, y: 5 }} />
    </>
  )
}

export const Blob = ({ route = '/', ...props }) => {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  return (
    <mesh
      onClick={() => router.push(route)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial roughness={0} color={hovered ? 'hotpink' : '#1fb2f5'} />
    </mesh>
  )
}

export const Logo = ({ route = '/blob', ...props }) => {
  const mesh = useRef(null)
  const router = useRouter()

  const [hovered, hover] = useState(false)
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])

  useCursor(hovered)
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.y = Math.sin(t) * (Math.PI / 8)
    mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    mesh.current.rotation.z -= delta / 4
  })

  return (
    <group ref={mesh} {...props}>
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, 1]} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, -1]} />
      <mesh onClick={() => router.push(route)} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshPhysicalMaterial roughness={0} color={hovered ? 'hotpink' : '#1fb2f5'} />
      </mesh>
    </group>
  )
}

export function Duck(props) {
  const { scene } = useGLTF('/duck.glb')

  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}
export function Dog(props) {
  const { scene } = useGLTF('/dog.glb')

  return <primitive object={scene} {...props} />
}

export const Box = (props) => {
  const boxRef = useRef()

  return (
    <mesh ref={boxRef} {...props}>
      <boxGeometry args={[100, 100, 100]} />
      <meshStandardMaterial attach='material' color={'red'} />
    </mesh>
  )
}
