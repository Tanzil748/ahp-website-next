"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { JobTypeBadge } from "../ui/Badges";
import Ornament from "../ui/Ornament";
import IconBtn from "../shared/IconBtn";
import ConfirmModal from "../shared/ConfirmModal";
import { formatDate, formatSalary } from "../lib/helpers";
import { EMPTY_CAREER_FORM } from "../lib/constants";
import type { JobType } from "../lib/types";

// ── Career Form ────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "hsla(210,4%,7%,1)",
  border: "1px solid hsla(38,61%,73%,0.15)",
  color: "white",
  padding: "10px 14px",
  fontSize: "1.3rem",
  outline: "none",
  fontFamily: "var(--font-dm-sans)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  color: "hsla(0,0%,45%,1)",
  fontSize: "1rem",
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  marginBottom: 6,
};

function CareerForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: typeof EMPTY_CAREER_FORM;
  onSave: (data: typeof EMPTY_CAREER_FORM) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(initial);

  function set(key: string, val: any) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function setReq(i: number, val: string) {
    const next = [...form.requirements];
    next[i] = val;
    setForm((f) => ({ ...f, requirements: next }));
  }

  function addReq() {
    setForm((f) => ({ ...f, requirements: [...f.requirements, ""] }));
  }

  function removeReq(i: number) {
    setForm((f) => ({
      ...f,
      requirements: f.requirements.filter((_, idx) => idx !== i),
    }));
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle}>Job Title</label>
          <input
            style={inputStyle}
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Senior Developer"
          />
        </div>
        <div>
          <label style={labelStyle}>Department</label>
          <select
            style={{ ...inputStyle, appearance: "none" }}
            value={form.department}
            onChange={(e) => set("department", e.target.value)}
          >
            <option value="" disabled>
              Select department
            </option>
            {[
              "Marketing",
              "Sales",
              "Operations",
              "Technology",
              "Corporate",
            ].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Location</label>
          <input
            style={inputStyle}
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="e.g. Remote, New York"
          />
        </div>
        <div>
          <label style={labelStyle}>Employment Type</label>
          <select
            style={{ ...inputStyle, appearance: "none" }}
            value={form.type}
            onChange={(e) => set("type", e.target.value as JobType)}
          >
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Salary Min (optional)</label>
          <input
            style={inputStyle}
            type="number"
            value={form.salaryMin}
            onChange={(e) => set("salaryMin", e.target.value)}
            placeholder="e.g. 80000"
          />
        </div>
        <div>
          <label style={labelStyle}>Salary Max (optional)</label>
          <input
            style={inputStyle}
            type="number"
            value={form.salaryMax}
            onChange={(e) => set("salaryMax", e.target.value)}
            placeholder="e.g. 120000"
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Role overview, responsibilities..."
        />
      </div>

      <div>
        <label style={labelStyle}>Requirements</label>
        <div className="space-y-2">
          {form.requirements.map((req, i) => (
            <div key={i} className="flex gap-2">
              <input
                style={{ ...inputStyle, flex: 1 }}
                value={req}
                onChange={(e) => setReq(i, e.target.value)}
                placeholder={`Requirement ${i + 1}`}
              />
              {form.requirements.length > 1 && (
                <button
                  onClick={() => removeReq(i)}
                  className="px-3 shrink-0"
                  style={{
                    color: "hsl(0,65%,65%)",
                    backgroundColor: "hsla(0,65%,50%,0.1)",
                    border: "1px solid hsla(0,65%,50%,0.3)",
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addReq}
            className="text-[1.1rem] font-bold uppercase tracking-[0.15em] px-4 py-2 transition-colors"
            style={{
              color: "hsl(38,61%,73%)",
              backgroundColor: "hsla(38,61%,73%,0.08)",
              border: "1px solid hsla(38,61%,73%,0.25)",
            }}
          >
            + Add Requirement
          </button>
        </div>
      </div>

      {/* Active toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => set("isActive", !form.isActive)}
          className="relative w-11 h-6 transition-colors duration-300 shrink-0"
          style={{
            backgroundColor: form.isActive
              ? "hsl(38,61%,73%)"
              : "hsla(0,0%,25%,1)",
            borderRadius: 9999,
          }}
        >
          <span
            className="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300"
            style={{
              left: 4,
              transform: form.isActive ? "translateX(20px)" : "translateX(0)",
            }}
          />
        </button>
        <span className="text-white text-[1.2rem]">
          {form.isActive
            ? "Active (visible to applicants)"
            : "Inactive (hidden)"}
        </span>
      </div>

      <div className="flex gap-4 pt-2">
        <button
          onClick={onCancel}
          className="flex-1 py-3 border border-white/20 text-white/60 text-[1.1rem] font-bold uppercase tracking-[2px] transition-colors hover:border-white/40 hover:text-white/80"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          disabled={saving || !form.title || !form.department || !form.location}
          className="flex-1 py-3 text-[1.1rem] font-bold uppercase tracking-[2px] transition-all disabled:opacity-40"
          style={{
            backgroundColor: "hsla(38,61%,73%,0.15)",
            border: "1px solid hsla(38,61%,73%,0.4)",
            color: "hsl(38,61%,73%)",
          }}
        >
          {saving ? "Saving..." : "Save Listing"}
        </button>
      </div>
    </div>
  );
}

// ── Careers Panel ──────────────────────────────────────────────────────────

export default function CareersPanel() {
  const careers = useQuery(api.careers.getAllCareers);
  const createCareer = useMutation(api.careers.createCareer);
  const updateCareer = useMutation(api.careers.updateCareer);
  const toggleActive = useMutation(api.careers.toggleCareerActive);
  const deleteCareer = useMutation(api.careers.deleteCareer);

  const [mode, setMode] = useState<"list" | "create" | { edit: Id<"careers"> }>(
    "list",
  );
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState<{
    message: string;
    onConfirm: () => void;
  } | null>(null);

  async function handleCreate(form: typeof EMPTY_CAREER_FORM) {
    setSaving(true);
    try {
      await createCareer({
        title: form.title,
        department: form.department as
          | "Marketing"
          | "Sales"
          | "Operations"
          | "Technology"
          | "Corporate",
        location: form.location,
        type: form.type,
        description: form.description,
        requirements: form.requirements.filter((r) => r.trim()),
        salaryMin: form.salaryMin ? Number(form.salaryMin) : undefined,
        salaryMax: form.salaryMax ? Number(form.salaryMax) : undefined,
        isActive: form.isActive,
      });
      setMode("list");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(
    careerId: Id<"careers">,
    form: typeof EMPTY_CAREER_FORM,
  ) {
    setSaving(true);
    try {
      await updateCareer({
        careerId,
        title: form.title,
        department: form.department as
          | "Marketing"
          | "Sales"
          | "Operations"
          | "Technology"
          | "Corporate",
        location: form.location,
        type: form.type,
        description: form.description,
        requirements: form.requirements.filter((r) => r.trim()),
        salaryMin: form.salaryMin ? Number(form.salaryMin) : undefined,
        salaryMax: form.salaryMax ? Number(form.salaryMax) : undefined,
        isActive: form.isActive,
      });
      setMode("list");
    } finally {
      setSaving(false);
    }
  }

  // Create view
  if (mode === "create") {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-white text-[2rem] font-normal"
            style={{ fontFamily: "var(--font-display)" }}
          >
            New Listing
          </h2>
          <Ornament />
        </div>
        <div
          style={{ border: "1px solid hsla(38,61%,73%,0.1)", padding: "2rem" }}
        >
          <CareerForm
            initial={EMPTY_CAREER_FORM}
            onSave={handleCreate}
            onCancel={() => setMode("list")}
            saving={saving}
          />
        </div>
      </div>
    );
  }

  // Edit view
  if (typeof mode === "object" && "edit" in mode) {
    const career = (careers ?? []).find((c) => c._id === mode.edit);
    if (!career) return null;
    const initial = {
      title: career.title,
      department: career.department,
      location: career.location,
      type: career.type,
      description: career.description,
      requirements: career.requirements.length ? career.requirements : [""],
      salaryMin: career.salaryMin?.toString() ?? "",
      salaryMax: career.salaryMax?.toString() ?? "",
      isActive: career.isActive,
    };
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-white text-[2rem] font-normal"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Edit Listing
          </h2>
          <Ornament />
        </div>
        <div
          style={{ border: "1px solid hsla(38,61%,73%,0.1)", padding: "2rem" }}
        >
          <CareerForm
            initial={initial}
            onSave={(form) => handleUpdate(mode.edit, form)}
            onCancel={() => setMode("list")}
            saving={saving}
          />
        </div>
      </div>
    );
  }

  // List view
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
        <div>
          <p className="text-[hsla(0,0%,45%,1)] text-[1.1rem] uppercase tracking-[0.2em] font-bold mb-1">
            Job Listings
          </p>
          <p
            className="text-white text-[3rem] font-normal"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {careers?.length ?? "—"}
          </p>
        </div>
        <button
          onClick={() => setMode("create")}
          className="group relative inline-flex items-center gap-3 px-8 py-3 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[2px] text-[1.1rem] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)]"
        >
          <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
          <span className="relative z-10">+ New Listing</span>
        </button>
      </div>

      <div style={{ border: "1px solid hsla(38,61%,73%,0.1)" }}>
        {careers == null ? (
          <div className="py-16 space-y-4 px-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 animate-pulse rounded"
                style={{ backgroundColor: "hsla(38,61%,73%,0.05)" }}
              />
            ))}
          </div>
        ) : careers.length === 0 ? (
          <div className="py-20 text-center">
            <Ornament />
            <p className="mt-6 text-[hsla(0,0%,40%,1)] text-[1.4rem]">
              No job listings yet. Add one above.
            </p>
          </div>
        ) : (
          careers.map((career, i) => {
            const salary = formatSalary(career.salaryMin, career.salaryMax);
            const isLast = i === careers.length - 1;
            return (
              <div
                key={career._id}
                className="flex flex-col sm:flex-row sm:items-center gap-5 px-6 py-6"
                style={{
                  borderBottom: isLast
                    ? "none"
                    : "1px solid hsla(38,61%,73%,0.07)",
                  borderLeft: "2px solid transparent",
                  transition: "border-left-color 0.2s, background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderLeftColor =
                    "hsl(38,61%,73%)";
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    "hsla(38,61%,73%,0.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderLeftColor =
                    "transparent";
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    "transparent";
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className="text-[hsl(38,61%,73%)] text-[1rem] font-bold uppercase tracking-[0.15em]">
                      {career.department}
                    </span>
                    <JobTypeBadge type={career.type} />
                    {!career.isActive && (
                      <span
                        style={{
                          color: "hsla(0,0%,40%,1)",
                          backgroundColor: "hsla(0,0%,20%,1)",
                          border: "1px solid hsla(0,0%,30%,1)",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          padding: "2px 8px",
                          textTransform: "uppercase",
                        }}
                      >
                        Inactive
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-white text-[1.5rem] font-normal leading-tight mb-1 truncate"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {career.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-[1.1rem] text-[hsla(0,0%,45%,1)]">
                    <span>📍 {career.location}</span>
                    {salary && (
                      <>
                        <span>·</span>
                        <span>{salary}</span>
                      </>
                    )}
                    <span>·</span>
                    <span>{formatDate(career.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() =>
                      toggleActive({
                        careerId: career._id,
                        isActive: !career.isActive,
                      })
                    }
                    title={career.isActive ? "Set Inactive" : "Set Active"}
                    className="flex items-center px-4 py-2 transition-all duration-200 text-[1.1rem] font-bold uppercase tracking-widest"
                    style={{
                      color: career.isActive
                        ? "hsl(0,65%,65%)"
                        : "hsl(142,50%,62%)",
                      backgroundColor: career.isActive
                        ? "hsla(0,65%,50%,0.1)"
                        : "hsla(142,50%,50%,0.1)",
                      border: `1px solid ${career.isActive ? "hsla(0,65%,50%,0.3)" : "hsla(142,50%,50%,0.3)"}`,
                    }}
                  >
                    {career.isActive ? "Set Inactive" : "Set Active"}
                  </button>

                  <IconBtn
                    onClick={() => setMode({ edit: career._id })}
                    title="Edit"
                    color="hsl(200,70%,65%)"
                    bg="hsla(200,70%,65%,0.1)"
                    border="hsla(200,70%,65%,0.3)"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </IconBtn>

                  <IconBtn
                    onClick={() =>
                      setConfirm({
                        message: `Delete "${career.title}"? This cannot be undone.`,
                        onConfirm: async () => {
                          setConfirm(null);
                          await deleteCareer({ careerId: career._id });
                        },
                      })
                    }
                    title="Delete"
                    color="hsl(0,65%,65%)"
                    bg="hsla(0,65%,50%,0.08)"
                    border="hsla(0,65%,50%,0.2)"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </IconBtn>
                </div>
              </div>
            );
          })
        )}
      </div>

      {confirm && (
        <ConfirmModal
          message={confirm.message}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}
