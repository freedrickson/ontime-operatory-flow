import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { GroupProps } from "@react-three/fiber";
import * as THREE from "three";

export default function Hygienist(props: GroupProps & { idle?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useFrame((state) => {
    if (!groupRef.current || prefersReducedMotion) return;
    
    // Subtle breathing animation
    const time = state.clock.getElapsedTime();
    groupRef.current.scale.y = 1 + Math.sin(time * 1.3) * 0.006;
    groupRef.current.rotation.y = Math.sin(time * 0.6) * 0.015;
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Head */}
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#f4c2a1" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Hair (tied back) */}
      <mesh position={[0, 1.75, -0.1]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#654321" roughness={0.9} metalness={0.0} />
      </mesh>
      
      {/* Hair tie/band */}
      <mesh position={[0, 1.75, -0.1]}>
        <torusGeometry args={[0.08, 0.01, 8, 16]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.6} metalness={0.0} />
      </mesh>
      
      {/* Body/Scrub top */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 16]} />
        <meshStandardMaterial color="#20B2AA" roughness={0.8} metalness={0.0} />
      </mesh>
      
      {/* Scrub top V-neck */}
      <mesh position={[0, 1.48, 0.05]}>
        <coneGeometry args={[0.06, 0.12, 3]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} metalness={0.0} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.22, 1.25, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.35, 12]} />
        <meshStandardMaterial color="#20B2AA" roughness={0.8} metalness={0.0} />
      </mesh>
      <mesh position={[0.22, 1.25, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.35, 12]} />
        <meshStandardMaterial color="#20B2AA" roughness={0.8} metalness={0.0} />
      </mesh>
      
      {/* Hands with gloves */}
      <mesh position={[-0.28, 1.0, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#E6E6FA" roughness={0.9} metalness={0.0} />
      </mesh>
      <mesh position={[0.28, 1.0, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#E6E6FA" roughness={0.9} metalness={0.0} />
      </mesh>
      
      {/* Waist/Scrub pants top */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.05, 16]} />
        <meshStandardMaterial color="#20B2AA" roughness={0.8} metalness={0.0} />
      </mesh>
      
      {/* Legs/Scrub pants */}
      <mesh position={[-0.08, 0.7, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 12]} />
        <meshStandardMaterial color="#20B2AA" roughness={0.8} metalness={0.0} />
      </mesh>
      <mesh position={[0.08, 0.7, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 12]} />
        <meshStandardMaterial color="#20B2AA" roughness={0.8} metalness={0.0} />
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
      <mesh position={[0, 1.5, 0]} rotation={[0, 0, Math.PI/4]}>
        <torusGeometry args={[0.18, 0.01, 8, 16]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.3} metalness={0.1} />
      </mesh>
    </group>
  );
}