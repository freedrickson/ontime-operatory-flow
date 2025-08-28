import { useState, useEffect } from "react";
import NavigationOverlay from "@/components/NavigationOverlay";
import HeroSection from "@/components/HeroSection";
import WhatItIsSection from "@/components/WhatItIsSection";
import FeaturesSection from "@/components/FeaturesSection";
import TeamSection from "@/components/TeamSection";
import ClosingSection from "@/components/ClosingSection";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerTextColor, setHeaderTextColor] = useState("text-pure-white");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "hero", darkBg: true },
        { id: "what-it-is", darkBg: false },
        { id: "features", darkBg: true },
        { id: "team", darkBg: false },
        { id: "closing", darkBg: true }
      ];

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = scrollY + rect.top;
          const elementHeight = rect.height;

          // Check if we're in this section (header position relative to section)
          if (scrollY >= elementTop - 100 && scrollY < elementTop + elementHeight - 100) {
            setHeaderTextColor(section.darkBg ? "text-pure-white" : "text-pure-black");
            break;
          }
        }
      }
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Fixed Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-8">
        <div className="flex justify-between items-center">
          <div className={`text-2xl font-bold transition-colors duration-300 ${headerTextColor}`}>
            On Time
          </div>
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`text-lg font-medium hover:opacity-70 transition-all duration-300 ${headerTextColor}`}
          >
            MENU
          </button>
        </div>
      </header>

      {/* Navigation Overlay */}
      <NavigationOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />

      {/* Main Content */}
      <main>
        <HeroSection />
        <WhatItIsSection />
        <FeaturesSection />
        <TeamSection />
        <ClosingSection />
      </main>
    </div>
  );
};

export default Index;
