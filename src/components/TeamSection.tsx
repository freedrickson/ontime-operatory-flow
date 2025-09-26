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
              <span className="block">Enrollment</span>
              <span className="block">is a</span>
              <span className="block">Team Sport.</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <p className="subtitle-text text-gray-700 mb-16">
              We capture data on every key player in the patient journey. 
              Treatment acceptance is a whole-team effort.
            </p>

            <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="text-gray-500">Loading team...</div></div>}>
              <TeamAvatars />
            </Suspense>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TeamSection;