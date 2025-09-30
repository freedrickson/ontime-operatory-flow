import React, { Suspense } from "react";
import ScrollReveal from "./ScrollReveal";

const TeamAvatars = React.lazy(() => import("./TeamAvatars"));

const TeamSection = () => {
  return (
    <section id="team" className="min-h-screen bg-pure-white text-pure-black flex flex-col justify-center">
      <div className="container mx-auto px-8">
        <ScrollReveal>
          <div className="text-right mb-16">
            <h2 className="section-title">
              <span className="block">Why its different</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 text-left">
              <div className="flex items-start gap-4">
                <span className="text-2xl">•</span>
                <div>
                  <strong>First of its kind:</strong> Real‑time patient management designed for dentistry, not a generic task app.
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">•</span>
                <div>
                  <strong>No new hardware:</strong> Works with Apple Watch, iPhone, and iPad; wall tablet optional.
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">•</span>
                <div>
                  <strong>Fast setup:</strong> Map your practice once; go live the same day.
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TeamSection;