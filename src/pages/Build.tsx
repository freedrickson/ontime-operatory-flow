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
      <main className="pt-24">
        {/* Hero Header Section */}
        <section className="px-8 py-16 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <h1 className="section-title text-foreground mb-6">
              Build Your 
              <span className="block">Floor Plan</span>
            </h1>
            <p className="subtitle-text text-muted-foreground max-w-2xl">
              Design your office layout with drag-and-drop simplicity. Create treatment rooms, lobby areas, and admin spaces.
            </p>
          </div>
        </section>

        {/* Floor Plan Editor */}
        <div className="flex-1">
          <FloorPlanEditor />
        </div>
      </main>
    </div>
  );
}