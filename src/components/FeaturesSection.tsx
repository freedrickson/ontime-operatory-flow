import CenterPull from "./CenterPull";

const FeaturesSection = () => {
  const features = [
    {
      title: "Custom Operatory Workflows",
      description: "Design your perfect patient flow",
      align: "left"
    },
    {
      title: "Live Timing On Your Wrist",
      description: "Never miss a beat with haptic feedback",
      align: "right"
    },
    {
      title: "All-in-One Dashboard",
      description: "Complete practice visibility at a glance",
      align: "left"
    },
    {
      title: "Communication Without the Chaos",
      description: "Intuitive team messaging with smart notifications",
      align: "right"
    }
  ];

  return (
    <section id="features" className="bg-pure-black text-pure-white">
      <div className="container mx-auto px-8">
        {features.map((feature, index) => (
          <div key={index} className="h-screen flex flex-col justify-center">
            <CenterPull>
              <div className={`${feature.align === 'right' ? 'text-right' : 'text-left'}`}>
                <h3 className="section-title mb-6">
                  {feature.title.split(' ').map((word, wordIndex) => (
                    <span key={wordIndex} className="block">
                      {word}
                    </span>
                  ))}
                </h3>
                <p className="subtitle-text text-gray-300 max-w-2xl mx-auto">
                  {feature.description}
                </p>
              </div>
            </CenterPull>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;