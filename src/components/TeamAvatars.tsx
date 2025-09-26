import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import "../styles/team-avatars.css";
import FrontDesk from "./characters/FrontDesk";
import Hygienist from "./characters/Hygienist";
import Doctor from "./characters/Doctor";
import ErrorBoundary from "./ui/ErrorBoundary";

export default function TeamAvatars() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 85%", "end 25%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  const Card = ({ title, subtitle, children, ariaLabel }: any) => (
    <motion.div className="team-card" style={{ opacity, scale }}>
      <ErrorBoundary fallback={
        <div className="canvas-wrap" aria-hidden="true">
          <div style={{ width: "100%", height: "100%" }} />
        </div>
      }>
        <div className="canvas-wrap" aria-hidden="true">
          <Canvas dpr={[1,2]} camera={{ position: [0, 1.6, 3], fov: 30 }} frameloop="demand" gl={{ antialias: true, powerPreference: "high-performance", alpha: false, stencil: false, depth: true, preserveDrawingBuffer: false }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[2, 3, 2]} intensity={1.1} />
            <directionalLight position={[-1, 2, -1]} intensity={0.4} />
            <Suspense fallback={null}>
              <Environment preset="studio" />
              {children}
            </Suspense>
            <ContactShadows position={[0, -1, 0]} opacity={0.25} blur={2.5} frames={1} />
          </Canvas>
        </div>
      </ErrorBoundary>
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