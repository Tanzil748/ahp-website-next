const steps = [
  {
    number: "1",
    title: "Submit Application",
    text: "Find the position that matches your skills and submit your resume and cover letter.",
  },
  {
    number: "2",
    title: "Initial Review",
    text: "Our HR team reviews your application and contacts qualified candidates within 1-2 weeks.",
  },
  {
    number: "3",
    title: "Interview Process",
    text: "Participate in interviews with hiring managers and team members.",
  },
  {
    number: "4",
    title: "Join The Team",
    text: "Receive your offer, complete onboarding, and start your career journey.",
  },
];

export default function ApplicationProcess() {
  return (
    <section className="careers-section bg-[var(--bg-careers-2)]">
      <div className="careers-container">
        <div className="careers-section-header">
          <p className="careers-eyebrow">How To Apply</p>
          <h2 className="careers-heading">Application Process</h2>
        </div>

        <div className="relative">
          {/* Horizontal connector line — desktop only */}
          <div className="absolute top-[60px] left-0 right-0 h-px hidden md:block opacity-30 [background:linear-gradient(to_right,transparent_0%,var(--gold-raw)_10%,var(--gold-raw)_90%,transparent_100%)]" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 py-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group flex flex-col items-center text-center relative"
              >
                {/* Step circle */}
                <div className="step-circle">
                  <span className="text-[var(--gold-raw)] text-base font-bold group-hover:text-white transition-colors duration-300 [font-family:var(--font-display)]">
                    {step.number}
                  </span>
                </div>

                {/* Dot */}
                <div className="w-1 h-1 rounded-full bg-[var(--gold-raw)] opacity-40 mb-4 group-hover:opacity-100 transition-opacity duration-300" />

                <h3 className="text-xl font-normal text-white mb-3 group-hover:text-[var(--gold-raw)] transition-colors duration-300 [font-family:var(--font-display)]">
                  {step.title}
                </h3>
                <p className="careers-body text-[var(--text-dimmer)] group-hover:text-[var(--text-dim)] transition-colors duration-300">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
