import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { GroupProps } from "@react-three/fiber";
import * as THREE from "three";

export default function FrontDesk(props: GroupProps & { idle?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useFrame((state) => {
    if (!groupRef.current || prefersReducedMotion) return;
    
    // Subtle breathing animation
    const time = state.clock.getElapsedTime();
    groupRef.current.scale.y = 1 + Math.sin(time * 1.5) * 0.008;
    groupRef.current.rotation.y = Math.sin(time * 0.8) * 0.02;
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Head */}
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#f4c2a1" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Hair */}
      <mesh position={[0, 1.8, -0.05]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} metalness={0.0} />
      </mesh>
      
      {/* Body/Torso */}
      <mesh position={[0, 1.3, 0]}>
        <capsuleGeometry args={[0.15, 0.4, 8, 16]} />
        <meshStandardMaterial color="#4A90E2" roughness={0.7} metalness={0.0} />
      </mesh>
      
      {/* Blouse collar */}
      <mesh position={[0, 1.5, 0.05]}>
        <boxGeometry args={[0.25, 0.08, 0.02]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.0} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.22, 1.25, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.06, 0.35, 6, 12]} />
        <meshStandardMaterial color="#4A90E2" roughness={0.7} metalness={0.0} />
      </mesh>
      <mesh position={[0.22, 1.25, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.06, 0.35, 6, 12]} />
        <meshStandardMaterial color="#4A90E2" roughness={0.7} metalness={0.0} />
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
      
      {/* Waist/Belt area */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.05, 16]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.4} metalness={0.1} />
      </mesh>
      
      {/* Legs/Pants */}
      <mesh position={[-0.08, 0.7, 0]}>
        <capsuleGeometry args={[0.08, 0.6, 6, 12]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.8} metalness={0.0} />
      </mesh>
      <mesh position={[0.08, 0.7, 0]}>
        <capsuleGeometry args={[0.08, 0.6, 6, 12]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.8} metalness={0.0} />
      </mesh>
      
      {/* Shoes */}
      <mesh position={[-0.08, 0.35, 0.05]}>
        <boxGeometry args={[0.12, 0.06, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0.08, 0.35, 0.05]}>
        <boxGeometry args={[0.12, 0.06, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.2} />
      </mesh>
    </group>
  );
}