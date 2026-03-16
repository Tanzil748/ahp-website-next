export default function CareersHero() {
  const bottlePattern = `url("data:image/svg+xml,%3Csvg width='60' height='80' viewBox='0 0 60 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='0.07'%3E%3Crect x='22' y='4' width='16' height='10' rx='2'/%3E%3Crect x='26' y='13' width='8' height='8'/%3E%3Cpath d='M18 21 Q18 28 14 32 L14 62 Q14 66 18 66 L42 66 Q46 66 46 62 L46 32 Q42 28 42 21 Z'/%3E%3Crect x='18' y='38' width='24' height='1'/%3E%3Crect x='18' y='54' width='24' height='1'/%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <section className="relative h-[450px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[var(--bg-careers-1)]">
      {/* Repeating perfume bottle pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: bottlePattern }}
      />

      {/* Radial fade */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_70%_70%_at_50%_50%,var(--bg-careers-1)_20%,transparent_80%)]" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-5">
        <p className="fade-up delay-1 careers-eyebrow mb-4">Join Our Team</p>
        <h1 className="fade-up delay-2 text-5xl md:text-7xl font-normal text-white mb-5 [font-family:var(--font-display)]">
          Build Your Career With Us
        </h1>
        <p className="fade-up delay-3 careers-body text-base md:text-lg max-w-xl mx-auto">
          Be part of a team that&apos;s passionate about creating exceptional
          fragrances and delivering excellence
        </p>
      </div>
    </section>
  );
}
