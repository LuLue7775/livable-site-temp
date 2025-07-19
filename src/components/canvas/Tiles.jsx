'use client'

import useMediaQuery from '@/utils/hooks/useMediaQuery'
import { useRef, useState, useEffect } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ModelLoader = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath)
  return <primitive object={scene} scale={20} />
}

export function TileA({ modelPath, tileRef, relativePos, isReveal, tileSize }) {
  const getDistanceFromCamera = (fitment = 'contain') => {
    const aspect = window.innerWidth / window.innerHeight
    return fitment === 'contain'
      ? Math.max(tileSize.height / 2, tileSize.width / 2 / aspect)
      : Math.max(tileSize.width / 2, (tileSize.height / 2) * aspect)
  }

  useFrame(() => {
    const aspect = window.innerWidth / window.innerHeight

    const distanceFromCam = getDistanceFromCamera('contain')
    tileRef.current.position.x =
      distanceFromCam * (tileSize.width / (2 * distanceFromCam)) * aspect * 1.4 + relativePos.x

    const baseY = distanceFromCam * (tileSize.height / (2 * distanceFromCam)) * aspect * 0.3 + relativePos.y

    if (isReveal) {
      tileRef.current.position.y = THREE.MathUtils.lerp(tileRef.current.position.y, baseY - 550, 0.025)
    } else {
      tileRef.current.position.y = THREE.MathUtils.lerp(tileRef.current.position.y, baseY, 0.025)
    }
  })

  return (
    <mesh ref={tileRef}>
      <ModelLoader modelPath={modelPath} />
    </mesh>
  )
}

export function TileB({ modelPath, tileRef, relativePos, isReveal, tileSize }) {
  const getDistanceFromCamera = (fitment = 'contain') => {
    const aspect = window.innerWidth / window.innerHeight
    return fitment === 'contain'
      ? Math.max(tileSize.height / 2, tileSize.width / 2 / aspect)
      : Math.max(tileSize.width / 2, (tileSize.height / 2) * aspect)
  }

  useFrame(() => {
    const aspect = window.innerWidth / window.innerHeight

    const distanceFromCam = getDistanceFromCamera('contain')
    tileRef.current.position.y =
      distanceFromCam * (tileSize.height / (2 * distanceFromCam)) * aspect * 0.3 + relativePos.y
    const baseX = distanceFromCam * (tileSize.width / (2 * distanceFromCam)) * aspect * 1.4 + relativePos.x
    if (isReveal) {
      tileRef.current.position.x = THREE.MathUtils.lerp(tileRef.current.position.x, baseX - 550, 0.025)
    } else {
      tileRef.current.position.x = THREE.MathUtils.lerp(tileRef.current.position.x, baseX, 0.025)
    }
  })

  return (
    <mesh ref={tileRef}>
      <ModelLoader modelPath={modelPath} />
    </mesh>
  )
}

export function TileC({ modelPath, tileRef, relativePos, isReveal, tileSize }) {
  const { scene } = useGLTF(modelPath)

  const getDistanceFromCamera = (fitment = 'contain') => {
    const aspect = window.innerWidth / window.innerHeight
    return fitment === 'contain'
      ? Math.max(tileSize.height / 2, tileSize.width / 2 / aspect)
      : Math.max(tileSize.width / 2, (tileSize.height / 2) * aspect)
  }

  useFrame(() => {
    const aspect = window.innerWidth / window.innerHeight

    const distanceFromCam = getDistanceFromCamera('contain')
    tileRef.current.position.y =
      distanceFromCam * (tileSize.height / (2 * distanceFromCam)) * aspect * 0.3 + relativePos.y
    const baseX = distanceFromCam * (tileSize.width / (2 * distanceFromCam)) * aspect * 1.4 + relativePos.x
    if (isReveal) {
      tileRef.current.position.x = THREE.MathUtils.lerp(tileRef.current.position.x, baseX + -800, 0.025)
    } else {
      tileRef.current.position.x = THREE.MathUtils.lerp(tileRef.current.position.x, baseX, 0.025)
    }
  })

  return (
    <mesh ref={tileRef}>
      <ModelLoader modelPath={modelPath} />
    </mesh>
  )
}

export function Tiles({ isReveal }) {
  const tileARef = useRef()
  const tileBRef = useRef()
  const tileCRef = useRef()

  const tileSize = { width: 800, height: 800 }
  const [tileYCenter, setTileYCenter] = useState(0)

  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)')
  useEffect(() => {
    if (isSmallDevice) {
      setTileYCenter(200)
    } else {
      setTileYCenter(0)
    }
  }, [isSmallDevice])

  return (
    <>
      <TileA
        tileRef={tileARef}
        modelPath={'/tileA.glb'}
        relativePos={{ x: -800, y: tileYCenter-200 }}
        isReveal={isReveal}
        tileSize={tileSize}
      />
      {/* <TileB
        tileRef={tileBRef}
        modelPath={'/tileB.glb'}
        relativePos={{ x: 2, y: tileYCenter - 550 }}
        isReveal={isReveal}
        tileSize={tileSize}
      />
      <TileC
        tileRef={tileCRef}
        modelPath={'/tileC.glb'}
        relativePos={{ x: -550, y: tileYCenter + 5 }}
        isReveal={isReveal}
        tileSize={tileSize}
      /> */}

      {/* <Html
        position={[0, 0, 200]}
        as='div'
        center 
        distanceFactor={800}
        zIndexRange={[0, -10]} 
        portal={textRef}
        transform
        className='flex justify-center text-xl text-green-900 '
      >
        <p className='max-w-[calc(100%-200px)] '>
          EXPERIENCE THE JOURNEY OF LIVING IN OUR
          <a
            onClick={() => routerMiddleware.push('/shop')}
            className=' cursor-pointer bg-green-900 text-lg text-white hover:bg-red-400'
          >
            
            LANDSCAPE
          </a>
          .
        </p>
      </Html> */}
    </>
  )
}
