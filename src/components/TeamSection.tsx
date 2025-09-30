import React, { Suspense } from "react";
import ScrollReveal from "./ScrollReveal";

const TeamAvatars = React.lazy(() => import("./TeamAvatars"));

const TeamSection = () => {
  return (
    <section id="team" className="min-h-screen bg-pure-white text-pure-black flex flex-col justify-center">
      <div className="container mx-auto px-8">
        <ScrollReveal>
          <div className="mb-32 text-right">
            <div className="max-w-5xl ml-auto">
              <h3 className="section-title mb-6">
                Why its different
              </h3>
            </div>
            <div className="max-w-2xl ml-auto">
              <div className="space-y-4 text-gray-600">
                <p className="subtitle-text">
                  <strong>First of its kind:</strong> Real‑time patient management designed for dentistry, not a generic task app.
                </p>
                <p className="subtitle-text">
                  <strong>No new hardware:</strong> Works with Apple Watch, iPhone, and iPad; wall tablet optional.
                </p>
                <p className="subtitle-text">
                  <strong>Fast setup:</strong> Map your practice once; go live the same day.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TeamSection;