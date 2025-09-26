"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function LaptopModel({ rotationY = 0 }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Base - MacBook Pro proportions */}
      <RoundedBox
        args={[2.4, 0.12, 1.6]}
        radius={0.08}
        smoothness={8}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#d4d4d8"
          metalness={0.9}
          roughness={0.15}
        />
      </RoundedBox>
      
      {/* Keyboard area */}
      <RoundedBox
        args={[2.0, 0.02, 1.2]}
        radius={0.02}
        smoothness={4}
        position={[0, 0.07, 0.1]}
      >
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.0}
          roughness={0.8}
        />
      </RoundedBox>
      
      {/* Trackpad */}
      <RoundedBox
        args={[0.6, 0.01, 0.4]}
        radius={0.02}
        smoothness={6}
        position={[0, 0.065, 0.4]}
      >
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.1}
          roughness={0.3}
        />
      </RoundedBox>
      
      {/* Screen back - thinner like MacBook */}
      <RoundedBox
        args={[2.3, 1.44, 0.08]}
        radius={0.08}
        smoothness={8}
        position={[0, 0.78, -0.75]}
        rotation={[-0.08, 0, 0]}
      >
        <meshStandardMaterial
          color="#d4d4d8"
          metalness={0.9}
          roughness={0.15}
        />
      </RoundedBox>
      
      {/* Screen bezel */}
      <RoundedBox
        args={[2.1, 1.32, 0.02]}
        radius={0.06}
        smoothness={8}
        position={[0, 0.78, -0.71]}
        rotation={[-0.08, 0, 0]}
      >
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.0}
          roughness={0.05}
        />
      </RoundedBox>
      
      {/* Screen */}
      <RoundedBox
        args={[1.96, 1.23, 0.01]}
        radius={0.04}
        smoothness={8}
        position={[0, 0.78, -0.705]}
        rotation={[-0.08, 0, 0]}
      >
        <meshStandardMaterial
          color="#000000"
          metalness={0.0}
          roughness={0.02}
          transparent
          opacity={0.95}
        />
      </RoundedBox>
      
      {/* Apple logo area (subtle indentation) */}
      <RoundedBox
        args={[0.15, 0.2, 0.005]}
        radius={0.02}
        smoothness={6}
        position={[0, 1.2, -0.79]}
        rotation={[-0.08, 0, 0]}
      >
        <meshStandardMaterial
          color="#bfbfbf"
          metalness={0.95}
          roughness={0.1}
        />
      </RoundedBox>
    </group>
  );
}

function PhoneModel({ rotationY = 0 }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* iPhone body - more accurate proportions */}
      <RoundedBox
        args={[0.75, 1.55, 0.075]}
        radius={0.12}
        smoothness={8}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#1f2937"
          metalness={0.95}
          roughness={0.1}
        />
      </RoundedBox>
      
      {/* Screen with Dynamic Island */}
      <RoundedBox
        args={[0.68, 1.47, 0.005]}
        radius={0.08}
        smoothness={8}
        position={[0, 0, 0.038]}
      >
        <meshStandardMaterial
          color="#000000"
          metalness={0.0}
          roughness={0.02}
          transparent
          opacity={0.95}
        />
      </RoundedBox>
      
      {/* Dynamic Island */}
      <RoundedBox
        args={[0.12, 0.035, 0.003]}
        radius={0.018}
        smoothness={8}
        position={[0, 0.65, 0.043]}
      >
        <meshStandardMaterial
          color="#000000"
          metalness={0.0}
          roughness={0.9}
        />
      </RoundedBox>
      
      {/* Camera system (triple camera layout like iPhone Pro) */}
      <RoundedBox
        args={[0.35, 0.35, 0.025]}
        radius={0.08}
        smoothness={6}
        position={[-0.15, 0.5, -0.05]}
      >
        <meshStandardMaterial
          color="#374151"
          metalness={0.85}
          roughness={0.2}
        />
      </RoundedBox>
      
      {/* Main camera lens */}
      <mesh position={[-0.08, 0.58, -0.032]}>
        <cylinderGeometry args={[0.055, 0.055, 0.01]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.0}
          roughness={0.05}
        />
      </mesh>
      
      {/* Ultra-wide camera lens */}
      <mesh position={[-0.22, 0.58, -0.032]}>
        <cylinderGeometry args={[0.045, 0.045, 0.008]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.0}
          roughness={0.05}
        />
      </mesh>
      
      {/* Telephoto camera lens */}
      <mesh position={[-0.08, 0.42, -0.032]}>
        <cylinderGeometry args={[0.045, 0.045, 0.008]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.0}
          roughness={0.05}
        />
      </mesh>
      
      {/* Flash */}
      <mesh position={[-0.22, 0.42, -0.032]}>
        <cylinderGeometry args={[0.025, 0.025, 0.005]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.0}
          roughness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Side button */}
      <RoundedBox
        args={[0.01, 0.08, 0.03]}
        radius={0.005}
        smoothness={4}
        position={[0.38, 0.2, 0]}
      >
        <meshStandardMaterial
          color="#1f2937"
          metalness={0.95}
          roughness={0.1}
        />
      </RoundedBox>
      
      {/* Volume buttons */}
      <RoundedBox
        args={[0.01, 0.04, 0.025]}
        radius={0.005}
        smoothness={4}
        position={[-0.38, 0.3, 0]}
      >
        <meshStandardMaterial
          color="#1f2937"
          metalness={0.95}
          roughness={0.1}
        />
      </RoundedBox>
      
      <RoundedBox
        args={[0.01, 0.04, 0.025]}
        radius={0.005}
        smoothness={4}
        position={[-0.38, 0.15, 0]}
      >
        <meshStandardMaterial
          color="#1f2937"
          metalness={0.95}
          roughness={0.1}
        />
      </RoundedBox>
    </group>
  );
}

function WatchModel({ rotationY = 0 }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Apple Watch body - Series 9 proportions */}
      <RoundedBox
        args={[0.82, 0.9, 0.11]}
        radius={0.18}
        smoothness={12}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#f8fafc"
          metalness={0.95}
          roughness={0.05}
        />
      </RoundedBox>
      
      {/* Screen with Always-On display look */}
      <RoundedBox
        args={[0.72, 0.8, 0.008]}
        radius={0.15}
        smoothness={12}
        position={[0, 0, 0.055]}
      >
        <meshStandardMaterial
          color="#000000"
          metalness={0.0}
          roughness={0.02}
          transparent
          opacity={0.98}
        />
      </RoundedBox>
      
      {/* Digital Crown with more detail */}
      <mesh position={[0.41, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 0.08]} />
        <meshStandardMaterial
          color="#f8fafc"
          metalness={0.98}
          roughness={0.02}
        />
      </mesh>
      
      {/* Crown grooves */}
      <mesh position={[0.41, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.038, 0.038, 0.06]} />
        <meshStandardMaterial
          color="#e2e8f0"
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>
      
      {/* Side button */}
      <RoundedBox
        args={[0.025, 0.06, 0.04]}
        radius={0.01}
        smoothness={6}
        position={[0.41, 0.05, 0]}
      >
        <meshStandardMaterial
          color="#f8fafc"
          metalness={0.98}
          roughness={0.02}
        />
      </RoundedBox>
      
      {/* Sport Band - more realistic curved segments */}
      <group>
        {/* Upper band */}
        <RoundedBox
          args={[0.28, 0.35, 0.035]}
          radius={0.018}
          smoothness={6}
          position={[0, 0.62, 0]}
        >
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.0}
            roughness={0.7}
          />
        </RoundedBox>
        
        {/* Lower band */}
        <RoundedBox
          args={[0.28, 0.35, 0.035]}
          radius={0.018}
          smoothness={6}
          position={[0, -0.62, 0]}
        >
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.0}
            roughness={0.7}
          />
        </RoundedBox>
        
        {/* Band connection points */}
        <RoundedBox
          args={[0.15, 0.08, 0.02]}
          radius={0.01}
          smoothness={4}
          position={[0, 0.46, 0]}
        >
          <meshStandardMaterial
            color="#334155"
            metalness={0.1}
            roughness={0.6}
          />
        </RoundedBox>
        
        <RoundedBox
          args={[0.15, 0.08, 0.02]}
          radius={0.01}
          smoothness={4}
          position={[0, -0.46, 0]}
        >
          <meshStandardMaterial
            color="#334155"
            metalness={0.1}
            roughness={0.6}
          />
        </RoundedBox>
      </group>
      
      {/* Sensor area on back (visible detail) */}
      <RoundedBox
        args={[0.4, 0.4, 0.01]}
        radius={0.08}
        smoothness={6}
        position={[0, 0, -0.055]}
      >
        <meshStandardMaterial
          color="#1f2937"
          metalness={0.2}
          roughness={0.3}
        />
      </RoundedBox>
    </group>
  );
}

export default function DeviceCard3D({ 
  variant, 
  title, 
  subtitle, 
  rotationY = 0 
}: {
  variant: "laptop" | "phone" | "watch";
  title: string;
  subtitle: string;
  rotationY?: number;
}) {
  const Model = variant === "laptop" ? LaptopModel : variant === "phone" ? PhoneModel : WatchModel;
  
  const cameraPosition: [number, number, number] = 
    variant === "laptop" ? [0, 0.8, 3.5] :
    variant === "phone" ? [0, 0, 2.5] :
    [0, 0, 2];

  return (
    <div className="device-card-3d">
      <div className="canvas-container">
        <Canvas 
          dpr={[1, 2]} 
          camera={{ position: cameraPosition, fov: 30 }} 
          frameloop="demand"
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 3, 2]} intensity={1.1} castShadow />
          <Environment preset="city" />
          
          <Model rotationY={rotationY} />
          
          <ContactShadows 
            position={[0, -0.8, 0]} 
            opacity={0.3} 
            blur={2.6} 
            far={4} 
          />
        </Canvas>
      </div>
      
      <div className="device-info">
        <h3 className="device-title">{title}</h3>
        <p className="device-subtitle">{subtitle}</p>
      </div>
    </div>
  );
}