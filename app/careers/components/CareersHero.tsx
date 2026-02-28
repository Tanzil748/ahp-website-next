export default function CareersHero() {
  return (
    <section className="relative h-[450px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0c0c0c]">
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 text-center max-w-3xl px-5">
        <p className="text-[#d4af7a] uppercase tracking-[0.4em] text-xs font-bold mb-4">
          Join Our Team
        </p>
        <h1
          className="text-5xl md:text-7xl font-normal text-white mb-5"
          style={{ fontFamily: "var(--font-forum)" }}
        >
          Build Your Career With Us
        </h1>
        <p className="text-[#a6a6a6] text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          Be part of a team that&apos;s passionate about creating exceptional
          fragrances and delivering excellence
        </p>
      </div>
    </section>
  );
}
