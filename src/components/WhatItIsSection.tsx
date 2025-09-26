import ScrollReveal from "./ScrollReveal";

const WhatItIsSection = () => {
  return (
    <section id="what-it-is" className="min-h-screen bg-pure-white text-pure-black flex flex-col justify-center relative">
      <div className="container mx-auto px-8">
        <ScrollReveal>
          <div className="text-left">
            <h2 className="section-title">
              <span className="block">Your practice.</span>
              <span className="block">Your system.</span>
              <span className="block">Your rules.</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Desktop Mockup */}
            <div className="bg-gray-100 rounded-lg p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="rotating-device mx-auto mb-4" style={{ perspective: '200px' }}>
                  <div className="macbook-3d">
                    {/* MacBook Screen */}
                    <div className="w-16 h-10 bg-gray-800 rounded-t-sm relative">
                      <div className="w-14 h-8 bg-blue-500 rounded-sm absolute top-1 left-1"></div>
                    </div>
                    {/* MacBook Base */}
                    <div className="w-16 h-1 bg-gray-600 rounded-sm"></div>
                  </div>
                </div>
                <p className="font-medium">Desktop Dashboard</p>
                <p className="text-sm text-gray-600 mt-2">Full operatory floor plan</p>
              </div>
            </div>

            {/* Mobile Mockup */}
            <div className="bg-gray-100 rounded-lg p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="rotating-device mx-auto mb-4" style={{ perspective: '200px' }}>
                  <div className="iphone-3d">
                    {/* iPhone Body */}
                    <div className="w-12 h-20 bg-gray-800 rounded-2xl relative border-2 border-gray-700">
                      {/* Screen */}
                      <div className="w-10 h-16 bg-blue-500 rounded-xl absolute top-1 left-1"></div>
                      {/* Home indicator */}
                      <div className="w-6 h-1 bg-gray-600 rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2"></div>
                    </div>
                  </div>
                </div>
                <p className="font-medium">Mobile App</p>
                <p className="text-sm text-gray-600 mt-2">On-the-go management</p>
              </div>
            </div>

            {/* Watch Mockup */}
            <div className="bg-gray-100 rounded-lg p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="rotating-device mx-auto mb-4" style={{ perspective: '200px' }}>
                  <div className="watch-3d">
                    {/* Apple Watch Body */}
                    <div className="w-12 h-14 bg-gray-800 rounded-lg relative">
                      {/* Screen */}
                      <div className="w-10 h-12 bg-blue-500 rounded-lg absolute top-1 left-1"></div>
                      {/* Digital Crown */}
                      <div className="w-1 h-2 bg-gray-600 absolute right-0 top-2 rounded-sm"></div>
                    </div>
                    {/* Watch Band */}
                    <div className="w-2 h-6 bg-gray-700 rounded-sm absolute -top-6 left-1/2 transform -translate-x-1/2"></div>
                    <div className="w-2 h-6 bg-gray-700 rounded-sm absolute -bottom-6 left-1/2 transform -translate-x-1/2"></div>
                  </div>
                </div>
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