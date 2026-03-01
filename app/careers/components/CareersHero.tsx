export default function CareersHero() {
  // Repeating perfume bottle pattern — same technique as the original cross pattern
  const bottlePattern = `url("data:image/svg+xml,%3Csvg width='60' height='80' viewBox='0 0 60 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='0.07'%3E%3C!-- cap --%3E%3Crect x='22' y='4' width='16' height='10' rx='2'/%3E%3C!-- neck --%3E%3Crect x='26' y='13' width='8' height='8'/%3E%3C!-- shoulder --%3E%3Cpath d='M18 21 Q18 28 14 32 L14 62 Q14 66 18 66 L42 66 Q46 66 46 62 L46 32 Q42 28 42 21 Z'/%3E%3C!-- label line --%3E%3Crect x='18' y='38' width='24' height='1'/%3E%3Crect x='18' y='54' width='24' height='1'/%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <section className="relative h-[450px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0c0c0c]">
      {/* Repeating perfume bottle pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: bottlePattern }}
      />

      {/* Radial fade so center is more transparent than edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, #0c0c0c 20%, transparent 80%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-5">
        <p className="fade-up delay-1 text-[#d4af7a] uppercase tracking-[0.4em] text-xs font-bold mb-4">
          Join Our Team
        </p>
        <h1
          className="fade-up delay-2 text-5xl md:text-7xl font-normal text-white mb-5"
          style={{ fontFamily: "var(--font-forum)" }}
        >
          Build Your Career With Us
        </h1>
        <p className="fade-up delay-3 text-[#a6a6a6] text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          Be part of a team that&apos;s passionate about creating exceptional
          fragrances and delivering excellence
        </p>
      </div>
    </section>
  );
}
