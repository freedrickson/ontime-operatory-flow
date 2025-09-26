"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function LaptopModel({ rotationY = 0 }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y = rotationY;
  });
  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 0.12, 1.6]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Keyboard area */}
      <mesh position={[0, 0.07, 0.1]}>
        <boxGeometry args={[2.0, 0.02, 1.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.0} roughness={0.8} />
      </mesh>
      {/* Trackpad */}
      <mesh position={[0, 0.065, 0.4]}>
        <boxGeometry args={[0.6, 0.01, 0.4]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.1} roughness={0.3} />
      </mesh>
      {/* Screen back */}
      <mesh position={[0, 0.78, -0.75]} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[2.3, 1.44, 0.08]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Screen bezel */}
      <mesh position={[0, 0.78, -0.71]} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[2.1, 1.32, 0.02]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.0} roughness={0.05} />
      </mesh>
      {/* Screen glass */}
      <mesh position={[0, 0.78, -0.705]} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[1.96, 1.23, 0.01]} />
        <meshStandardMaterial color="#000000" metalness={0.0} roughness={0.02} transparent opacity={0.95} />
      </mesh>
    </group>
  );
}

function PhoneModel({ rotationY = 0 }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y = rotationY;
  });
  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.75, 1.55, 0.075]} />
        <meshStandardMaterial color="#1f2937" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.68, 1.47, 0.005]} />
        <meshStandardMaterial color="#000000" roughness={0.02} transparent opacity={0.95} />
      </mesh>
      {/* Dynamic island */}
      <mesh position={[0, 0.65, 0.043]}>
        <boxGeometry args={[0.12, 0.035, 0.003]} />
        <meshStandardMaterial color="#000000" roughness={0.9} />
      </mesh>
      {/* Camera bump */}
      <mesh position={[-0.15, 0.5, -0.05]}>
        <boxGeometry args={[0.35, 0.35, 0.025]} />
        <meshStandardMaterial color="#374151" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Lenses */}
      <mesh position={[-0.08, 0.58, -0.032]}>
        <cylinderGeometry args={[0.055, 0.055, 0.01, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.05} />
      </mesh>
      <mesh position={[-0.22, 0.58, -0.032]}>
        <cylinderGeometry args={[0.045, 0.045, 0.008, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.05} />
      </mesh>
      <mesh position={[-0.08, 0.42, -0.032]}>
        <cylinderGeometry args={[0.045, 0.045, 0.008, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.05} />
      </mesh>
      {/* Flash */}
      <mesh position={[-0.22, 0.42, -0.032]}>
        <cylinderGeometry args={[0.025, 0.025, 0.005, 24]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function WatchModel({ rotationY = 0 }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y = rotationY;
  });
  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.82, 0.9, 0.11]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.95} roughness={0.05} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.055]}>
        <boxGeometry args={[0.72, 0.8, 0.008]} />
        <meshStandardMaterial color="#000000" roughness={0.02} transparent opacity={0.98} />
      </mesh>
      {/* Crown */}
      <mesh position={[0.41, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 0.08, 24]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.98} roughness={0.02} />
      </mesh>
      {/* Side button */}
      <mesh position={[0.41, 0.05, 0]}>
        <boxGeometry args={[0.025, 0.06, 0.04]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.98} roughness={0.02} />
      </mesh>
      {/* Band segments */}
      <mesh position={[0, 0.62, 0]}>
        <boxGeometry args={[0.28, 0.35, 0.035]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.62, 0]}>
        <boxGeometry args={[0.28, 0.35, 0.035]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>
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
    variant === "laptop" ? [0, 0.8, 3.5] : variant === "phone" ? [0, 0, 2.5] : [0, 0, 2];
  const supportsWebGL = useMemo(() => {
    if (typeof window === "undefined") return false;
    try {
      const canvas = document.createElement("canvas");
      return !!(
        (window as any).WebGL2RenderingContext && canvas.getContext("webgl2") ||
        canvas.getContext("webgl")
      );
    } catch {
      return false;
    }
  }, []);

  return (
    <div className="device-card-3d">
      <div className="canvas-container" aria-hidden="true">
        {supportsWebGL ? (
          <Canvas dpr={[1, 2]} camera={{ position: cameraPosition, fov: 30 }} frameloop="demand">
            <ambientLight intensity={0.6} />
            <directionalLight position={[2, 3, 2]} intensity={1.1} />
            <Environment preset="city" />
            <Model rotationY={rotationY} />
            <ContactShadows position={[0, -0.8, 0]} opacity={0.3} blur={2.6} far={4} />
          </Canvas>
        ) : (
          <div className="skeleton-placeholder" />
        )}
      </div>
      <div className="device-info">
        <h3 className="device-title">{title}</h3>
        <p className="device-subtitle">{subtitle}</p>
      </div>
    </div>
  );
}
