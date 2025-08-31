import { useState } from "react";
import NavigationOverlay from "@/components/NavigationOverlay";
import LobbySection from "@/components/dashboard/LobbySection";
import TreatmentRoomsSection from "@/components/dashboard/TreatmentRoomsSection";
import DoctorQueue from "@/components/dashboard/DoctorQueue";
import IntraofficeMessaging from "@/components/dashboard/IntraofficeMessaging";

export default function Manage() {
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
        <section className="px-8 py-16 border-b border-border bg-gradient-to-br from-background to-muted/20">
          <div className="max-w-7xl mx-auto">
            <h1 className="section-title text-foreground mb-4">
              Live Dashboard
            </h1>
            <p className="text-xl text-muted-foreground font-medium">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </section>

        {/* Main Dashboard Layout */}
        <div className="flex min-h-[calc(100vh-320px)]">
          {/* Left Side - Floor Plan & Activity */}
          <div className="flex-1 p-8 space-y-8">
            {/* Floor Plan Center Canvas */}
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl shadow-sm border border-border/50 p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Floor Plan View</h2>
              <div className="bg-muted/20 rounded-xl p-6 min-h-[300px] relative">
                {/* This will integrate with floor plan from Build page */}
                <div className="text-center text-muted-foreground">
                  <p className="text-lg">Interactive floor plan coming soon</p>
                  <p className="text-sm mt-2">Will display live room status and patient flow</p>
                </div>
              </div>
            </div>

            {/* Activity Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Lobby Section */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl shadow-sm border border-border/50 overflow-hidden">
                <LobbySection />
              </div>
              
              {/* Treatment Rooms Section */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl shadow-sm border border-border/50 overflow-hidden">
                <TreatmentRoomsSection />
              </div>
            </div>
          </div>

          {/* Right Side - Doctor Queue */}
          <div className="w-96 border-l border-border/50 bg-card/30 backdrop-blur-sm">
            <DoctorQueue />
          </div>
        </div>

        {/* Messaging Footer */}
        <IntraofficeMessaging />
      </main>
    </div>
  );
}