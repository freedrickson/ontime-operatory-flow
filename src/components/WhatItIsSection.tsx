import CenterPull from "./CenterPull";
import ScrollReveal from "./ScrollReveal";

const WhatItIsSection = () => {
  return (
    <section id="what-it-is" className="h-screen bg-pure-white text-pure-black flex flex-col justify-center relative">
      <div className="container mx-auto px-8">
        <CenterPull>
          <div className="text-center">
            <h2 className="section-title">
              <span className="block">Your practice.</span>
              <span className="block">Your system.</span>
              <span className="block">Your rules.</span>
            </h2>
          </div>
        </CenterPull>

        <ScrollReveal className="mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Desktop Mockup */}
            <div className="bg-gray-100 rounded-lg p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-color rounded-lg mx-auto mb-4"></div>
                <p className="font-medium">Desktop Dashboard</p>
                <p className="text-sm text-gray-600 mt-2">Full operatory floor plan</p>
              </div>
            </div>

            {/* Mobile Mockup */}
            <div className="bg-gray-100 rounded-lg p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-20 bg-accent-color rounded-lg mx-auto mb-4"></div>
                <p className="font-medium">Mobile App</p>
                <p className="text-sm text-gray-600 mt-2">On-the-go management</p>
              </div>
            </div>

            {/* Watch Mockup */}
            <div className="bg-gray-100 rounded-lg p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-12 bg-accent-color rounded-full mx-auto mb-4"></div>
                <p className="font-medium">Watch Companion</p>
                <p className="text-sm text-gray-600 mt-2">Instant notifications</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WhatItIsSection;