import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FloorPlanEditor from "@/components/FloorPlanEditor";

const Build = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-2xl font-bold">Setup Your Office Floor Plan</h1>
          </div>
        </div>
      </header>

      {/* Floor Plan Editor */}
      <div className="flex-1">
        <FloorPlanEditor />
      </div>
    </div>
  );
};

export default Build;