"use client";

import BackToTop from "@/components/BackToTop";
import { useState } from "react";

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

const jobs = [
  {
    title: "Senior Marketing Manager",
    department: "Marketing",
    location: "New York, NY",
    type: "Full-Time",
    description:
      "Lead our marketing initiatives and develop strategies to expand our brand presence in the luxury fragrance market.",
    tags: ["5+ years experience", "Leadership", "Strategy"],
  },
  {
    title: "Regional Sales Director",
    department: "Sales",
    location: "Miami, FL",
    type: "Full-Time",
    description:
      "Drive sales growth across the Southeast region, build relationships with key retail partners.",
    tags: ["7+ years experience", "B2B Sales", "Team Management"],
  },
  {
    title: "Perfume Development Specialist",
    department: "Creative",
    location: "New York, NY",
    type: "Full-Time",
    description:
      "Work alongside master perfumers to develop new fragrances and test scent combinations.",
    tags: ["3+ years experience", "Fragrance Knowledge", "Chemistry"],
  },
];

const departments = [
  "All Departments",
  "Marketing",
  "Sales",
  "Operations",
  "Creative",
  "Corporate",
];

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

export default function CareersPage() {
  const [activeFilter, setActiveFilter] = useState("All Departments");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredJobs =
    activeFilter === "All Departments"
      ? jobs
      : jobs.filter((job) => job.department === activeFilter);

  return (
    <div className="bg-[#0c0c0c] text-white font-sans min-h-screen">
      {/* HERO */}
      <section className="relative h-[450px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0c0c0c]">
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-radial-gradient" />
        <div className="relative z-10 text-center max-w-3xl px-5">
          <p className="text-[#d4af7a] uppercase tracking-[0.4em] text-xs font-bold mb-4">
            Join Our Team
          </p>
          <h1
            className="text-5xl md:text-7xl font-normal text-white mb-5"
            style={{ fontFamily: "'Forum', cursive" }}
          >
            Build Your Career With Us
          </h1>
          <p className="text-[#a6a6a6] text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Be part of a team that&apos;s passionate about creating exceptional
            fragrances and delivering excellence
          </p>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className="py-24 px-5 bg-[#1a1a1b]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#d4af7a] uppercase tracking-[0.4em] text-xs font-bold mb-3">
              Why Al Hussein Perfumes
            </p>
            <h2
              className="text-4xl md:text-5xl font-normal text-white"
              style={{ fontFamily: "'Forum', cursive" }}
            >
              Why Work With Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-[#141414] border border-white/10 p-10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#d4af7a] hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] group"
              >
                <div className="w-[70px] h-[70px] mx-auto mb-6 flex items-center justify-center border-2 border-[#d4af7a] rounded-full text-4xl transition-all duration-300 group-hover:bg-[#d4af7a] group-hover:scale-110">
                  {b.icon}
                </div>
                <h3
                  className="text-2xl font-normal text-white mb-4"
                  style={{ fontFamily: "'Forum', cursive" }}
                >
                  {b.title}
                </h3>
                <p className="text-[#a6a6a6] leading-relaxed text-sm">
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="py-24 px-5 bg-[#0c0c0c]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#d4af7a] uppercase tracking-[0.4em] text-xs font-bold mb-3">
              Current Opportunities
            </p>
            <h2
              className="text-4xl md:text-5xl font-normal text-white"
              style={{ fontFamily: "'Forum', cursive" }}
            >
              Open Positions
            </h2>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 py-8 border-y border-white/10 bg-[#141414]">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveFilter(dept)}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                  activeFilter === dept
                    ? "bg-[#d4af7a] border-[#d4af7a] text-black"
                    : "bg-transparent border-white/10 text-[#a6a6a6] hover:bg-[#d4af7a] hover:border-[#d4af7a] hover:text-black"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Jobs */}
          <div className="flex flex-col gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.title}
                  className="bg-[#1a1a1b] border border-white/10 p-8 transition-all duration-300 hover:border-[#d4af7a] hover:translate-x-1 hover:shadow-[0_5px_20px_rgba(212,175,55,0.15)] group"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-5">
                    <div className="flex-1">
                      <h3
                        className="text-2xl md:text-3xl font-normal text-white mb-3 transition-colors duration-300 group-hover:text-[#d4af7a]"
                        style={{ fontFamily: "'Forum', cursive" }}
                      >
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#a6a6a6]">
                        <span className="text-[#d4af7a] font-bold uppercase tracking-wider">
                          {job.department}
                        </span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                      </div>
                    </div>
                    <button className="flex items-center justify-center gap-2 px-7 py-3 border border-[#d4af7a] text-[#d4af7a] text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#d4af7a] hover:text-black whitespace-nowrap">
                      Apply Now →
                    </button>
                  </div>
                  <p className="text-[#a6a6a6] leading-relaxed text-sm mb-5">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.3)] text-[#d4af7a] text-xs font-bold uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-[#a6a6a6] py-12">
                No positions available in this department.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* APPLICATION PROCESS */}
      <section className="py-24 px-5 bg-[#1a1a1b]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#d4af7a] uppercase tracking-[0.4em] text-xs font-bold mb-3">
              How To Apply
            </p>
            <h2
              className="text-4xl md:text-5xl font-normal text-white"
              style={{ fontFamily: "'Forum', cursive" }}
            >
              Application Process
            </h2>
          </div>

          {/* Steps row */}
          <div className="relative">
            {/* Horizontal connector line */}
            <div
              className="absolute top-[60px] left-0 right-0 h-px hidden md:block"
              style={{
                background:
                  "linear-gradient(to right, transparent 0%, #d4af7a 10%, #d4af7a 90%, transparent 100%)",
                opacity: 0.3,
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 py-6">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="group flex flex-col items-center text-center relative"
                >
                  {/* Step number circle */}
                  <div
                    className="w-[64px] h-[64px] flex-shrink-0 flex items-center justify-center border border-[#d4af7a] rounded-full relative z-10 mb-5 transition-all duration-300 group-hover:bg-[#d4af7a] group-hover:scale-110"
                    style={{ backgroundColor: "#1a1a1b" }}
                  >
                    <span
                      className="text-[#d4af7a] text-base font-bold group-hover:text-white transition-colors duration-300"
                      style={{ fontFamily: "'Forum', cursive" }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Dot accent */}
                  <div className="w-1 h-1 rounded-full bg-[#d4af7a] opacity-40 mb-4 group-hover:opacity-100 transition-opacity duration-300" />

                  <h3
                    className="text-xl font-normal text-white mb-3 group-hover:text-[#d4af7a] transition-colors duration-300"
                    style={{ fontFamily: "'Forum', cursive" }}
                  >
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

      {/* CTA */}
      <section className="py-24 px-5 bg-gradient-to-br from-[#141414] to-[#1a1a1b] border-t border-[#d4af7a]">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-normal text-white mb-5"
            style={{ fontFamily: "'Forum', cursive" }}
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
      <BackToTop />
    </div>
  );
}
