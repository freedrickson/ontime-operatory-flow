import { useState } from "react";
import LobbySection from "@/components/dashboard/LobbySection";
import TreatmentRoomsSection from "@/components/dashboard/TreatmentRoomsSection";
import DoctorQueue from "@/components/dashboard/DoctorQueue";
import IntraofficeMessaging from "@/components/dashboard/IntraofficeMessaging";

export default function Manage() {
  return (
    <div className="min-h-screen bg-background">
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
  );
}