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
    <section className="py-24 px-5 lg:px-10 bg-[#0c0c0c]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#d4af7a] uppercase tracking-[0.4em] text-xs font-bold mb-3">
            Current Opportunities
          </p>
          <h2 className="text-4xl md:text-5xl font-normal text-white font-[var(--font-forum)]">
            Open Positions
          </h2>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 py-8 px-5 border-y border-white/10 bg-[#141414]">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveFilter(dept)}
              className={`px-6 py-3 text-[1.2rem] font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                activeFilter === dept
                  ? "bg-[#d4af7a] border-[#d4af7a] text-black"
                  : "bg-transparent border-white/10 text-[#a6a6a6] hover:bg-[#d4af7a] hover:border-[#d4af7a] hover:text-black"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Job cards */}
        <div className="flex flex-col gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.title}
                className="bg-[#1a1a1b] border border-white/10 p-8 transition-all duration-300 hover:border-[#d4af7a] hover:translate-x-1 hover:shadow-[0_5px_20px_rgba(212,175,55,0.15)] group"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-5">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-normal text-white mb-3 transition-colors duration-300 group-hover:text-[#d4af7a] font-[var(--font-forum)]">
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
  );
}
