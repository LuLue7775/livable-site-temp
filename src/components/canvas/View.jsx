'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef, useEffect, useState } from 'react'
import { OrbitControls, OrthographicCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'

/** Lighting */
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

  return (
    <Suspense fallback={null}>
      {color && <color attach='background' args={[color]} />}
      <ambientLight intensity={0.5} />
      <pointLight position={[-1000, 0, 5000]} color='#ffc4a8' intensity={.8}  />
      <pointLight position={[500, 0, 100]} color='#ffe6de' intensity={.8}/>
      {/* <PerspectiveCamera makeDefault fov={6} position={[0, 0, 20]} /> */}
      {/* <PerspectiveCamera makeDefault position={[0, 0, 15]} /> */}
      <OrthographicCamera
        makeDefault
        position={[0, 0, perspective]}
        zoom={1}
        near={-5000}
        far={5000}
        left={-fieldOfView / 2}
        right={fieldOfView / 2}
        top={fieldOfView / 2}
        bottom={-fieldOfView / 2}
      />

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
