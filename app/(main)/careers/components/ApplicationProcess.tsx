const steps = [
  {
    number: "01",
    title: "Submit Application",
    text: "Find the position that matches your skills and submit your resume and cover letter.",
  },
  {
    number: "02",
    title: "Initial Review",
    text: "Our HR team reviews your application and contacts qualified candidates within 1–2 weeks.",
  },
  {
    number: "03",
    title: "Interview Process",
    text: "Participate in interviews with hiring managers and team members to find the right fit.",
  },
  {
    number: "04",
    title: "Join The Team",
    text: "Receive your offer, complete onboarding, and start your career journey with us.",
  },
];

export default function ApplicationProcess() {
  return (
    <section
      className="py-24 px-5"
      style={{ backgroundColor: "hsla(30,1%,9%,0.97)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span
            className="text-[hsl(38,61%,73%)] uppercase font-bold tracking-[0.4em] text-[1.2rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How To Apply
          </span>
          <h2
            className="font-normal text-white mt-3 text-[clamp(3rem,4vw,4.5rem)] leading-[1.1]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Application Process
          </h2>
          <div className="flex justify-center mt-5">
            <svg viewBox="0 0 100 12" width="100" height="12">
              <line
                x1="0"
                y1="6"
                x2="38"
                y2="6"
                stroke="hsl(38,61%,73%)"
                strokeWidth="1"
              />
              <rect
                x="44"
                y="2"
                width="8"
                height="8"
                transform="rotate(45 48 6)"
                fill="none"
                stroke="hsl(38,61%,73%)"
                strokeWidth="1"
              />
              <line
                x1="58"
                y1="6"
                x2="100"
                y2="6"
                stroke="hsl(38,61%,73%)"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="group relative p-8 flex flex-col gap-5 transition-all duration-300 hover:bg-[hsl(38,61%,73%)]/5"
              style={{ backgroundColor: "hsla(0,0%,8%,1)" }}
            >
              {/* Top border on hover */}
              <div className="absolute top-0 left-0 w-0 h-px bg-[hsl(38,61%,73%)] group-hover:w-full transition-all duration-500" />

              {/* Number */}
              <div className="flex items-end justify-between">
                <span
                  className="text-[hsl(38,61%,73%)]/20 text-[5rem] font-normal leading-none group-hover:text-[hsl(38,61%,73%)]/40 transition-colors duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.number}
                </span>
                {i < steps.length - 1 && (
                  <span className="hidden md:block text-white/10 text-[2rem] pb-2">
                    →
                  </span>
                )}
              </div>

              <div className="w-8 h-px bg-[hsl(38,61%,73%)]/40 group-hover:w-14 transition-all duration-500" />

              <h3
                className="text-white text-[2rem] font-normal group-hover:text-[hsl(38,61%,73%)] transition-colors duration-300"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.title}
              </h3>
              <p className="text-[hsla(0,0%,55%,1)] text-[1.4rem] leading-[1.7]">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
