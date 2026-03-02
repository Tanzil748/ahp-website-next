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
    <section className="careers-section bg-[var(--bg-careers-1)]">
      <div className="careers-container">
        <div className="careers-section-header">
          <p className="careers-eyebrow">Current Opportunities</p>
          <h2 className="careers-heading">Open Positions</h2>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 py-8 px-5 border-y border-[var(--white-10)] bg-[var(--bg-careers-3)]">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveFilter(dept)}
              className={`dept-filter-btn ${activeFilter === dept ? "active" : ""}`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Job cards */}
        <div className="flex flex-col gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.title} className="job-card group">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-5">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-normal text-white mb-3 transition-colors duration-300 group-hover:text-[var(--gold-raw)] [font-family:var(--font-display)]">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-dim)]">
                      <span className="text-[var(--gold-raw)] font-bold uppercase tracking-wider">
                        {job.department}
                      </span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <button className="job-apply-btn">Apply Now →</button>
                </div>
                <p className="careers-body mb-5">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span key={tag} className="job-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-[var(--text-dim)] py-12">
              No positions available in this department.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
