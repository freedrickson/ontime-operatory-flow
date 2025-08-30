import ScrollReveal from "./ScrollReveal";

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-accent-color rounded-full"></div>
                </div>
                <h4 className="text-xl font-bold mb-2">Front Desk</h4>
                <p className="text-gray-600">Patient check-in & scheduling</p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-accent-color rounded-full"></div>
                </div>
                <h4 className="text-xl font-bold mb-2">Clinical Team</h4>
                <p className="text-gray-600">Treatment coordination</p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-accent-color rounded-full"></div>
                </div>
                <h4 className="text-xl font-bold mb-2">Doctors</h4>
                <p className="text-gray-600">Real-time practice insights</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TeamSection;