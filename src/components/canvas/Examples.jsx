'use client'

import { useGLTF, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'

export function TileB({ modelPath, tileRef, relativePos, isReveal }) {
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
    tileRef.current.position.y = distanceFromCam * (boxHeight / (2 * distanceFromCam)) * aspect * 0.3 + relativePos.y
    const baseX = distanceFromCam * (boxWidth / (2 * distanceFromCam)) * aspect * 1.4 + relativePos.x
    if (isReveal) {
      tileRef.current.position.x = THREE.MathUtils.lerp(tileRef.current.position.x, baseX - 550, 0.025)
    } else {
      tileRef.current.position.x = THREE.MathUtils.lerp(tileRef.current.position.x, baseX, 0.025)
    }
  })

  return <primitive ref={tileRef} object={scene} scale={20} />
}
export function TileA({ modelPath, tileRef, relativePos, isReveal }) {
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

    const baseY = distanceFromCam * (boxHeight / (2 * distanceFromCam)) * aspect * 0.3 + relativePos.y

    if (isReveal) {
      tileRef.current.position.y = THREE.MathUtils.lerp(tileRef.current.position.y, baseY - 550, 0.025)
    } else {
      tileRef.current.position.y = THREE.MathUtils.lerp(tileRef.current.position.y, baseY, 0.025)
    }
  })

  return <primitive ref={tileRef} object={scene} scale={20} />
}

export function TileC({ modelPath, tileRef, relativePos, isReveal }) {
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
    tileRef.current.position.y = distanceFromCam * (boxHeight / (2 * distanceFromCam)) * aspect * 0.3 + relativePos.y
    const baseX = distanceFromCam * (boxWidth / (2 * distanceFromCam)) * aspect * 1.4 + relativePos.x
    if (isReveal) {
      tileRef.current.position.x = THREE.MathUtils.lerp(tileRef.current.position.x, baseX + -800, 0.025)
    } else {
      tileRef.current.position.x = THREE.MathUtils.lerp(tileRef.current.position.x, baseX, 0.025)
    }
  })

  return <primitive ref={tileRef} object={scene} scale={20} />
}

export function Tiles({ isReveal }) {
  const tileARef = useRef()
  const tileBRef = useRef()
  const tileCRef = useRef()
  const textRef = useRef()
  const [hidden, set] = useState()
  const revealSpace = isReveal ? -100 : 0

  return (
    <>
      <TileA tileRef={tileARef} modelPath={'/tileA.glb'} relativePos={{ x: 0, y: 0 }} isReveal={isReveal} />
      <TileB tileRef={tileBRef} modelPath={'/tileB.glb'} relativePos={{ x: 2, y: -550 }} isReveal={isReveal} />
      <TileC tileRef={tileCRef} modelPath={'/tileC.glb'} relativePos={{ x: -550, y: 5 }} isReveal={isReveal} />
      <Html
        position={[0, 0, 200]}
        as='div' // Wrapping element (default: 'div')
        center // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
        distanceFactor={800} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
        zIndexRange={[0, -10]} // Z-order range (default=[16777271, 0])
        portal={textRef} // Reference to target container (default=undefined)
        transform // If true, applies matrix3d transformations (default=false)
        // occlude={[tileCRef]}
        // onOcclude={set}
        // style={{
        //   transition: 'all 0.5s',
        //   opacity: hidden ? 0 : 1,
        //   transform: `scale(${hidden ? 0.5 : 1})`,
        // }}
        className='flex justify-center text-sm text-green-900 md:text-xl'
      >
        <p className='max-w-[calc(100%-200px)] '>
          SOME KEY CONCEPT RIGHT HERE. BETTER BE SOMETHING
          <a
            href={'/events/first-opening'}
            className=' cursor-pointer bg-green-900 text-lg text-white hover:bg-red-400'
          >
            {' '}
            CATCHY{' '}
          </a>
          .
        </p>
      </Html>
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
