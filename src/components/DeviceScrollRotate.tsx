"use client";
import React, { useEffect, useRef } from "react";

type Props = {
  src: string;
  alt: string;
  maxDeg?: number;   // default 22
  depth?: number;    // default 40 (px)
  shadow?: boolean;  // default true
};

export default function DeviceScrollRotate({
  src, alt, maxDeg = 22, depth = 40, shadow = true
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    const img = imgRef.current;
    if (!el || !img) return;
    
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReduced) {
      img.style.setProperty("--ry", "6deg");
      img.style.setProperty("--depth", `${depth}px`);
      return;
    }
    
    let inView = false;
    const io = new IntersectionObserver(
      ([entry]) => (inView = entry.isIntersecting),
      { threshold: [0, 1] }
    );
    io.observe(el);
    
    let raf = 0;
    const onScroll = () => {
      if (!inView) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const h = window.innerHeight || document.documentElement.clientHeight;
        const start = Math.min(h, Math.max(-rect.height, rect.top));
        const progress = 1 - (start + rect.height) / (h + rect.height); // 0→1 while in view
        const deg = (progress - 0.5) * 2 * maxDeg; // -maxDeg → +maxDeg
        img.style.setProperty("--ry", `${deg.toFixed(2)}deg`);
        img.style.setProperty("--depth", `${depth}px`);
      });
    };
    
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [depth, maxDeg]);
  
  return (
    <div ref={ref} className="device-rotate-wrap">
      <img 
        ref={imgRef} 
        src={src} 
        alt={alt} 
        loading="lazy" 
        className={shadow ? "device-img has-shadow" : "device-img"} 
      />
    </div>
  );
}