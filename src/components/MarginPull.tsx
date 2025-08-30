import { useEffect, useRef, useState } from "react";

interface MarginPullProps {
  children: React.ReactNode;
  align: "left" | "right";
  className?: string;
  strength?: number; // Animation strength multiplier (0-1)
}

const MarginPull = ({ children, align, className = "", strength = 0.5 }: MarginPullProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Calculate maximum safe offset based on container and content dimensions
  useEffect(() => {
    const calculateMaxOffset = () => {
      if (!ref.current) return;

      const element = ref.current;
      const container = element.parentElement;
      if (!container) return;

      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Calculate safe movement space (in pixels)
      const safeSpace = Math.max(0, (containerRect.width - elementRect.width) / 2);
      
      // Convert to percentage of viewport width for consistent scaling
      const maxOffsetVw = (safeSpace / window.innerWidth) * 100;
      
      setMaxOffset(Math.min(maxOffsetVw, 15)); // Cap at 15vw for reasonable movement
    };

    calculateMaxOffset();
    window.addEventListener('resize', calculateMaxOffset, { passive: true });
    
    return () => window.removeEventListener('resize', calculateMaxOffset);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Progress calculation for smooth transition
      let progress = 0;
      
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // Element is in viewport - start animation when section is 20% visible
        if (rect.top <= windowHeight * 0.8) {
          // Full animation when element is 20% visible
          const remainingDistance = Math.max(0, rect.top - (windowHeight * 0.2));
          const totalDistance = windowHeight * 0.6; // Distance from 80% to 20% viewport
          progress = Math.min(1, Math.max(0, 1 - (remainingDistance / totalDistance)));
        }
      }
      
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate transform based on alignment and scroll progress with boundary clamping
  const getTransform = () => {
    // Use calculated maxOffset or fallback to a safe default
    const safeMaxOffset = maxOffset > 0 ? maxOffset : 10;
    
    // Apply strength multiplier for easy tweaking
    const adjustedOffset = safeMaxOffset * strength;
    
    const offset = align === 'right' 
      ? adjustedOffset * scrollProgress // Start center, move to right
      : -adjustedOffset * scrollProgress; // Start center, move to left
    
    return `translateX(${offset}vw)`;
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-700 ease-out overflow-hidden ${className}`}
      style={{
        transform: getTransform(),
      }}
    >
      {children}
    </div>
  );
};

export default MarginPull;