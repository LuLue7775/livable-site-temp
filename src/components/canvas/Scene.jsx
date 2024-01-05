'use client'

import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF,  CameraControls  } from '@react-three/drei'

const ModelLoader = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath)
  return <primitive object={scene} scale={20} />
}

export function Model() {
  const tileRef = useRef()

  useFrame((state, delta) => {
    tileRef.current.rotation.y += delta / 2
  })

  return (
    <mesh ref={tileRef} position={[0, 0, -200]} scale={0.1}>
      <ModelLoader modelPath={'/tileA.glb'} />
    </mesh>
  )
}

export default function Scene() {

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 5]} />
      <CameraControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />

      <Model />
    </>
  )
}
