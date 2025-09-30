"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import DeviceCard3D from "./DeviceCard3D";
import ScrollReveal from "./ScrollReveal";

export default function ProductsShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start end", "end start"] 
  });
  
  // Map progress to -18° to +18° rotation
  const rotationY = useTransform(scrollYProgress, [0, 1], [-Math.PI/10, Math.PI/10]);

  return (
    <section 
      id="products" 
      ref={ref}
      className="min-h-screen bg-pure-white text-pure-black flex flex-col justify-center relative py-24"
    >
      <div className="container mx-auto px-8 max-w-7xl">
        <ScrollReveal>
          <div className="text-center mb-24">
            <h2 className="section-title text-center">
              <span className="block">How it works</span>
            </h2>
            
            <div className="max-w-4xl mx-auto mt-12 space-y-8">
              <div className="text-left">
                <h3 className="text-2xl font-semibold mb-2">1. Map your floor plan once – Build ops and lobby in minutes.</h3>
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-semibold mb-2">2. Start a visit – Procedure timers run quietly in the room.</h3>
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-semibold mb-2">3. Stay on time – Wrist/phone prompts cue the right person at the right moment; the live board shows on‑time, late‑risk, and who's needed next.</h3>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <motion.div style={{ rotateY: rotationY }}>
              <DeviceCard3D 
                variant="laptop" 
                title="Desktop Dashboard" 
                subtitle="Full operatory floor plan"
              />
            </motion.div>
            
            <motion.div style={{ rotateY: rotationY }}>
              <DeviceCard3D 
                variant="phone" 
                title="Mobile App" 
                subtitle="On-the-go management"
              />
            </motion.div>
            
            <motion.div style={{ rotateY: rotationY }}>
              <DeviceCard3D 
                variant="watch" 
                title="Watch Companion" 
                subtitle="Instant notifications"
              />
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}