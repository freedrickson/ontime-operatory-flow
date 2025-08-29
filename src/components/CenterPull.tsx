import { useEffect, useRef, useState } from "react";

interface CenterPullProps {
  children: React.ReactNode;
  className?: string;
}

const CenterPull = ({ children, className = "" }: CenterPullProps) => {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      // Calculate progress from 0 to 1 based on element's position in viewport
      // Element is "centered" when its center aligns with viewport center
      const elementCenter = rect.top + elementHeight / 2;
      const viewportCenter = viewportHeight / 2;
      
      // Distance from viewport center (-1 to 1, where 0 is perfectly centered)
      const distanceFromCenter = (elementCenter - viewportCenter) / (viewportHeight / 2);
      
      // Convert to progress (1 when centered, 0 when far away)
      const centerProgress = Math.max(0, 1 - Math.abs(distanceFromCenter));
      
      setProgress(centerProgress);
    };

    handleScroll(); // Initial calculation
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Calculate transform values based on progress
  const scale = 1 + (progress * 0.06); // 0% to 6% scale increase
  const letterSpacing = progress * 0.05; // Increased letter spacing when centered

  const style = {
    transform: `scale(${scale})`,
    letterSpacing: `${letterSpacing}em`,
    transition: "none", // Smooth via requestAnimationFrame, not CSS transitions
  };

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div 
      ref={ref} 
      className={`transition-transform duration-75 ease-out ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default CenterPull;