'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture, useGLTF } from '@react-three/drei'
import { EffectComposer } from '@react-three/postprocessing'
import { Suspense, useRef, useMemo, forwardRef, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import * as THREE from 'three'
import { Effect, BlendFunction } from 'postprocessing'

// Effect implementation
class PencilLinesEffectImpl extends Effect {
  constructor({
    blendFunction = BlendFunction.NORMAL,
    uColorNoise = null,
    uCloudNoise = null,
    uResolution = new THREE.Vector2(1024, 1024),
    uNear = 0.1,
    uFar = 1000
  } = {}) {
    super('PencilLinesEffect', `
      uniform sampler2D e0UColorNoise;
      uniform sampler2D e0UCloudNoise;
      uniform vec2 e0UResolution;
      uniform float e0UNear;
      uniform float e0UFar;
      uniform float uTime;

      // Gradient Noise function
      vec2 grad(ivec2 z) {
          int n = z.x+z.y*11111;
          n = (n<<13)^n;
          n = (n*(n*n*15731+789221)+1376312589)>>16;
          n &= 7;
          vec2 gr = vec2(n&1, n>>1)*2.0-1.0;
          return (n>=6) ? vec2(0.0, gr.x) :
                 (n>=4) ? vec2(gr.x, 0.0) :
                 gr;
      }

      float noise(in vec2 p) {
          ivec2 i = ivec2(floor(p));
          vec2 f = fract(p);
          vec2 u = f*f*(3.0-2.0*f);
          return mix(mix(dot(grad(i+ivec2(0, 0)), f-vec2(0.0, 0.0)),
                        dot(grad(i+ivec2(1, 0)), f-vec2(1.0, 0.0)), u.x),
                    mix(dot(grad(i+ivec2(0, 1)), f-vec2(0.0, 1.0)),
                        dot(grad(i+ivec2(1, 1)), f-vec2(1.0, 1.0)), u.x), u.y);
      }

      // Riso grain function
      float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float grain(vec2 st, float time) {
          vec2 pos = st * 10.0;
          float grain = random(pos + time);
          return grain * 0.8;
      }

      float valueAtPoint(sampler2D image, vec2 coord, vec2 texel, vec2 point) {
          vec3 luma = vec3(0.299, 0.587, 0.114);
          return dot(texture2D(image, coord + texel * point).xyz, luma);
      }

      float diffuseValue(int x, int y) {
          float cutoff = 40.0;
          float offset = 0.5 / cutoff;
          float noiseValue = clamp(texture2D(e0UCloudNoise, vUv).r, 0.0, cutoff) / cutoff - offset;
          return valueAtPoint(inputBuffer, vUv + noiseValue, vec2(1.0 / e0UResolution.x, 1.0 / e0UResolution.y), vec2(x, y)) * 0.6;
      }

      float normalValue(int x, int y) {
          float cutoff = 50.0;
          float offset = 0.5 / cutoff;
          float noiseValue = clamp(texture2D(e0UCloudNoise, vUv).r, 0.0, cutoff) / cutoff - offset;
          return valueAtPoint(inputBuffer, vUv + noiseValue, vec2(1.0 / e0UResolution.x, 1.0 / e0UResolution.y), vec2(x, y)) * 0.3;
      }

      float getValue(int x, int y) {
          float noiseValue = noise(gl_FragCoord.xy);
          noiseValue = noiseValue * 2.0 - 1.0;
          noiseValue *= 10.0;
          return diffuseValue(x, y) + normalValue(x, y) * noiseValue;
      }

      float sobelFloat(sampler2D diffuse, vec2 uv, vec2 texel) {
          const mat3 Gx = mat3(-1, -2, -1, 0, 0, 0, 1, 2, 1);
          const mat3 Gy = mat3(-1, 0, 1, -2, 0, 2, -1, 0, 1);

          float tx0y0 = getValue(-1, -1);
          float tx0y1 = getValue(-1, 0);
          float tx0y2 = getValue(-1, 1);
          float tx1y0 = getValue(0, -1);
          float tx1y1 = getValue(0, 0);
          float tx1y2 = getValue(0, 1);
          float tx2y0 = getValue(1, -1);
          float tx2y1 = getValue(1, 0);
          float tx2y2 = getValue(1, 1);

          float valueGx = Gx[0][0] * tx0y0 + Gx[1][0] * tx1y0 + Gx[2][0] * tx2y0 +
                         Gx[0][1] * tx0y1 + Gx[1][1] * tx1y1 + Gx[2][1] * tx2y1 +
                         Gx[0][2] * tx0y2 + Gx[1][2] * tx1y2 + Gx[2][2] * tx2y2;

          float valueGy = Gy[0][0] * tx0y0 + Gy[1][0] * tx1y0 + Gy[2][0] * tx2y0 +
                         Gy[0][1] * tx0y1 + Gy[1][1] * tx1y1 + Gy[2][1] * tx2y1 +
                         Gy[0][2] * tx0y2 + Gy[1][2] * tx1y2 + Gy[2][2] * tx2y2;

          float G = (valueGx * valueGx) + (valueGy * valueGy);
          return clamp(G, 0.0, 1.0);
      }

      void mainImage(const in vec4 inputColor, const in vec2 vUv, out vec4 outputColor) {
          vec2 size = vec2(textureSize(inputBuffer, 0));
          vec4 texel = texture2D(inputBuffer, vUv);
          vec2 fragCoord = gl_FragCoord.xy;
          vec2 noiseValue = vec2(noise(fragCoord));
          noiseValue = noiseValue * 2.0 - 1.0;
          noiseValue *= 10.0;
          vec4 cloudNoiseValue = texture2D(e0UCloudNoise, vUv);
          float sobelValue = sobelFloat(inputBuffer, vUv, 1.0 / e0UResolution);
          sobelValue = smoothstep(0.01, 0.03, sobelValue);
          vec4 uLineColor = vec4(0.153, 0.233, 0,1.0);

          // Calculate grain
          float grainValue = grain(vUv, uTime);
          
          if (sobelValue > 0.1) {
              // For edges, use the line color
              outputColor = uLineColor;
          } else {
              // Calculate radial gradient
              vec2 center = vec2(0.5, 0.5);
              float dist = length(vUv - center);
              float gradient = smoothstep(0.0, 0.7, dist); // Adjust 0.7 to control gradient spread
              
              // Mix mint color with white based on gradient
              vec3 mintColor = vec3(0.816, 0.878, 0.659); // #d0e0a8
              vec3 whiteColor = vec3(1.0);
              vec3 baseColor = mix(mintColor, whiteColor, gradient);
              
              // Mix grain with gradient color
              vec3 grainColor = vec3(grainValue);
              vec3 finalColor = mix(baseColor, grainColor, 0.28);
              outputColor = vec4(finalColor, 1.0);
          }
      }
    `, {
      blendFunction,
      uniforms: new Map([
        ['uColorNoise', new THREE.Uniform(uColorNoise)],
        ['uCloudNoise', new THREE.Uniform(uCloudNoise)],
        ['uResolution', new THREE.Uniform(uResolution)],
        ['uNear', new THREE.Uniform(uNear)],
        ['uFar', new THREE.Uniform(uFar)],
        ['uTime', new THREE.Uniform(0.0)]
      ])
    })
  }
}

// React component
const PencilLinesEffect = forwardRef(function PencilLinesEffect(props, ref) {
  const { size, camera } = useThree()
  const [colorNoise, cloudNoise] = useTexture([
    '/textures/color-noise.png',
    '/textures/cloud-noise.png'
  ])

  const effect = useMemo(() => {
    return new PencilLinesEffectImpl({
      uResolution: new THREE.Vector2(size.width, size.height),
      uColorNoise: colorNoise,
      uCloudNoise: cloudNoise,
      uNear: camera.near,
      uFar: camera.far
    })
  }, [size.width, size.height, colorNoise, cloudNoise, camera.near, camera.far])

  useFrame((state, delta) => {
    if (effect) {
      const resolution = effect.uniforms.get('uResolution').value
      resolution.x = size.width
      resolution.y = size.height
      effect.uniforms.get('uNear').value = camera.near
      effect.uniforms.get('uFar').value = camera.far
      effect.uniforms.get('uTime').value += delta
    }
  })

  return <primitive ref={ref} object={effect} dispose={null} />
})

function ErrorFallback({ error }) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-red-500">
        <h2>Something went wrong:</h2>
        <pre>{error.message}</pre>
      </div>
    </div>
  )
}

function Scene() {
  const { scene, camera } = useGLTF('/flower/flower1.gltf')
  const flowerRef = useRef()
  const timeRef = useRef(0)

  // Set up the flower model with proper scaling, rotation, and position
  useEffect(() => {
    if (scene) {
      // Enable shadows on every Mesh in the hierarchy
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
          // Keep original material properties but enable shadows
          if (child.material) {
            child.material.transparent = true
            child.material.opacity = 1.0
            child.material.needsUpdate = true
          }
        }
      })
    }
  }, [scene])

  // Animation loop for floating motion and camera position printing
  useFrame((state, delta) => {
    if (flowerRef.current) {
      timeRef.current += delta * 0.5 // Adjust speed by changing the multiplier
      
      // Create a gentle floating motion
      const floatHeight = Math.sin(timeRef.current) * 0.01 // Adjust amplitude by changing the multiplier
      const rotationAmount = Math.sin(timeRef.current * 0.5) * 0.01 // Gentle rotation
      
      flowerRef.current.position.x = floatHeight
      flowerRef.current.position.y = floatHeight
      flowerRef.current.rotation.z = rotationAmount
    }

 
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} castShadow />
      
      {/* Flower model with proper setup */}
      <group 
        ref={flowerRef}
        position={[0, 0, 0]} 
        scale={5} 
        rotation={[Math.PI / 2, 0, 0]} // 90 degrees in radians
        castShadow
      >
        <primitive object={scene} />
      </group>
    </>
  )
}

// Mouse wheel zoom component
function MouseWheelZoom() {
  const { camera } = useThree()
  const scrollRef = useRef(0)
  const targetScrollRef = useRef(0)

  // Camera positions for interpolation - using exact coordinates found
  const cameraPositions = {
    angle1: {
      position: { x: -31.3584, y: 39.2804, z: 49.2917 },
      rotation: { x: -76.37 * Math.PI / 180, y: -7.61 * Math.PI / 180, z: -28.64 * Math.PI / 180 }
    },
    angle2: {
      position: { x: -28.1056, y: 15.6116, z: 43.5536 },
      rotation: { x: -76.37 * Math.PI / 180, y: -7.61 * Math.PI / 180, z: -28.64 * Math.PI / 180 }
    }
  }

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault()
      // Reverse direction: scroll up = zoom in (increase value)
      targetScrollRef.current -= event.deltaY * 0.001
      targetScrollRef.current = Math.max(0, Math.min(1, targetScrollRef.current))
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  useFrame(() => {
    // Smooth interpolation
    scrollRef.current += (targetScrollRef.current - scrollRef.current) * 0.05

    // Interpolate between camera positions
    const pos1 = cameraPositions.angle1.position
    const pos2 = cameraPositions.angle2.position
    const rot1 = cameraPositions.angle1.rotation
    const rot2 = cameraPositions.angle2.rotation

    camera.position.x = THREE.MathUtils.lerp(pos1.x, pos2.x, scrollRef.current)
    camera.position.y = THREE.MathUtils.lerp(pos1.y, pos2.y, scrollRef.current)
    camera.position.z = THREE.MathUtils.lerp(pos1.z, pos2.z, scrollRef.current)

    camera.rotation.x = THREE.MathUtils.lerp(rot1.x, rot2.x, scrollRef.current)
    camera.rotation.y = THREE.MathUtils.lerp(rot1.y, rot2.y, scrollRef.current)
    camera.rotation.z = THREE.MathUtils.lerp(rot1.z, rot2.z, scrollRef.current)
  })

  return null
}

// Preload the model
useGLTF.preload('/flower/flower1.gltf')

export default function Home() {
  const [effectEnabled, setEffectEnabled] = useState(true);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="relative h-screen w-full">
        {/* <button 
          onClick={() => setEffectEnabled(!effectEnabled)}
          className="absolute right-4 top-4 z-10 rounded-lg bg-white/80 px-4 py-2 shadow-lg transition-colors hover:bg-white"
        >
          {effectEnabled ? 'Disable Effect' : 'Enable Effect'}
        </button> */}
        
        {/* Brand Name Overlay */}
        <div className="brand-name-container font-major">
          <h1 className="brand-name right">THE</h1>
          <h1 className="brand-name">LIVABLE</h1>
          <h1 className="brand-name left">STUDIO</h1>
        </div>

        <Canvas shadows camera={{ 
          position: [-31.3584, 39.2804, 49.2917], 
          rotation: [-76.37 * Math.PI / 180, -7.61 * Math.PI / 180, -28.64 * Math.PI / 180],
          fov: 75 
        }}>
          <Suspense fallback={null}>
            <Scene />
            <MouseWheelZoom />
            {effectEnabled && (
              <EffectComposer>
                <PencilLinesEffect />
              </EffectComposer>
            )}
          </Suspense>
        </Canvas>
      </div>
    </ErrorBoundary>
  )
} 












// 'use client'

// import LoadingIcon from '@/components/LoadingIcon'
// import HomepageCanvas from '@/app/HomepageCanvas'
// import HomeTitle from './_components/HomeTitle'
// import HomeSidelines from './_components/HomeSidelines'
// import { Suspense, useState, useRef } from 'react'

// export default function Page() {
//   // reveal text behind
//   const [isReveal, setRevealDetail] = useState(false)
//   const introScopeRef = useRef(null)

//   return (
//     <>
//       <div ref={introScopeRef} className='relative h-full w-full'>
//         <HomeTitle introScopeRef={introScopeRef} />

//         <HomeSidelines introScopeRef={introScopeRef} />

//         <section className='absolute bottom-4 right-4 z-20 text-end text-sm text-green-900'>
//           <p>email: info@thelivablestudio.com </p>
//           <p>Copyright © 2024 The Livable Studio. All rights reserved. </p>
//         </section>

//         <Suspense fallback={<LoadingIcon />}>
//           <section className='absolute left-1/2 top-1/2 max-w-[300px] -translate-x-1/2 -translate-y-1/2 text-4xl text-green-900'>
//             <p className=' inline pr-4 '>EXPERIENCE THE JOURNEY OF LIVING IN OUR</p>
//             <a
//               onClick={() => routerMiddleware.push('/shop')}
//               className='cursor-pointer bg-green-900 text-white transition-colors duration-300 ease-in-out hover:bg-red-400'
//             >
//               LANDSCAPE
//             </a>
//           </section>
//         </Suspense>

//         <HomepageCanvas isReveal={isReveal} />
//       </div>

//     <button
//       onClick={() => setRevealDetail(!isReveal)}
//       className='absolute bottom-12 left-1/2 z-20 -translate-x-1/2 text-2xl text-green-900 transition-colors duration-300 ease-in-out hover:text-red-400'
//     >
//       [ detail ]
//     </button>    </>
//   )
// }
