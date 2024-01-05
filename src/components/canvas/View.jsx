'use client'

import useMediaQuery from '@/utils/hooks/useMediaQuery'
import { forwardRef, Suspense, useImperativeHandle, useRef, useEffect, useState } from 'react'
import { OrbitControls, OrthographicCamera, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/threeJS/components/Three'
import LoadingIcon from '@/components/LoadingIcon'

export const Common = ({ color }) => {
  const perspective = 800
  const [fieldOfView, setFieldOfView] = useState(Math.max(window.innerWidth, window.innerHeight))

  useEffect(() => {
    const handleResize = () => {
      setFieldOfView(Math.max(window.innerWidth, window.innerHeight))
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const [zoom, setZoom] = useState(1)
  const isPhone = useMediaQuery('only screen and (max-width : 390px)')
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)')
  useEffect(() => {
    if (isPhone) {
      setZoom(0.5)
    } else if (isSmallDevice) {
      setZoom(0.7)
    } else {
      setZoom(1)
    }
  }, [isSmallDevice, isPhone])

  return (
    <Suspense fallback={<LoadingIcon />}>
      {color && <color attach='background' args={[color]} />}
      <ambientLight position={[-1000, 0, 200]} intensity={3.6} />
      <pointLight position={[-1000, 0, 200]} color='#ffc4a8' intensity={0.3} />
      <pointLight position={[500, 0, 200]} color='#ffe6de' intensity={0.8} />
      <directionalLight position={[500, 0, 200]} color='#ffe6de' intensity={1} />
      <OrthographicCamera
        makeDefault
        position={[0, 0, perspective]}
        zoom={1}
        near={-3000}
        far={3000}
        left={-fieldOfView / 2}
        right={fieldOfView / 2}
        top={fieldOfView / 2}
        bottom={-fieldOfView / 2}
      />

      {/* <PerspectiveCamera makeDefault fov={6} position={[0, 0, 20]} /> */}
      {/* <PerspectiveCamera makeDefault position={[0, 0, 15]} /> */}
      {/* <PerspectiveCamera makeDefault position={[0, 0, 0]} fov={Box3D.V_FOV_DEG} near={100} far={30000} /> */}
    </Suspense>
  )
}

const View = forwardRef(({ children, orbit, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit && <OrbitControls />}
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }
