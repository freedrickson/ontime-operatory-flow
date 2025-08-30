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
      
      // Find the actual layout container (with mx-auto or container classes)
      let container = element.parentElement;
      while (container && !container.classList.contains('container') && !container.classList.contains('mx-auto')) {
        container = container.parentElement;
      }
      
      if (!container) {
        container = element.parentElement; // Fallback to direct parent
      }
      
      if (!container) return;

      // Use offsetWidth for more reliable measurements
      const elementWidth = element.offsetWidth;
      const containerWidth = container.offsetWidth;
      
      // Get container padding to account for it
      const containerStyles = window.getComputedStyle(container);
      const paddingLeft = parseFloat(containerStyles.paddingLeft) || 0;
      const paddingRight = parseFloat(containerStyles.paddingRight) || 0;
      const totalPadding = paddingLeft + paddingRight;
      
      // Calculate available content width (container minus padding)
      const availableWidth = containerWidth - totalPadding;
      
      // Calculate safe movement space with a small safety buffer (10px)
      const safetyBuffer = 10;
      const safeSpace = Math.max(0, (availableWidth - elementWidth) / 2 - safetyBuffer);
      
      // Convert to percentage of container width for consistent scaling
      const maxOffsetPercent = (safeSpace / containerWidth) * 100;
      
      setMaxOffset(Math.max(0, Math.min(maxOffsetPercent, 12))); // Cap at 12% for reasonable movement
    };

    // Add a small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(calculateMaxOffset, 50);
    
    window.addEventListener('resize', calculateMaxOffset, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', calculateMaxOffset);
    };
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
    // Use calculated maxOffset or fallback to a safe default (in percentage)
    const safeMaxOffset = maxOffset > 0 ? maxOffset : 8;
    
    // Apply strength multiplier for easy tweaking
    const adjustedOffset = safeMaxOffset * strength;
    
    const offset = align === 'right' 
      ? adjustedOffset * scrollProgress // Start center, move to right
      : -adjustedOffset * scrollProgress; // Start center, move to left
    
    return `translateX(${offset}%)`;
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