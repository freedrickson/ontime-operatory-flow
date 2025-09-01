import ScrollReveal from "./ScrollReveal";

const ClosingSection = () => {
  return (
    <section id="closing" className="min-h-screen bg-pure-black text-pure-white flex flex-col justify-center">
      <div className="container mx-auto px-8 text-center">
        <ScrollReveal>
          <h2 className="section-title mb-16 text-left">
            <span className="block">The Real Risk</span>
            <span className="block">is Running</span>
            <span className="block">Late.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-2xl mx-auto mb-16">
            <p className="subtitle-text text-gray-300 mb-12">
              Don't let inefficient workflows cost you patients, revenue, and peace of mind.
            </p>
            
            <button className="group text-xl font-medium text-pure-white border border-pure-white px-8 py-4 hover:bg-pure-white hover:text-pure-black transition-all duration-300">
              Book a Demo
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-32 pt-16 border-t border-gray-800">
            <div className="flex justify-between items-center">
              <div className="text-left">
                <div className="text-2xl font-bold mb-2">On Time Flow</div>
                <div className="text-gray-400">Dental practice management</div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-400">
                  © 2024 On Time Flow. All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ClosingSection;