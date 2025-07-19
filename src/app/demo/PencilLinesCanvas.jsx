'use client';
import React from 'react'
import { useRef, useEffect, useMemo, forwardRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Effect, BlendFunction } from 'postprocessing';
import * as THREE from 'three';


// Error boundary component to catch and log errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error in component:', error);
    console.error('Component stack:', errorInfo.componentStack);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

// Custom Effect class
class PencilLinesEffectImpl extends Effect {
  constructor({
    blendFunction = BlendFunction.NORMAL,
    uTime = 0,
    uResolution = new THREE.Vector2(1024, 1024)
  } = {}) {
    try {
      super('PencilLinesEffect', `
        uniform float uTime;
        uniform vec2 uResolution;

        void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
          vec3 color = vec3(
            sin(uTime + uv.x * 10.0) * 0.5 + 0.5,
            sin(uTime + uv.y * 10.0) * 0.5 + 0.5,
            sin(uTime) * 0.5 + 0.5
          );
          
          outputColor = vec4(color, 1.0);
        }
      `, {
        blendFunction,
        uniforms: new Map([
          ['uTime', new THREE.Uniform(uTime)],
          ['uResolution', new THREE.Uniform(uResolution)]
        ])
      });
    } catch (error) {
      console.error('Error in PencilLinesEffectImpl constructor:', error);
      throw error;
    }
  }
}

// React component wrapper
const PencilLinesEffect = forwardRef(function PencilLinesEffect(props, ref) {
  const { size } = useThree();
  const [error, setError] = useState(null);

  // Create effect with just resolution
  const effect = useMemo(() => {
    try {
      const resolutionVec = new THREE.Vector2(size.width, size.height);
      return new PencilLinesEffectImpl({
        uResolution: resolutionVec
      });
    } catch (err) {
      console.error('Error creating effect:', err);
      setError(err);
      return null;
    }
  }, [size.width, size.height]);

  // Update time and resolution
  useFrame((state, delta) => {
    try {
      if (effect) {
        effect.uniforms.get('uTime').value += delta;
        effect.uniforms.get('uResolution').value.set(size.width, size.height);
      }
    } catch (err) {
      console.error('Error in frame update:', err);
      setError(err);
    }
  });

  if (error) {
    console.error('Error in PencilLinesEffect:', error);
    return null;
  }

  return effect ? <primitive ref={ref} object={effect} dispose={null} /> : null;
});

function Scene() {
  return (
    <ErrorBoundary>
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.2} 
          luminanceSmoothing={0.9} 
          height={300} 
        />
      </EffectComposer>

      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial 
          color="hotpink"
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
    </ErrorBoundary>
  );
}

export default function PencilLinesCanvas() {
  return (
    <Canvas
      camera={{ position: [3, 3, 3], fov: 75 }}
      gl={{
        antialias: true,
        alpha: true
      }}
    >
      <Scene />
      <OrbitControls enableDamping dampingFactor={0.05} />
    </Canvas>
  );
}
