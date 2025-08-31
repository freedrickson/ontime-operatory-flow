import ScrollReveal from "./ScrollReveal";

const FeaturesSection = () => {
  const features = [
    {
      title: "Build Your Floor Plan, Bring it to Life",
      description: "Map out your practice once in the Build page and watch it power your Live Dashboard—every room and lobby chair color-coded in real time so you can spot delays before they become bottlenecks.",
      align: "left"
    },
    {
      title: "Haptic-Driven Timing on Your Wrist",
      description: "Role-aware, color-coded haptics cue doctors at the exact moment they’re needed—no hallway hunting, no guesswork.",
      align: "right"
    },
    {
      title: "Floor-Plan Dashboard Visibility",
      description: "One live map for lobby dots and back-office rooms. See waits escalate in real time and act before they turn Red—because on-time care is customer service.",
      align: "left"
    },
    {
      title: "Communication Without the Chaos",
      description: "Intuitive team messaging with smart notifications, context-aware notes tied directly to rooms and visits—fewer interruptions, cleaner handoffs, and the right details delivered at the right moment.",
      align: "right"
    }
  ];

  return (
    <section id="features" className="bg-pure-black text-pure-white py-32">
      <div className="container mx-auto px-8">
        {features.map((feature, index) => (
          <ScrollReveal key={index} className="mb-32">
            <div className={`${feature.align === 'right' ? 'text-right' : 'text-left'}`}>
              <div className="max-w-5xl">
                <h3 className="section-title mb-6">
                  {index === 0 ? (
                    <>
                      <span className="block">Build Your Floor</span>
                      <span className="block">Plan, Bring it to Life</span>
                    </>
                  ) : (
                    feature.title.split(' ').map((word, wordIndex) => (
                      <span key={wordIndex} className="block">
                        {word}
                      </span>
                    ))
                  )}
                </h3>
              </div>
              <p className="subtitle-text text-gray-300 max-w-2xl mx-auto">
                {feature.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;