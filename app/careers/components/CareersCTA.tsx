export default function CareersCTA() {
  return (
    <section className="py-24 px-5 lg:px-10 bg-gradient-to-br from-[#141414] to-[#1a1a1b] border-t border-[#d4af7a]">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl font-normal text-white mb-5"
          style={{ fontFamily: "var(--font-forum)" }}
        >
          Don&apos;t See The Right Position?
        </h2>

        <p className="text-[#a6a6a6] text-base leading-relaxed mb-10">
          We&apos;re always looking for talented individuals. Send us your
          resume and we&apos;ll keep you in mind for future opportunities.
        </p>

        <a
          href="mailto:careers@alhusseinperfumes.com"
          className="inline-block px-12 py-5 bg-[#d4af7a] text-black text-sm font-bold uppercase tracking-wider border border-[#d4af7a] transition-all duration-300 hover:bg-transparent hover:text-[#d4af7a] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]"
        >
          Send Your Resume
        </a>
      </div>
    </section>
  );
}
