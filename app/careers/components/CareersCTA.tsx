export default function CareersCTA() {
  return (
    <section className="careers-section bg-gradient-to-br from-[var(--bg-careers-3)] to-[var(--bg-careers-2)] border-t border-[var(--gold-raw)]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="careers-heading mb-5">
          Don&apos;t See The Right Position?
        </h2>

        <p className="careers-body text-base mb-10">
          We&apos;re always looking for talented individuals. Send us your
          resume and we&apos;ll keep you in mind for future opportunities.
        </p>

        <a
          href="mailto:careers@alhusseinperfumes.com"
          className="careers-cta-btn"
        >
          Send Your Resume
        </a>
      </div>
    </section>
  );
}
