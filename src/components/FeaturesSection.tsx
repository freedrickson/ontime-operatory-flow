import ScrollReveal from "./ScrollReveal";

const FeaturesSection = () => {
  const features = [
    {
      title: "Know what's needed—without looking up",
      description: "Customizable haptic notifications on Apple Watch/iPhone tell you what the request is (e.g., 'doctor needed,' 'check anesthetic,' 'ready to seat') without stopping to read a message.",
      micronote: "Works with Apple Watch and phones your team already has; patterns and labels are fully customizable.",
      align: "left"
    },
    {
      title: "Live floor‑plan dashboard",
      description: "Live Map of Doctor Requests to Keep the Flow. When a room requests a doctor, it lights up on the floor plan and jumps in the doctor queue—so leads can route the doctor instantly and keep both op and hygiene schedules on time. Rooms on floor plan dashboard changes color as wait time increases. This helps visually indicate urgency so patients time is respected.",
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
                  {feature.title}
                </h3>
              </div>
              <div className={`max-w-2xl ${feature.align === 'right' ? 'ml-auto' : ''}`}>
                <p className="subtitle-text text-gray-300 mb-4">
                  {feature.description}
                </p>
                {'micronote' in feature && (
                  <p className="text-sm text-gray-400 italic">
                    {feature.micronote}
                  </p>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;