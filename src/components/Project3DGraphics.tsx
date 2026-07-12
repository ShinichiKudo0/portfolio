"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Points, PointMaterial, Line, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

// 1. AI Mentorship Network (Node Network / Brain)
function NodeNetworkMesh() {
  const ref = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 100;
  const positions = useMemo(() => {
    const p = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      p[i * 3] = (Math.random() - 0.5) * 4;
      p[i * 3 + 1] = (Math.random() - 0.5) * 4;
      p[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return p;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.1;
      ref.current.rotation.y -= delta * 0.15;
    }
  });

  return (
    <group ref={ref}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#3b82f6" size={0.08} sizeAttenuation={true} depthWrite={false} />
      </Points>
      {/* Simulate connections with a wireframe sphere */}
      <Sphere args={[2, 12, 12]}>
        <meshBasicMaterial color="#1d4ed8" wireframe transparent opacity={0.15} />
      </Sphere>
    </group>
  );
}

export function NodeNetworkScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <NodeNetworkMesh />
    </Canvas>
  );
}

// 2. Intelligent Voyage (Rotating Earth/Sphere with rings)
function VoyageSphereMesh() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (sphereRef.current) sphereRef.current.rotation.y += delta * 0.2;
    if (ringRef1.current) {
      ringRef1.current.rotation.x += delta * 0.3;
      ringRef1.current.rotation.y += delta * 0.1;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.x -= delta * 0.2;
      ringRef2.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group>
      <Sphere ref={sphereRef} args={[1.5, 32, 32]}>
        <MeshDistortMaterial color="#10b981" attach="material" distort={0.2} speed={2} roughness={0.2} metalness={0.8} />
      </Sphere>
      <mesh ref={ringRef1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#059669" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ringRef2} rotation={[-Math.PI / 4, Math.PI / 2, 0]}>
        <torusGeometry args={[2.6, 0.02, 16, 100]} />
        <meshStandardMaterial color="#34d399" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export function VoyageSphereScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#6ee7b7" />
      <VoyageSphereMesh />
    </Canvas>
  );
}

// 3. AI Shield (Floating Crystal/Octahedron)
function ShieldCrystalMesh() {
  const crystalRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.5;
      crystalRef.current.rotation.z += delta * 0.2;
      // Hovering effect
      crystalRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group>
      <Icosahedron ref={crystalRef} args={[1.5, 0]}>
        <meshPhysicalMaterial 
          color="#8b5cf6" 
          metalness={0.9} 
          roughness={0.1} 
          transparent 
          opacity={0.8} 
          wireframe={true}
        />
      </Icosahedron>
      <Icosahedron args={[1.4, 0]}>
         <meshStandardMaterial color="#a78bfa" transparent opacity={0.3} />
      </Icosahedron>
    </group>
  );
}

export function ShieldCrystalScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#c4b5fd" />
      <ShieldCrystalMesh />
    </Canvas>
  );
}
