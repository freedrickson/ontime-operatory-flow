import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import "../styles/team-avatars.css";

const FrontDesk = dynamic(() => import("./characters/FrontDesk"), { 
  ssr: false,
  loading: () => <div className="skeleton-placeholder" />
});
const Hygienist = dynamic(() => import("./characters/Hygienist"), { 
  ssr: false,
  loading: () => <div className="skeleton-placeholder" />
});
const Doctor = dynamic(() => import("./characters/Doctor"), { 
  ssr: false,
  loading: () => <div className="skeleton-placeholder" />
});

export default function TeamAvatars() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: sectionRef, 
    offset: ["start 85%", "end 25%"] 
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  const Card = ({ title, subtitle, ariaLabel, children }: any) => (
    <motion.div className="team-card" style={{ opacity, scale }}>
      <div className="canvas-wrap" aria-hidden="true" aria-label={ariaLabel}>
        <Canvas 
          dpr={[1, 2]} 
          camera={{ position: [0, 1.6, 3], fov: 30 }} 
          frameloop="demand"
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[2, 3, 2]} intensity={0.8} />
          <directionalLight position={[-1, 1, -1]} intensity={0.3} />
          <spotLight position={[0, 4, 2]} intensity={0.5} angle={0.3} penumbra={1} />
          <Environment preset="studio" />
          {children}
          <ContactShadows 
            position={[0, -1, 0]} 
            opacity={0.25} 
            blur={2.5} 
            scale={2}
          />
        </Canvas>
      </div>
      <h4 className="team-title">{title}</h4>
      <p className="team-subtitle">{subtitle}</p>
    </motion.div>
  );

  return (
    <section ref={sectionRef} className="team-avatars">
      <div className="grid">
        <Card 
          title="Front Desk" 
          subtitle="Patient check-in & scheduling"
          ariaLabel="Front desk team member, business-casual, neutral studio"
        >
          <FrontDesk />
        </Card>
        <Card 
          title="Clinical Team" 
          subtitle="Treatment coordination"
          ariaLabel="Dental hygienist in scrubs, neutral studio"
        >
          <Hygienist />
        </Card>
        <Card 
          title="Doctors" 
          subtitle="Real-time practice insights"
          ariaLabel="Doctor in scrubs, neutral studio"
        >
          <Doctor />
        </Card>
      </div>
    </section>
  );
}

// src/components/characters/FrontDesk.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { GroupProps } from '@react-three/fiber';
import * as THREE from 'three';

export default function FrontDesk(props: GroupProps & { idle?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  
  const reducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return;
    
    // Subtle breathing animation
    const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.005 + 1;
    groupRef.current.scale.y = breathe;
    
    // Subtle sway
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Head */}
      <group ref={headRef} position={[0, 1.65, 0]}>
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial 
            color="#f4c2a1" 
            roughness={0.8} 
            metalness={0.1}
          />
        </mesh>
        
        {/* Hair */}
        <mesh position={[0, 0.08, -0.05]}>
          <sphereGeometry args={[0.13, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
          <meshStandardMaterial color="#8B4513" roughness={0.9} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.08]} />
        <meshStandardMaterial color="#f4c2a1" roughness={0.8} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.3, 0.4, 0.15]} />
        <meshStandardMaterial color="#4A90E2" roughness={0.7} />
      </mesh>

      {/* Business blouse details */}
      <mesh position={[0, 1.35, 0.08]}>
        <boxGeometry args={[0.25, 0.15, 0.02]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.2, 1.15, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3]} />
        <meshStandardMaterial color="#f4c2a1" roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 1.15, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3]} />
        <meshStandardMaterial color="#f4c2a1" roughness={0.8} />
      </mesh>

      {/* Sleeves */}
      <mesh position={[-0.2, 1.25, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.12]} />
        <meshStandardMaterial color="#4A90E2" roughness={0.7} />
      </mesh>
      <mesh position={[0.2, 1.25, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.12]} />
        <meshStandardMaterial color="#4A90E2" roughness={0.7} />
      </mesh>

      {/* Waist/Belt area */}
      <mesh position={[0, 0.98, 0]}>
        <cylinderGeometry args={[0.16, 0.15, 0.04]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.4} />
      </mesh>

      {/* Slacks */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[0.28, 0.6, 0.14]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.8} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.08, 0.35, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.6]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.8} />
      </mesh>
      <mesh position={[0.08, 0.35, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.6]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.8} />
      </mesh>

      {/* Low heels */}
      <mesh position={[-0.08, 0.02, 0.02]}>
        <boxGeometry args={[0.08, 0.04, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>
      <mesh position={[0.08, 0.02, 0.02]}>
        <boxGeometry args={[0.08, 0.04, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>
    </group>
  );
}

// src/components/characters/Hygienist.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { GroupProps } from '@react-three/fiber';
import * as THREE from 'three';

export default function Hygienist(props: GroupProps & { idle?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const reducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return;
    
    const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.005 + 1;
    groupRef.current.scale.y = breathe;
    
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Head */}
      <group position={[0, 1.65, 0]}>
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial 
            color="#e8b896" 
            roughness={0.8} 
            metalness={0.1}
          />
        </mesh>
        
        {/* Hair tied back */}
        <mesh position={[0, 0.08, -0.08]}>
          <sphereGeometry args={[0.08, 12, 8]} />
          <meshStandardMaterial color="#654321" roughness={0.9} />
        </mesh>
        
        {/* Hair tie/band */}
        <mesh position={[0, 0.08, -0.12]}>
          <cylinderGeometry args={[0.02, 0.02, 0.08]} />
          <meshStandardMaterial color="#2C3E50" roughness={0.6} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.08]} />
        <meshStandardMaterial color="#e8b896" roughness={0.8} />
      </mesh>

      {/* Scrub top */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.32, 0.4, 0.16]} />
        <meshStandardMaterial color="#20B2AA" roughness={0.8} />
      </mesh>

      {/* Scrub top V-neck detail */}
      <mesh position={[0, 1.35, 0.08]}>
        <boxGeometry args={[0.08, 0.1, 0.02]} />
        <meshStandardMaterial color="#1a9999" roughness={0.8} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.2, 1.15, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3]} />
        <meshStandardMaterial color="#e8b896" roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 1.15, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3]} />
        <meshStandardMaterial color="#e8b896" roughness={0.8} />
      </mesh>

      {/* Short sleeves */}
      <mesh position={[-0.2, 1.28, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.08]} />
        <meshStandardMaterial color="#20B2AA" roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 1.28, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.08]} />
        <meshStandardMaterial color="#20B2AA" roughness={0.8} />
      </mesh>

      {/* Scrub pants */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.15]} />
        <meshStandardMaterial color="#1a9999" roughness={0.8} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.08, 0.35, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.6]} />
        <meshStandardMaterial color="#1a9999" roughness={0.8} />
      </mesh>
      <mesh position={[0.08, 0.35, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.6]} />
        <meshStandardMaterial color="#1a9999" roughness={0.8} />
      </mesh>

      {/* Comfortable shoes */}
      <mesh position={[-0.08, 0.02, 0.02]}>
        <boxGeometry args={[0.08, 0.04, 0.12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>
      <mesh position={[0.08, 0.02, 0.02]}>
        <boxGeometry args={[0.08, 0.04, 0.12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>
    </group>
  );
}

// src/components/characters/Doctor.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { GroupProps } from '@react-three/fiber';
import * as THREE from 'three';

export default function Doctor(props: GroupProps & { idle?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const reducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return;
    
    const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.005 + 1;
    groupRef.current.scale.y = breathe;
    
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Head */}
      <group position={[0, 1.65, 0]}>
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial 
            color="#d4a574" 
            roughness={0.8} 
            metalness={0.1}
          />
        </mesh>
        
        {/* Short professional hair */}
        <mesh position={[0, 0.08, -0.02]}>
          <sphereGeometry args={[0.125, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.8]} />
          <meshStandardMaterial color="#4A4A4A" roughness={0.9} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.08]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>

      {/* Scrub top */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.32, 0.4, 0.16]} />
        <meshStandardMaterial color="#2E8B57" roughness={0.8} />
      </mesh>

      {/* Scrub top pocket */}
      <mesh position={[-0.1, 1.3, 0.08]}>
        <boxGeometry args={[0.08, 0.06, 0.01]} />
        <meshStandardMaterial color="#228B22" roughness={0.8} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.2, 1.15, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 1.15, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>

      {/* Short sleeves */}
      <mesh position={[-0.2, 1.28, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.08]} />
        <meshStandardMaterial color="#2E8B57" roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 1.28, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.08]} />
        <meshStandardMaterial color="#2E8B57" roughness={0.8} />
      </mesh>

      {/* Scrub pants */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.15]} />
        <meshStandardMaterial color="#228B22" roughness={0.8} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.08, 0.35, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.6]} />
        <meshStandardMaterial color="#228B22" roughness={0.8} />
      </mesh>
      <mesh position={[0.08, 0.35, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.6]} />
        <meshStandardMaterial color="#228B22" roughness={0.8} />
      </mesh>

      {/* Professional shoes */}
      <mesh position={[-0.08, 0.02, 0.02]}>
        <boxGeometry args={[0.08, 0.04, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>
      <mesh position={[0.08, 0.02, 0.02]}>
        <boxGeometry args={[0.08, 0.04, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>

      {/* Stethoscope around neck */}
      <mesh position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.008, 8, 16]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  );
}

/* src/styles/team-avatars.css */
.team-avatars { 
  padding: 56px 0; 
  max-width: 1200px;
  margin: 0 auto;
}

.grid { 
  display: grid; 
  gap: 28px; 
  grid-template-columns: repeat(3, 1fr);
  padding: 0 20px;
}

@media (max-width: 900px) { 
  .grid { 
    grid-template-columns: 1fr; 
    gap: 24px;
  } 
}

.team-card { 
  background: #fff; 
  border-radius: 22px; 
  padding: 22px; 
  box-shadow: 0 8px 24px rgba(0,0,0,.06); 
  transition: transform .2s ease;
  position: relative;
}

.team-card:hover { 
  transform: translateY(-8px); 
  box-shadow: 0 12px 32px rgba(0,0,0,.12);
}

.canvas-wrap { 
  aspect-ratio: 3 / 4; 
  border-radius: 16px; 
  overflow: hidden; 
  background: linear-gradient(135deg, #f8f8f8 0%, #f0f0f0 100%);
  position: relative;
}

.skeleton-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 16px;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.team-title { 
  margin-top: 14px; 
  margin-bottom: 4px;
  font-weight: 700; 
  font-size: 1.1rem;
  color: #2C3E50;
}

.team-subtitle { 
  color: #616161; 
  margin-top: 2px;
  font-size: 0.9rem;
  line-height: 1.4;
}

@media (prefers-reduced-motion: reduce) {
  .team-card { 
    transition: none; 
  }
  .skeleton-placeholder {
    animation: none;
  }
}