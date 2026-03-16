const benefits = [
  {
    icon: "🏆",
    title: "Industry Leadership",
    text: "Work with one of the leading names in luxury fragrances, where innovation meets tradition.",
  },
  {
    icon: "🚀",
    title: "Career Growth",
    text: "We invest in our people with continuous training, mentorship, and advancement opportunities.",
  },
  {
    icon: "👥",
    title: "Collaborative Culture",
    text: "Join a diverse team of passionate professionals who support and inspire each other.",
  },
  {
    icon: "❤️",
    title: "Comprehensive Benefits",
    text: "Enjoy competitive compensation, health insurance, retirement plans, and more.",
  },
  {
    icon: "💡",
    title: "Creative Environment",
    text: "Work in an atmosphere that encourages creativity, innovation, and new ideas.",
  },
  {
    icon: "🌍",
    title: "Global Impact",
    text: "Your work reaches customers worldwide, making a difference in how people experience luxury.",
  },
];

export default function WhyWorkWithUs() {
  return (
    <section className="careers-section bg-[var(--bg-careers-2)]">
      <div className="careers-container">
        <div className="careers-section-header">
          <p className="careers-eyebrow fade-up delay-4">
            Why Al Hussein Perfumes
          </p>
          <h2 className="careers-heading fade-up delay-5">Why Work With Us</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b) => (
            <div key={b.title} className="benefit-card fade-up delay-6 group">
              <div className="benefit-icon">{b.icon}</div>
              <h3 className="text-2xl font-normal text-white mb-4 [font-family:var(--font-display)]">
                {b.title}
              </h3>
              <p className="careers-body">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
