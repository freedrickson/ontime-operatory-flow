"use client";
import { Canvas } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import ErrorBoundary from "./ui/ErrorBoundary";
import FrontDesk from "./characters/FrontDesk";
import Hygienist from "./characters/Hygienist";
import Doctor from "./characters/Doctor";
import "../styles/team-avatars.css";

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
        <ErrorBoundary fallback={<div className="skeleton-placeholder" />}>
          <Canvas 
            dpr={[1, 2]} 
            camera={{ position: [0, 1.6, 3], fov: 30 }} 
            frameloop="demand"
            gl={{
              antialias: true,
              powerPreference: "high-performance",
              alpha: false,
              stencil: false,
              depth: true,
              preserveDrawingBuffer: false
            }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <directionalLight position={[-5, 5, -5]} intensity={0.4} />
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </Canvas>
        </ErrorBoundary>
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
