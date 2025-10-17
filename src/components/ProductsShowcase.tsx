"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import desktopImage from "@/assets/desktop-on-time-flow.png";
import iphoneImage from "@/assets/iphone-on-time-flow.png";
import appleWatchImage from "@/assets/apple-watch-on-time-flow.png";

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
          <div className="mb-32">
            <div className="max-w-5xl">
              <h3 className="section-title mb-6">
                How it works
              </h3>
            </div>
            <div className="max-w-2xl">
              <div className="space-y-6">
                <p className="subtitle-text text-gray-600">
                  <strong>1. Generate your dashboard from your floor plan</strong> – Build ops and lobby in minutes.
                </p>
                <p className="subtitle-text text-gray-600">
                  <strong>2. Send a cue</strong> – Patient timers start automatically; color-coded tiles (green → yellow → red) show wait duration.
                </p>
                <p className="subtitle-text text-gray-600">
                  <strong>3. Stay on time</strong> – Wrist/phone nudges route the right person at the right moment. The live board shows who's on-time, at-risk, and who's needed next.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="device-card-3d">
              <div className="mb-8">
                <img 
                  src={desktopImage} 
                  alt="Desktop Dashboard showing live floor plan"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="device-info">
                <h3 className="device-title">Desktop Dashboard</h3>
                <p className="device-subtitle">Full operatory floor plan</p>
              </div>
            </div>
            
            <div className="device-card-3d">
              <div className="mb-8">
                <img 
                  src={iphoneImage} 
                  alt="Mobile App showing floor plan on iPhone"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="device-info">
                <h3 className="device-title">Mobile App</h3>
                <p className="device-subtitle">On-the-go management</p>
              </div>
            </div>
            
            <div className="device-card-3d">
              <div className="mb-8">
                <img 
                  src={appleWatchImage} 
                  alt="Apple Watch showing floor plan notifications"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="device-info">
                <h3 className="device-title">Watch Companion</h3>
                <p className="device-subtitle">Instant notifications</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}