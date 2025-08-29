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
      <div className="pt-24">
        {/* Header */}
        <header className="border-b bg-card px-6 py-4">
        <h1 className="text-2xl font-semibold text-foreground">Live Dashboard</h1>
      </header>

      {/* Main Dashboard Layout */}
      <div className="flex h-[calc(100vh-80px-80px)]"> {/* Account for header and chat footer */}
        {/* Left Side - Lobby and Treatment Rooms */}
        <div className="flex-1 flex flex-col p-6 space-y-6">
          {/* Section A - Lobby */}
          <LobbySection />
          
          {/* Section B - Treatment Rooms */}
          <TreatmentRoomsSection />
        </div>

        {/* Right Side - Doctor Queue */}
        <div className="w-80 border-l">
          <DoctorQueue />
        </div>
      </div>

        {/* Section D - Intraoffice Messaging (Footer) */}
        <IntraofficeMessaging />
      </div>
    </div>
  );
}