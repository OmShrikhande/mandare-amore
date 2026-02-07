'use client';

import { Canvas } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function FloatingHearts({ count = 50 }) {
  const meshRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 20;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 20;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <Points ref={meshRef} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#F7C6D0"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function FloatingSparkles({ count = 30 }) {
  const meshRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 15;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 15;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={meshRef} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FFD700"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function FloatingRoses({ count = 20 }) {
  const meshRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 25;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 25;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.05;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.12) * 0.05;
    }
  });

  return (
    <Points ref={meshRef} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#DC143C"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function ParticleSystem() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <FloatingHearts count={40} />
        <FloatingSparkles count={20} />
        <FloatingRoses count={15} />
      </Canvas>
    </div>
  );
}