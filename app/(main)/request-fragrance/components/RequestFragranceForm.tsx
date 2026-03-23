"use client";

import { useState } from "react";
import {
  gold,
  eerieBlack2,
  smokyBlack2,
  quickSilver,
  whiteAlpha10,
  CheckIcon,
} from "./fragranceUtils";

// ─── Shared input base ────────────────────────────────────────────────────────
const inputBase =
  "w-full px-5 text-white outline-none transition-colors duration-500 text-[1.6rem] max-sm:text-[1.4rem]";

// ─── Input field ──────────────────────────────────────────────────────────────
function InputField({
  label,
  required,
  optional,
  error,
  ...props
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="mb-5">
      <label
        className="flex items-center gap-2 uppercase font-bold mb-1.5 text-[1.4rem] max-sm:text-[1.2rem] tracking-[3px]"
        style={{ color: quickSilver }}
      >
        {label}
        {required && <span style={{ color: gold }}>*</span>}
        {optional && (
          <span
            className="normal-case tracking-normal font-normal text-[1.1rem]"
            style={{ color: quickSilver, opacity: 0.6 }}
          >
            optional
          </span>
        )}
      </label>
      <input
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className={`${inputBase} h-[56px] max-sm:h-[48px]`}
        style={{
          backgroundColor: eerieBlack2,
          border: `1px solid ${error ? "hsl(0,70%,60%)" : focused ? gold : whiteAlpha10}`,
          fontFamily: "var(--font-dm-sans)",
        }}
      />
    </div>
  );
}

// ─── Select field ─────────────────────────────────────────────────────────────
function SelectField({
  label,
  required,
  error,
  placeholder,
  options,
  ...props
}: {
  label: string;
  required?: boolean;
  error?: boolean;
  placeholder?: string;
  options: string[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="mb-5">
      <label
        className="flex items-center gap-2 uppercase font-bold mb-1.5 text-[1.4rem] max-sm:text-[1.2rem] tracking-[3px]"
        style={{ color: quickSilver }}
      >
        {label}
        {required && <span style={{ color: gold }}>*</span>}
      </label>
      <select
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className={`${inputBase} h-[56px] max-sm:h-[48px] appearance-none cursor-pointer`}
        style={{
          backgroundColor: eerieBlack2,
          border: `1px solid ${error ? "hsl(0,70%,60%)" : focused ? gold : whiteAlpha10}`,
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        <option value="" disabled style={{ backgroundColor: eerieBlack2 }}>
          {placeholder ?? "Select…"}
        </option>
        {options.map((opt) => (
          <option
            key={opt}
            value={opt}
            style={{ backgroundColor: eerieBlack2 }}
          >
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── Textarea field ───────────────────────────────────────────────────────────
function TextareaField({
  label,
  required,
  optional,
  error,
  ...props
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="mb-5">
      <label
        className="flex items-center gap-2 uppercase font-bold mb-1.5 text-[1.4rem] max-sm:text-[1.2rem] tracking-[3px]"
        style={{ color: quickSilver }}
      >
        {label}
        {required && <span style={{ color: gold }}>*</span>}
        {optional && (
          <span
            className="normal-case tracking-normal font-normal text-[1.1rem]"
            style={{ color: quickSilver, opacity: 0.6 }}
          >
            optional
          </span>
        )}
      </label>
      <textarea
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className={`${inputBase} py-5 resize-none leading-[1.6] h-[160px] max-sm:h-[130px]`}
        style={{
          backgroundColor: eerieBlack2,
          border: `1px solid ${error ? "hsl(0,70%,60%)" : focused ? gold : whiteAlpha10}`,
          fontFamily: "var(--font-dm-sans)",
        }}
      />
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────
type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  gender: string;
  ageRange: string;
  fragranceName: string;
  fragranceBrand: string;
  fragranceLink: string;
  message: string;
};

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  gender: "",
  ageRange: "",
  fragranceName: "",
  fragranceBrand: "",
  fragranceLink: "",
  message: "",
};

export default function RequestFragranceForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(false);

    const newErrors: Record<string, boolean> = {};
    if (!form.firstName.trim()) newErrors.firstName = true;
    if (!form.lastName.trim()) newErrors.lastName = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = true;
    if (!form.country.trim()) newErrors.country = true;
    if (!form.gender) newErrors.gender = true;
    if (!form.ageRange) newErrors.ageRange = true;
    if (!form.fragranceName.trim()) newErrors.fragranceName = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "fragrance", ...form }),
    });

    setLoading(false);

    if (!res.ok) {
      setSendError(true);
      return;
    }

    setSubmitted(true);
    setForm(EMPTY);
  };

  // ── Success ──────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="fade-up delay-3">
        <div
          className="relative overflow-hidden px-[45px] py-[50px] max-lg:px-[22px] max-lg:py-[35px] max-sm:px-[16px] max-sm:py-[28px]"
          style={{ backgroundColor: smokyBlack2 }}
        >
          <span
            className="absolute top-0 right-0 w-[120px] h-[120px] opacity-40 pointer-events-none"
            style={{
              borderTop: `2px solid ${gold}`,
              borderRight: `2px solid ${gold}`,
            }}
          />
          <span
            className="absolute bottom-0 left-0 w-[120px] h-[120px] opacity-40 pointer-events-none"
            style={{
              borderBottom: `2px solid ${gold}`,
              borderLeft: `2px solid ${gold}`,
            }}
          />
          <div className="text-center py-10">
            <div
              className="w-[70px] h-[70px] rounded-full grid place-items-center mx-auto mb-6"
              style={{ border: `2px solid ${gold}` }}
            >
              <CheckIcon />
            </div>
            <h2
              className="mb-3 font-normal leading-[1.4]"
              style={{
                fontFamily: "var(--font-forum)",
                fontSize: "clamp(2.4rem, 3.5vw, 3.6rem)",
                fontWeight: 400,
              }}
            >
              Request Received!
            </h2>
            <p className="text-[1.65rem] mb-6" style={{ color: quickSilver }}>
              Thank you for your fragrance request. Our perfumers will review
              your preferences and be in touch within{" "}
              <span className="text-white font-bold">2–3 business days</span>.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="uppercase font-bold tracking-[0.2em] text-[1.1rem] hover:opacity-70 transition-opacity duration-200"
              style={{ color: gold }}
            >
              Submit Another →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-up delay-3">
      <div
        className="relative overflow-hidden px-[45px] py-[50px] max-lg:px-[22px] max-lg:py-[35px] max-sm:px-[16px] max-sm:py-[28px]"
        style={{ backgroundColor: smokyBlack2 }}
      >
        {/* Corner accents */}
        <span
          className="absolute top-0 right-0 w-[120px] h-[120px] opacity-40 pointer-events-none"
          style={{
            borderTop: `2px solid ${gold}`,
            borderRight: `2px solid ${gold}`,
          }}
        />
        <span
          className="absolute bottom-0 left-0 w-[120px] h-[120px] opacity-40 pointer-events-none"
          style={{
            borderBottom: `2px solid ${gold}`,
            borderLeft: `2px solid ${gold}`,
          }}
        />

        <h2
          className="mb-2 font-normal leading-[1.4]"
          style={{
            fontFamily: "var(--font-forum)",
            fontSize: "clamp(2.4rem, 3.5vw, 3.6rem)",
            fontWeight: 400,
          }}
        >
          Submit Your Request
        </h2>
        <p
          className="mb-9 text-[1.55rem] leading-[1.5]"
          style={{ color: quickSilver }}
        >
          Fill in your details and fragrance preferences below.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {/* Name row */}
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-x-5">
            <InputField
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Jane"
              required
              value={form.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            <InputField
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Smith"
              required
              value={form.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-x-5">
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@example.com"
              required
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+1 (000) 000-0000"
              optional
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          {/* Country + Gender */}
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-x-5">
            <InputField
              label="Country of Residence"
              name="country"
              type="text"
              placeholder="e.g. United States"
              required
              value={form.country}
              onChange={handleChange}
              error={errors.country}
            />
            <SelectField
              label="Gender"
              name="gender"
              required
              placeholder="Select gender…"
              value={form.gender}
              onChange={handleChange}
              error={errors.gender}
              options={["Male", "Female", "Unisex / Prefer not to say"]}
            />
          </div>

          {/* Age range */}
          <SelectField
            label="Age Range"
            name="ageRange"
            required
            placeholder="Select age range…"
            value={form.ageRange}
            onChange={handleChange}
            error={errors.ageRange}
            options={["Under 18", "18–24", "25–34", "35–44", "45–54", "55+"]}
          />

          {/* Fragrance Name + Brand */}
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-x-5">
            <InputField
              label="Requested Fragrance Name"
              name="fragranceName"
              type="text"
              placeholder="e.g. Baccarat Rouge 540"
              required
              value={form.fragranceName}
              onChange={handleChange}
              error={errors.fragranceName}
            />
            <InputField
              label="Requested Fragrance Brand"
              name="fragranceBrand"
              type="text"
              placeholder="e.g. Maison Francis Kurkdjian"
              optional
              value={form.fragranceBrand}
              onChange={handleChange}
            />
          </div>

          {/* External link */}
          <InputField
            label="External Link to Fragrance"
            name="fragranceLink"
            type="url"
            placeholder="https://..."
            optional
            value={form.fragranceLink}
            onChange={handleChange}
          />

          {/* Additional info */}
          <TextareaField
            label="Any additional info to share concerning your request?"
            name="message"
            placeholder="Preferred notes, occasion, longevity, bottle size, budget, or anything else our perfumers should know…"
            optional
            value={form.message}
            onChange={handleChange}
          />

          {/* Submit */}
          <>
            <style>{`
              .submit-btn-fragrance {
                position: relative;
                width: 100%;
                margin-top: 10px;
                height: 56px;
                padding: 0 48px;
                overflow: hidden;
                cursor: pointer;
                background: transparent;
                border: 2px solid ${gold};
                font-family: var(--font-dm-sans);
                font-weight: 700;
                font-size: 1.2rem;
                letter-spacing: 3px;
                text-transform: uppercase;
                color: ${gold};
                transition: color 0.35s ease;
              }
              .submit-btn-fragrance:disabled {
                opacity: 0.6;
                cursor: not-allowed;
              }
              .submit-btn-fragrance::before {
                content: '';
                position: absolute;
                inset: 0;
                background: ${gold};
                transform: translateY(100%);
                transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 0;
              }
              .submit-btn-fragrance:not(:disabled):hover::before { transform: translateY(0); }
              .submit-btn-fragrance:not(:disabled):hover { color: hsla(40,12%,5%,1); }
              .submit-btn-fragrance span { position: relative; z-index: 1; }
            `}</style>
            <button
              type="submit"
              className="submit-btn-fragrance"
              disabled={loading}
            >
              <span>{loading ? "Sending…" : "Submit Request"}</span>
            </button>
          </>

          {sendError && (
            <p
              className="mt-4 text-center text-[1.3rem]"
              style={{ color: "hsl(0,70%,60%)" }}
            >
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
