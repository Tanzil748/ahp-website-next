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
    <section className="py-24 px-5 lg:px-10 bg-[#1a1a1b]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#d4af7a] uppercase tracking-[0.4em] text-xs font-bold mb-3">
            How To Apply
          </p>
          <h2 className="text-4xl md:text-5xl font-normal text-white font-[var(--font-forum)]">
            Application Process
          </h2>
        </div>

        <div className="relative">
          {/* Horizontal connector line — desktop only */}
          <div className="absolute top-[60px] left-0 right-0 h-px hidden md:block opacity-30 [background:linear-gradient(to_right,transparent_0%,#d4af7a_10%,#d4af7a_90%,transparent_100%)]" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 py-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group flex flex-col items-center text-center relative"
              >
                {/* Step circle */}
                <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center border border-[#d4af7a] rounded-full relative z-10 mb-5 bg-[#1a1a1b] transition-all duration-300 group-hover:bg-[#d4af7a] group-hover:scale-110">
                  <span className="text-[#d4af7a] text-base font-bold group-hover:text-white transition-colors duration-300 font-[var(--font-forum)]">
                    {step.number}
                  </span>
                </div>

                {/* Dot */}
                <div className="w-1 h-1 rounded-full bg-[#d4af7a] opacity-40 mb-4 group-hover:opacity-100 transition-opacity duration-300" />

                <h3 className="text-xl font-normal text-white mb-3 group-hover:text-[#d4af7a] transition-colors duration-300 font-[var(--font-forum)]">
                  {step.title}
                </h3>
                <p className="text-[#606060] text-sm leading-relaxed group-hover:text-[#a6a6a6] transition-colors duration-300">
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