import { useState } from "react";
import NavigationOverlay from "@/components/NavigationOverlay";
import HeroSection from "@/components/HeroSection";
import WhatItIsSection from "@/components/WhatItIsSection";
import FeaturesSection from "@/components/FeaturesSection";
import TeamSection from "@/components/TeamSection";
import ClosingSection from "@/components/ClosingSection";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Fixed Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-8">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-current">
            On Time
          </div>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-lg font-medium text-current hover:opacity-70 transition-opacity"
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
