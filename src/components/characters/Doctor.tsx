import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { GroupProps } from "@react-three/fiber";
import * as THREE from "three";

export default function Doctor(props: GroupProps & { idle?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useFrame((state) => {
    if (!groupRef.current || prefersReducedMotion) return;
    
    // Subtle breathing animation
    const time = state.clock.getElapsedTime();
    groupRef.current.scale.y = 1 + Math.sin(time * 1.2) * 0.007;
    groupRef.current.rotation.y = Math.sin(time * 0.7) * 0.018;
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Head */}
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#f4c2a1" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Hair (short, professional) */}
      <mesh position={[0, 1.78, -0.02]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#2F4F4F" roughness={0.9} metalness={0.0} />
      </mesh>
      
      {/* Body/Scrub top */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 16]} />
        <meshStandardMaterial color="#006B6B" roughness={0.8} metalness={0.0} />
      </mesh>
      
      {/* Scrub top collar */}
      <mesh position={[0, 1.48, 0.05]}>
        <boxGeometry args={[0.22, 0.06, 0.02]} />
        <meshStandardMaterial color="#008B8B" roughness={0.7} metalness={0.0} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.22, 1.25, 0]} rotation={[0, 0, 0.25]}>
        <cylinderGeometry args={[0.06, 0.06, 0.35, 12]} />
        <meshStandardMaterial color="#006B6B" roughness={0.8} metalness={0.0} />
      </mesh>
      <mesh position={[0.22, 1.25, 0]} rotation={[0, 0, -0.25]}>
        <cylinderGeometry args={[0.06, 0.06, 0.35, 12]} />
        <meshStandardMaterial color="#006B6B" roughness={0.8} metalness={0.0} />
      </mesh>
      
      {/* Hands */}
      <mesh position={[-0.28, 1.0, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#f4c2a1" roughness={0.8} metalness={0.1} />
      </mesh>
      <mesh position={[0.28, 1.0, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#f4c2a1" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Watch on left wrist */}
      <mesh position={[-0.25, 1.05, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.2} metalness={0.3} />
      </mesh>
      
      {/* Waist/Scrub pants top */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.05, 16]} />
        <meshStandardMaterial color="#006B6B" roughness={0.8} metalness={0.0} />
      </mesh>
      
      {/* Legs/Scrub pants */}
      <mesh position={[-0.08, 0.7, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 12]} />
        <meshStandardMaterial color="#006B6B" roughness={0.8} metalness={0.0} />
      </mesh>
      <mesh position={[0.08, 0.7, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 12]} />
        <meshStandardMaterial color="#006B6B" roughness={0.8} metalness={0.0} />
      </mesh>
      
      {/* Medical shoes */}
      <mesh position={[-0.08, 0.35, 0.05]}>
        <boxGeometry args={[0.12, 0.06, 0.18]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.0} />
      </mesh>
      <mesh position={[0.08, 0.35, 0.05]}>
        <boxGeometry args={[0.12, 0.06, 0.18]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.0} />
      </mesh>
      
      {/* Stethoscope around neck */}
      <mesh position={[0, 1.5, 0]} rotation={[0, 0, Math.PI/6]}>
        <torusGeometry args={[0.18, 0.01, 8, 16]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Stethoscope chest piece */}
      <mesh position={[0.12, 1.35, 0.05]}>
        <cylinderGeometry args={[0.02, 0.02, 0.01, 16]} />
        <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.4} />
      </mesh>
    </group>
  );
}