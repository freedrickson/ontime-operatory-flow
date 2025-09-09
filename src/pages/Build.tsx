import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import FloorPlanEditor from "@/components/FloorPlanEditor";

export default function Build() {
  return (
    <div className="relative min-h-screen bg-background">
      <AppHeader />

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