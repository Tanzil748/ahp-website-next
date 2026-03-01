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
    <section className="py-24 px-5 lg:px-10 bg-[#1a1a1b]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#d4af7a] uppercase tracking-[0.4em] text-xs font-bold mb-3 fade-up delay-4">
            Why Al Hussein Perfumes
          </p>
          <h2 className="text-4xl md:text-5xl font-normal text-white fade-up delay-5 font-[var(--font-forum)]">
            Why Work With Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="fade-up delay-6 bg-[#141414] border border-white/10 p-10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#d4af7a] hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] group"
            >
              <div className="w-[70px] h-[70px] mx-auto mb-6 flex items-center justify-center border-2 border-[#d4af7a] rounded-full text-4xl transition-all duration-300 group-hover:bg-[#d4af7a] group-hover:scale-110">
                {b.icon}
              </div>
              <h3 className="text-2xl font-normal text-white mb-4 font-[var(--font-forum)]">
                {b.title}
              </h3>
              <p className="text-[#a6a6a6] leading-relaxed text-sm">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}