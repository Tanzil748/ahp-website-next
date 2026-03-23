"use client";

import { useState } from "react";
import { OrnamentalSep, CheckIcon } from "./bloggerUtils";

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({
  id,
  label,
  optional,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-center gap-3 mb-2 uppercase font-bold tracking-[0.18em] text-[1.15rem] text-[var(--gold)]"
      >
        {label}
        {optional && (
          <span className="normal-case tracking-normal font-normal text-[1.05rem] text-[var(--text-muted)]">
            optional
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

// ─── Shared input styles ──────────────────────────────────────────────────────
const inputBase =
  "w-full bg-[hsla(210,4%,7%,1)] border text-white text-[1.45rem] px-[18px] py-[14px] outline-none transition-colors duration-200 font-[var(--font-dm-sans)] placeholder:text-white/30";

function Input({
  id,
  type = "text",
  placeholder,
  value,
  required,
  onChange,
}: {
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  required?: boolean;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`${inputBase} ${focused ? "border-[var(--gold)]" : "border-[var(--white-10)]"}`}
    />
  );
}

function Textarea({
  id,
  placeholder,
  value,
  rows = 4,
  onChange,
}: {
  id: string;
  placeholder: string;
  value: string;
  rows?: number;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`${inputBase} resize-y ${focused ? "border-[var(--gold)]" : "border-[var(--white-10)]"}`}
    />
  );
}

// ─── Form state ───────────────────────────────────────────────────────────────
type FormState = {
  fullName: string;
  email: string;
  country: string;
  phone: string;
  hasBlog: "" | "yes" | "no";
  monthlySubscribers: string;
  socialLinks: string;
  message: string;
};

const EMPTY: FormState = {
  fullName: "",
  email: "",
  country: "",
  phone: "",
  hasBlog: "",
  monthlySubscribers: "",
  socialLinks: "",
  message: "",
};

// ─── Main form ────────────────────────────────────────────────────────────────
export default function BloggerInquiryForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof FormState, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.country || !form.hasBlog) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "blogger",
          fullName: form.fullName,
          email: form.email,
          country: form.country,
          phone: form.phone || undefined,
          hasBlog: form.hasBlog,
          monthlySubscribers: form.monthlySubscribers || undefined,
          socialLinks: form.socialLinks || undefined,
          message: form.message || undefined,
        }),
      });

      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
      setForm(EMPTY);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success ──────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-6 text-center py-20 px-8 border border-[var(--white-10)]"
        style={{ background: "hsla(210,4%,11%,1)" }}
      >
        <div className="w-16 h-16 grid place-items-center border border-[var(--gold)]">
          <CheckIcon />
        </div>
        <div>
          <p
            className="font-normal text-white mb-2 [font-family:var(--font-display)]"
            style={{ fontSize: "clamp(2.2rem, 3vw, 3rem)" }}
          >
            Inquiry Received
          </p>
          <p className="text-[1.5rem] leading-[1.6] text-[var(--text-muted)]">
            Thank you for reaching out. Our team will review your application
            and get back to you within{" "}
            <span className="text-white font-bold">2–4 business days</span>.
          </p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="uppercase font-bold tracking-[0.2em] text-[1.1rem] text-[var(--gold)] hover:opacity-70 transition-opacity duration-200"
        >
          Submit Another →
        </button>
      </div>
    );
  }

  return (
    <div className="fade-up delay-2">
      {/* Header */}
      <div className="mb-8">
        <span className="uppercase font-bold text-[1.4rem] tracking-[0.4em] text-[var(--gold)]">
          Blogger Application
        </span>
        <OrnamentalSep align="left" />
        <h2
          className="mt-5 mb-3 font-normal leading-[1.3] text-white [font-family:var(--font-display)]"
          style={{ fontSize: "clamp(2.4rem, 3.5vw, 3.6rem)" }}
        >
          Join Our Blogger
          <br />
          Community
        </h2>
        <p className="text-[1.55rem] leading-[1.6] text-[var(--text-muted)]">
          Are you a content creator passionate about fragrance, luxury lifestyle
          or beauty? Tell us about yourself and we&apos;ll explore a
          collaboration.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        {/* Full Name */}
        <Field id="fullName" label="Full Name">
          <Input
            id="fullName"
            placeholder="Your full name"
            value={form.fullName}
            required
            onChange={(v) => set("fullName", v)}
          />
        </Field>

        {/* Email */}
        <Field id="email" label="Email Address">
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            required
            onChange={(v) => set("email", v)}
          />
        </Field>

        {/* Country + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <Field id="country" label="Country of Residence">
            <Input
              id="country"
              placeholder="e.g. United States"
              value={form.country}
              required
              onChange={(v) => set("country", v)}
            />
          </Field>

          <Field id="phone" label="Phone Number" optional>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={(v) => set("phone", v)}
            />
          </Field>
        </div>

        {/* Do you have a blog? */}
        <fieldset>
          <legend className="uppercase font-bold tracking-[0.18em] text-[1.15rem] mb-3 text-[var(--gold)]">
            Do you have a blog?
          </legend>
          <div className="flex gap-4">
            {(["yes", "no"] as const).map((opt) => {
              const active = form.hasBlog === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => set("hasBlog", opt)}
                  className="flex-1 py-3 uppercase font-bold tracking-[0.2em] text-[1.2rem] border transition-all duration-200"
                  style={{
                    borderColor: active ? "var(--gold)" : "var(--white-10)",
                    backgroundColor: active ? "var(--gold)" : "transparent",
                    color: active ? "var(--bg-dark)" : "var(--text-muted)",
                  }}
                >
                  {opt === "yes" ? "Yes" : "No"}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Monthly subscribers — conditional */}
        {form.hasBlog === "yes" && (
          <Field id="monthlySubscribers" label="Average Monthly Subscribers">
            <Input
              id="monthlySubscribers"
              placeholder="e.g. 5,000 — 10,000"
              value={form.monthlySubscribers}
              onChange={(v) => set("monthlySubscribers", v)}
            />
          </Field>
        )}

        {/* Social links */}
        <Field id="socialLinks" label="Social Links" optional>
          <Textarea
            id="socialLinks"
            placeholder={
              "Instagram: https://instagram.com/...\nTikTok: https://tiktok.com/...\nYouTube: https://youtube.com/..."
            }
            value={form.socialLinks}
            rows={3}
            onChange={(v) => set("socialLinks", v)}
          />
        </Field>

        {/* Anything else */}
        <Field
          id="message"
          label="Anything else you'd like us to know?"
          optional
        >
          <Textarea
            id="message"
            placeholder="Tell us about your content style, audience, past brand collaborations, or anything else you'd like us to know..."
            value={form.message}
            rows={5}
            onChange={(v) => set("message", v)}
          />
        </Field>

        {/* Divider */}
        <div className="w-full h-px opacity-30 bg-gradient-to-r from-[var(--gold)] to-transparent" />

        {/* Error */}
        {error && (
          <p className="text-[1.3rem] font-bold text-[hsl(0,65%,65%)]">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={
            loading ||
            !form.fullName ||
            !form.email ||
            !form.country ||
            !form.hasBlog
          }
          className="group relative w-full py-5 uppercase font-bold tracking-[0.3em] text-[1.3rem] overflow-hidden border border-[var(--gold)] text-[var(--gold)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 group-disabled:-translate-x-full transition-transform duration-300 -z-10 bg-[var(--gold)]" />
          <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--bg-dark)] group-disabled:text-[var(--gold)]">
            {loading ? "Sending…" : "Submit Inquiry →"}
          </span>
        </button>

        <p className="text-[1.2rem] text-center text-[var(--text-muted)]">
          Our team responds within{" "}
          <span className="text-white font-bold">2–4 business days</span>.
        </p>
      </form>
    </div>
  );
}
