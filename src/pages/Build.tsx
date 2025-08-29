import { useState } from "react";
import NavigationOverlay from "@/components/NavigationOverlay";
import FloorPlanEditor from "@/components/FloorPlanEditor";

export default function Build() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Fixed Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-8">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-foreground">
            On Time
          </div>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-lg font-medium hover:opacity-70 transition-all duration-300 text-foreground"
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
      <div className="pt-24">
        {/* Header */}
        <header className="border-b border-border p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold">Setup Your Office Floor Plan</h1>
          </div>
        </header>

        {/* Floor Plan Editor */}
        <div className="flex-1">
          <FloorPlanEditor />
        </div>
      </div>
    </div>
  );
}