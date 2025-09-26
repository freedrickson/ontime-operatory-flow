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
      {/* Base */}
      <RoundedBox
        args={[2.2, 0.08, 1.4]}
        radius={0.08}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#e8e8e8"
          metalness={0.85}
          roughness={0.25}
        />
      </RoundedBox>
      
      {/* Screen back */}
      <RoundedBox
        args={[2.1, 1.3, 0.06]}
        radius={0.06}
        smoothness={4}
        position={[0, 0.7, -0.65]}
        rotation={[-0.1, 0, 0]}
      >
        <meshStandardMaterial
          color="#e8e8e8"
          metalness={0.85}
          roughness={0.25}
        />
      </RoundedBox>
      
      {/* Screen */}
      <RoundedBox
        args={[1.9, 1.1, 0.02]}
        radius={0.04}
        smoothness={4}
        position={[0, 0.7, -0.62]}
        rotation={[-0.1, 0, 0]}
      >
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.1}
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
      {/* Phone body */}
      <RoundedBox
        args={[0.8, 1.6, 0.08]}
        radius={0.12}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#f0f0f0"
          metalness={0.9}
          roughness={0.15}
        />
      </RoundedBox>
      
      {/* Screen */}
      <RoundedBox
        args={[0.72, 1.5, 0.02]}
        radius={0.08}
        smoothness={4}
        position={[0, 0, 0.041]}
      >
        <meshStandardMaterial
          color="#000000"
          metalness={0.05}
          roughness={0.05}
          transparent
          opacity={0.9}
        />
      </RoundedBox>
      
      {/* Camera bump */}
      <RoundedBox
        args={[0.25, 0.25, 0.03]}
        radius={0.04}
        smoothness={4}
        position={[-0.2, 0.6, -0.055]}
      >
        <meshStandardMaterial
          color="#e0e0e0"
          metalness={0.9}
          roughness={0.2}
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
      {/* Watch body */}
      <RoundedBox
        args={[0.7, 0.8, 0.12]}
        radius={0.15}
        smoothness={6}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#f5f5f5"
          metalness={0.9}
          roughness={0.2}
        />
      </RoundedBox>
      
      {/* Screen */}
      <RoundedBox
        args={[0.6, 0.7, 0.02]}
        radius={0.12}
        smoothness={6}
        position={[0, 0, 0.061]}
      >
        <meshStandardMaterial
          color="#000000"
          metalness={0.1}
          roughness={0.05}
        />
      </RoundedBox>
      
      {/* Digital crown */}
      <mesh position={[0.35, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.08]} />
        <meshStandardMaterial
          color="#e8e8e8"
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>
      
      {/* Band segments */}
      <RoundedBox
        args={[0.3, 0.4, 0.04]}
        radius={0.02}
        smoothness={4}
        position={[0, -0.6, 0]}
      >
        <meshStandardMaterial
          color="#4a4a4a"
          metalness={0.1}
          roughness={0.8}
        />
      </RoundedBox>
      
      <RoundedBox
        args={[0.3, 0.4, 0.04]}
        radius={0.02}
        smoothness={4}
        position={[0, 0.6, 0]}
      >
        <meshStandardMaterial
          color="#4a4a4a"
          metalness={0.1}
          roughness={0.8}
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