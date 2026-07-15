"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette, Noise as PostNoise } from "@react-three/postprocessing";
import * as THREE from "three";

// --------------------------------------------------------
// RAY-TRACED SCHWARZSCHILD BLACK HOLE (NULL GEODESICS)
// --------------------------------------------------------

const blackHoleVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const blackHoleFragment = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uCameraPos;
  uniform vec3 uCameraDir;
  uniform vec3 uCameraUp;
  uniform vec3 uCameraRight;

  varying vec2 vUv;

  // High-frequency 3D Noise for plasma
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + .1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(in vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f*f*(3.0-2.0*f);
    return mix(mix(mix( hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)),f.x),
                   mix( hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)),f.x),f.y),
               mix(mix( hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)),f.x),
                   mix( hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)),f.x),f.y),f.z);
  }
  float fbm(vec3 p) {
    float f = 0.0;
    f += 0.5000 * noise(p); p = p * 2.02;
    f += 0.2500 * noise(p); p = p * 2.03;
    f += 0.1250 * noise(p); p = p * 2.01;
    f += 0.0625 * noise(p);
    return f;
  }

  // Pin-prick sharp stars
  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  vec3 getBackground(vec3 dir) {
      float timeOffset = uTime * 0.01;
      
      // Map 3D dir to 2D for stars and rotate slowly
      vec2 uv = vec2(atan(dir.z, dir.x) + timeOffset, asin(dir.y));
      float starVal = hash21(floor(uv * vec2(800.0, 800.0)));
      float star = smoothstep(0.998, 1.0, starVal) * 2.5;
      
      // Milky way band - add slow drift to the fbm noise for flowing dust
      vec3 dustPos = dir * 20.0 + vec3(timeOffset * 10.0, 0.0, timeOffset * 5.0);
      float band = exp(-abs(dir.y) * 15.0) * fbm(dustPos);
      vec3 bandColor = vec3(0.05, 0.1, 0.2) * band;
      
      return vec3(star) + bandColor;
  }

  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    
    // Fallback to 1.0 if uResolution is NaN/0 to prevent stretched streaks
    float aspect = uResolution.x > 0.0 ? (uResolution.x / uResolution.y) : 1.0;
    uv.x *= aspect;

    // Camera setup: push back slightly to scale black hole beautifully
    vec3 ro = uCameraPos + vec3(0.0, 1.0, 10.0); 
    vec3 rd = normalize(uv.x * uCameraRight + uv.y * uCameraUp + 2.0 * uCameraDir); // Increased FOV divisor to zoom out slightly

    float rs = 1.0; 
    
    vec3 col = vec3(0.0);
    vec3 p = ro;
    vec3 v = rd;
    
    float dt = 0.04; 
    float escape = 1.0;
    
    vec3 diskAccum = vec3(0.0);
    float transmittance = 1.0;

    // High-precision raymarching loop
    for(int i = 0; i < 120; i++) {
        float r = length(p);
        
        // 1. Crisp Event Horizon
        if(r < rs) {
            escape = 0.0;
            break; 
        }
        // Escaped the gravitational pull
        if(r > 30.0) {
            break; 
        }

        // 2. Spacetime Curvature (Accurate lensing)
        // General relativity approximation for photon bending
        vec3 gravity = -p / (r * r * r) * 1.5 * rs; 
        
        vec3 next_v = normalize(v + gravity * dt);
        vec3 next_p = p + next_v * dt;
        
        // 3. Exact Equator Crossing (No banding!)
        if (p.y * next_p.y < 0.0) {
            float t = abs(p.y) / (abs(p.y) + abs(next_p.y));
            vec3 crossP = mix(p, next_p, t);
            float diskR = length(crossP.xz);
            
            // Accretion Disk bounds
            if (diskR > rs * 1.2 && diskR < 10.0) {
                vec3 centerDir = normalize(vec3(crossP.x, 0.0, crossP.z));
                vec3 spinVel = cross(vec3(0.0, 1.0, 0.0), centerDir);
                
                // Relativistic Beaming
                float doppler = dot(spinVel, next_v);
                
                float angle = atan(crossP.z, crossP.x);
                vec3 noisePos = vec3(angle * 10.0 + uTime * 2.5, diskR * 5.0, uTime * 0.3);
                float plasma = fbm(noisePos + fbm(noisePos * 2.0));
                
                vec3 hotColor = vec3(1.0, 0.95, 0.9); // White hot inner
                vec3 coldColor = vec3(0.8, 0.2, 0.0); // Deep red/orange outer
                float tempMix = smoothstep(9.0, 2.0, diskR);
                vec3 emitColor = mix(coldColor, hotColor, tempMix);
                
                // Beaming intensity (massive boost for approaching side)
                float intensity = pow(1.0 + doppler * 0.85, 3.0);
                
                // Density of the disk at this radius
                float radialDensity = smoothstep(10.0, 4.0, diskR) * smoothstep(rs * 1.2, rs * 3.0, diskR);
                
                // Calculate final alpha contribution
                float alpha = clamp(radialDensity * plasma * 2.5, 0.0, 1.0);
                
                diskAccum += emitColor * intensity * alpha * transmittance;
                transmittance *= (1.0 - alpha);
            }
        }
        
        // Update ray
        p = next_p;
        v = next_v;
        
        // Adaptive step size based on distance for sharp edges but fast rendering
        dt = max(0.04, r * 0.05);
    }

    if (escape > 0.5) {
        vec3 bg = getBackground(v);
        col += bg * transmittance; 
    }

    col += diskAccum;
    
    // Cinematic ACES-like tonemapping
    col = col * 1.5; // Boost exposure
    col = (col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14);
    col = pow(col, vec3(1.0 / 2.2));

    gl_FragColor = vec4(col, 1.0);
  }
`;

// --------------------------------------------------------
// REACT COMPONENTS
// --------------------------------------------------------

function RayTracedBlackHole() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, gl } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uCameraPos: { value: new THREE.Vector3() },
    uCameraDir: { value: new THREE.Vector3() },
    uCameraUp: { value: new THREE.Vector3() },
    uCameraRight: { value: new THREE.Vector3() },
  }), []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      const mat = materialRef.current;
      mat.uniforms.uTime.value += delta;
      
      // Ensure aspect ratio is absolutely correct without relying on DPR (which was causing streaks)
      mat.uniforms.uResolution.value.set(size.width, size.height);
      
      const cam = state.camera;
      mat.uniforms.uCameraPos.value.copy(cam.position);
      
      const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion).normalize();
      const up = new THREE.Vector3(0, 1, 0).applyQuaternion(cam.quaternion).normalize();
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(cam.quaternion).normalize();
      
      mat.uniforms.uCameraDir.value.copy(dir);
      mat.uniforms.uCameraUp.value.copy(up);
      mat.uniforms.uCameraRight.value.copy(right);
    }
  });

  return (
    <mesh renderOrder={-1} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={blackHoleVertex}
        fragmentShader={blackHoleFragment}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

// Classical Keplerian Orbiters (Accurate Distant Orbits)
function OrbitalPlanet({ 
  distance, speed, size, color, startAngle, inclination 
}: { 
  distance: number, speed: number, size: number, color: string, startAngle: number, inclination: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const currentAngle = startAngle + time * speed;
    
    const x = Math.cos(currentAngle) * distance;
    const z = Math.sin(currentAngle) * distance;
    
    const y = x * Math.sin(inclination);
    const tiltedX = x * Math.cos(inclination);
    
    meshRef.current.position.set(tiltedX, y, z);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

// Scene Physics Controller
function PhysicsController() {
  const { camera } = useThree();
  
  useFrame((state) => {
    const scrollY = window.scrollY || 0;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
    
    // Accelerate the camera forward and dive into the event horizon (void) at the bottom of the page
    const targetZ = 15 - (scrollProgress * 15.5); 
    const targetY = 3 - (scrollProgress * 3);
    
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    
    const mouseX = (state.pointer.x * 2.0);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX, 0.05);
    
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

import { usePerformance, CanvasPerformanceMonitor } from "@/performance/context";
import { useEffect, useState } from "react";

export function CosmicBackground() {
  const { presets, tier } = usePerformance();
  const [showCanvas, setShowCanvas] = useState(false);

  // Lazy initialize to avoid hydration mismatch and allow Performance Engine to boot
  useEffect(() => {
    setShowCanvas(true);
  }, []);

  if (!showCanvas) {
    return (
      <div className="fixed inset-0 -z-10 h-full w-full pointer-events-auto bg-black" />
    );
  }

  // Reduce shader complexity on lower tiers
  const showExtraPlanets = presets.shaderComplexity !== 'basic';
  const isPerformanceTier = presets.shaderComplexity === 'basic';

  return (
    <div className="fixed inset-0 -z-10 h-full w-full pointer-events-auto bg-black">
      <Canvas 
         camera={{ position: [0, 3, 15], fov: 45 }} 
         dpr={[1, presets.dpr]} 
         gl={{ antialias: true, powerPreference: "high-performance" }}
         onCreated={({ gl }) => {
            // Memory management: strict disposal
            gl.setAnimationLoop(() => {
               // The monitor handles visibility pauses if needed
            });
         }}
      >
        <CanvasPerformanceMonitor />
        {/* Hide the extremely heavy raymarching shader on low-end devices */}
        {!isPerformanceTier && <RayTracedBlackHole />}
        <PhysicsController />

        <group>
          <OrbitalPlanet distance={12} speed={0.4} size={0.06} color="#ffffff" startAngle={0} inclination={0.2} />
          {showExtraPlanets && (
             <>
               <OrbitalPlanet distance={18} speed={0.2} size={0.10} color="#ffaa66" startAngle={Math.PI} inclination={-0.4} />
               <OrbitalPlanet distance={14} speed={0.35} size={0.04} color="#88ccff" startAngle={Math.PI / 2} inclination={0.8} />
             </>
          )}
        </group>
      </Canvas>
      <div className="absolute inset-0 bg-black/40 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />
    </div>
  );
}
