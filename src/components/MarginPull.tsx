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
        // Element is in viewport
        const visibleTop = Math.max(0, windowHeight - elementTop);
        const visibleBottom = Math.min(windowHeight, windowHeight - (elementBottom - windowHeight));
        const totalVisible = elementHeight + windowHeight;
        progress = Math.min(1, visibleTop / (totalVisible / 2));
      }
      
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate transform based on alignment and scroll progress
  const getTransform = () => {
    const maxOffset = 60; // percentage to move from far edges
    const offset = align === 'right' 
      ? maxOffset * (1 - scrollProgress) // Start far right, move to center
      : -maxOffset * (1 - scrollProgress); // Start far left, move to center
    
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