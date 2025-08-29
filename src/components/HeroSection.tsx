import CenterPull from "./CenterPull";
import ScrollReveal from "./ScrollReveal";

const HeroSection = () => {
  return (
    <section id="hero" className="h-screen bg-pure-black text-pure-white flex flex-col justify-center relative overflow-hidden">
      <div className="container mx-auto px-8 relative z-10">
        <CenterPull>
          <div className="text-center">
            <h1 className="hero-text">
              <span className="block">Dental</span>
              <span className="block">Chaos</span>
            </h1>
          </div>
        </CenterPull>
        
        <CenterPull className="mt-8">
          <div className="text-center">
            <h2 className="hero-text text-pure-white">
              <span className="block">Made</span>
              <span className="block">Clockwork</span>
            </h2>
          </div>
        </CenterPull>

        <ScrollReveal className="mt-16">
          <div className="text-center max-w-4xl mx-auto">
            <p className="subtitle-text text-gray-300 mb-12">
              Custom operatory management on desktop, mobile, and watch.
            </p>
            <button className="text-lg font-medium text-pure-white border-b border-pure-white hover:border-gray-300 hover:text-gray-300 transition-all duration-300">
              Start Mapping Your Practice
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="text-sm text-gray-400 animate-bounce">
          Keep Scrolling
        </div>
      </div>
    </section>
  );
};

export default HeroSection;