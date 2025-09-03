import { useState } from "react";
import NavigationOverlay from "@/components/NavigationOverlay";
import LobbySection from "@/components/dashboard/LobbySection";
import TreatmentRoomsSection from "@/components/dashboard/TreatmentRoomsSection";
import DoctorQueue from "@/components/dashboard/DoctorQueue";
import IntraofficeMessaging from "@/components/dashboard/IntraofficeMessaging";

export default function Manage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section id="manage" className="manage-page relative min-h-screen bg-pure-black">
      {/* Fixed Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-8">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-pure-white">
            On Time Flow
          </div>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-lg font-medium hover:opacity-70 transition-all duration-300 text-pure-white"
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
      <main className="pt-32">
        {/* Hero Header Section */}
        <section className="px-8 py-20 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <h1 className="hero-text text-pure-white mb-6">
              Live Dashboard
            </h1>
            <p className="subtitle-text text-pure-white/70">
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
        <div className="flex min-h-[calc(100vh-400px)]">
          {/* Left Side - Floor Plan & Activity */}
          <div className="flex-1 p-12 space-y-12">
            {/* Floor Plan Center Canvas */}
            <div className="ios-card p-12">
              <h2 className="hero-text text-pure-white mb-8">Floor Plan View</h2>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 min-h-[300px] relative backdrop-blur-sm">
                {/* This will integrate with floor plan from Build page */}
                <div className="text-center text-pure-white/60">
                  <p className="text-xl font-medium">Interactive floor plan coming soon</p>
                  <p className="text-base mt-4">Will display live room status and patient flow</p>
                </div>
              </div>
            </div>

            {/* Activity Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Lobby Section */}
              <div className="ios-card overflow-hidden">
                <LobbySection />
              </div>
              
              {/* Treatment Rooms Section */}
              <div className="ios-card overflow-hidden">
                <TreatmentRoomsSection />
              </div>
            </div>
          </div>

          {/* Right Side - Doctor Queue */}
          <div className="w-96 border-l border-white/10 bg-black/20 backdrop-blur-sm">
            <DoctorQueue />
          </div>
        </div>

        {/* Messaging Footer */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <IntraofficeMessaging />
        </div>
      </main>
    </section>
  );
}