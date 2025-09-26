import ScrollReveal from "./ScrollReveal";
import DeviceScrollRotate from "./DeviceScrollRotate";
import "../styles/device-rotate.css";

const WhatItIsSection = () => {
  return (
    <section id="products" className="min-h-screen bg-pure-white text-pure-black flex flex-col justify-center relative py-24">
      <div className="container mx-auto px-8 max-w-7xl">
        <ScrollReveal>
          <div className="text-center mb-24">
            <h2 className="section-title text-center">
              <span className="block">Your practice.</span>
              <span className="block">Your system.</span>
              <span className="block">Your rules.</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Desktop Dashboard */}
            <div className="bg-gray-50/60 backdrop-blur-sm rounded-3xl p-12 transition-all duration-300 hover:-translate-y-0.5 border border-gray-100/50">
              <div className="text-center">
                <div className="mb-8 h-48 flex items-center justify-center">
                  <DeviceScrollRotate 
                    src="/devices/macbook-pro.png" 
                    alt="Desktop Dashboard on MacBook" 
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Desktop Dashboard</h3>
                <p className="text-lg text-gray-600 leading-relaxed">Full operatory floor plan</p>
              </div>
            </div>

            {/* Mobile App */}
            <div className="bg-gray-50/60 backdrop-blur-sm rounded-3xl p-12 transition-all duration-300 hover:-translate-y-0.5 border border-gray-100/50">
              <div className="text-center">
                <div className="mb-8 h-48 flex items-center justify-center">
                  <DeviceScrollRotate 
                    src="/devices/iphone.png" 
                    alt="On-the-go management on iPhone" 
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Mobile App</h3>
                <p className="text-lg text-gray-600 leading-relaxed">On-the-go management</p>
              </div>
            </div>

            {/* Watch Companion */}
            <div className="bg-gray-50/60 backdrop-blur-sm rounded-3xl p-12 transition-all duration-300 hover:-translate-y-0.5 border border-gray-100/50">
              <div className="text-center">
                <div className="mb-8 h-48 flex items-center justify-center">
                  <DeviceScrollRotate 
                    src="/devices/apple-watch.png" 
                    alt="Instant notifications on Apple Watch" 
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Watch Companion</h3>
                <p className="text-lg text-gray-600 leading-relaxed">Instant notifications</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WhatItIsSection;