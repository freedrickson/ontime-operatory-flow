import { useEffect, useRef, useState } from "react";

interface MarginPullProps {
  children: React.ReactNode;
  align: "left" | "right";
  className?: string;
}

const MarginPull = ({ children, align, className = "" }: MarginPullProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress: 0 when element top is at bottom of viewport, 1 when element bottom is at top
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      const elementHeight = rect.height;
      
      // Progress calculation for smooth transition
      let progress = 0;
      
      if (elementTop <= windowHeight && elementBottom >= 0) {
        // Element is in viewport - start animation when section is 20% visible
        if (elementTop <= windowHeight * 0.8) {
          // Full animation when element is 20% visible
          const remainingDistance = Math.max(0, elementTop - (windowHeight * 0.2));
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

  // Calculate transform based on alignment and scroll progress
  const getTransform = () => {
    const maxOffset = 10; // percentage to move to edges (reduced for readability)
    const offset = align === 'right' 
      ? maxOffset * scrollProgress // Start center, move to right
      : -maxOffset * scrollProgress; // Start center, move to left
    
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