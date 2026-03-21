"use client";

import { useState } from "react";

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

export default function OpenPositions() {
  const [activeFilter, setActiveFilter] = useState("All Departments");

  const filteredJobs =
    activeFilter === "All Departments"
      ? jobs
      : jobs.filter((job) => job.department === activeFilter);

  return (
    <section
      className="py-24 px-5"
      style={{ backgroundColor: "hsla(0,0%,6%,0.97)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-[hsl(38,61%,73%)] uppercase font-bold tracking-[0.4em] text-[1.2rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Current Opportunities
          </span>
          <h2
            className="font-normal text-white mt-3 text-[clamp(3rem,4vw,4.5rem)] leading-[1.1]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Open Positions
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

        {/* Filter bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-14 py-6 border-y border-white/10">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveFilter(dept)}
              className={[
                "px-5 py-2 text-[1.1rem] font-bold uppercase tracking-[2px] border transition-all duration-200",
                activeFilter === dept
                  ? "bg-[hsl(38,61%,73%)] border-[hsl(38,61%,73%)] text-[hsl(40,12%,5%)]"
                  : "border-white/15 text-white/50 hover:border-[hsl(38,61%,73%)] hover:text-[hsl(38,61%,73%)]",
              ].join(" ")}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Job cards */}
        <div className="flex flex-col gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.title}
                className="group relative border border-white/10 hover:border-[hsl(38,61%,73%)] transition-all duration-300 overflow-hidden"
                style={{ backgroundColor: "hsla(0,0%,9%,1)" }}
              >
                {/* Left gold accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-[hsl(38,61%,73%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-5">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-[hsl(38,61%,73%)] text-[1.1rem] font-bold uppercase tracking-[2px]">
                          {job.department}
                        </span>
                        <span className="w-1.5 h-1.5 bg-[hsl(38,61%,73%)]/40 rotate-45" />
                        <span className="text-white/40 text-[1.2rem]">
                          {job.location}
                        </span>
                        <span className="w-1.5 h-1.5 bg-[hsl(38,61%,73%)]/40 rotate-45" />
                        <span className="text-white/40 text-[1.2rem]">
                          {job.type}
                        </span>
                      </div>

                      <h3
                        className="text-white text-[2.4rem] font-normal group-hover:text-[hsl(38,61%,73%)] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {job.title}
                      </h3>
                    </div>

                    <button className="group/btn relative inline-flex items-center gap-2 px-6 py-3 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[2px] text-[1.1rem] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)] shrink-0">
                      <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover/btn:translate-x-0 -z-10" />
                      <span className="relative z-10">Apply Now →</span>
                    </button>
                  </div>

                  <p className="text-[hsla(0,0%,60%,1)] text-[1.4rem] leading-[1.7] mb-5">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 border border-white/10 text-white/40 text-[1.1rem] uppercase tracking-wider font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-white/30 text-[1.6rem]">
                No positions available in this department.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
