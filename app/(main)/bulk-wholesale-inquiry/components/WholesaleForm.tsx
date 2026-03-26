"use client";

import { useState } from "react";
import {
  gold,
  eerieBlack2,
  smokyBlack2,
  quickSilver,
  whiteAlpha10,
  CheckIcon,
} from "./wholesaleUtils";

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
        className={`${inputBase} py-5 resize-y leading-[1.6]`}
        style={{
          backgroundColor: eerieBlack2,
          border: `1px solid ${error ? "hsl(0,70%,60%)" : focused ? gold : whiteAlpha10}`,
          fontFamily: "var(--font-dm-sans)",
        }}
      />
    </div>
  );
}

// ─── Toggle Yes/No ────────────────────────────────────────────────────────────
function YesNoField({
  label,
  required,
  value,
  error,
  onChange,
}: {
  label: string;
  required?: boolean;
  value: "" | "yes" | "no";
  error?: boolean;
  onChange: (v: "yes" | "no") => void;
}) {
  return (
    <div className="mb-5">
      <p
        className="flex items-center gap-2 uppercase font-bold mb-3 text-[1.4rem] max-sm:text-[1.2rem] tracking-[3px]"
        style={{ color: error ? "hsl(0,70%,60%)" : quickSilver }}
      >
        {label}
        {required && <span style={{ color: gold }}>*</span>}
      </p>
      <div className="flex gap-4">
        {(["yes", "no"] as const).map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className="flex-1 py-3 uppercase font-bold tracking-[0.2em] text-[1.2rem] border transition-all duration-200"
              style={{
                borderColor:
                  error && !value
                    ? "hsl(0,70%,60%)"
                    : active
                      ? gold
                      : whiteAlpha10,
                backgroundColor: active ? gold : "transparent",
                color: active ? smokyBlack2 : quickSilver,
              }}
            >
              {opt === "yes" ? "Yes" : "No"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Multi-checkbox ───────────────────────────────────────────────────────────
function MultiCheckField({
  label,
  required,
  options,
  selected,
  error,
  onChange,
}: {
  label: string;
  required?: boolean;
  options: string[];
  selected: string[];
  error?: boolean;
  onChange: (vals: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(
      selected.includes(opt)
        ? selected.filter((s) => s !== opt)
        : [...selected, opt],
    );
  };

  return (
    <div className="mb-5">
      <p
        className="flex items-center gap-2 uppercase font-bold mb-3 text-[1.4rem] max-sm:text-[1.2rem] tracking-[3px]"
        style={{ color: error ? "hsl(0,70%,60%)" : quickSilver }}
      >
        {label}
        {required && <span style={{ color: gold }}>*</span>}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className="px-4 py-2 text-[1.2rem] font-bold uppercase tracking-[0.1em] border transition-all duration-200"
              style={{
                borderColor: active ? gold : whiteAlpha10,
                backgroundColor: active ? gold : "transparent",
                color: active ? smokyBlack2 : quickSilver,
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-2 text-[1.1rem]" style={{ color: "hsl(0,70%,60%)" }}>
          Please select at least one option.
        </p>
      )}
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div
      className="my-7 w-full h-px opacity-30"
      style={{ background: `linear-gradient(to right, ${gold}, transparent)` }}
    />
  );
}

// ─── Form state ───────────────────────────────────────────────────────────────
const SALES_CHANNELS = [
  "Brick & Mortar",
  "E-Commerce",
  "Marketplace (Amazon, eBay, etc.)",
  "Social Media",
];

const INTERESTED_BRANDS = [
  "Fragrance World",
  "French Avenue",
  "Lattafa",
  "Maison",
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  businessType: string;
  businessAddress: string;
  salesChannels: string[];
  sellsFragrances: "" | "yes" | "no";
  monthlyVolume: string;
  interestedBrands: string[];
  internationalShipping: "" | "yes" | "no";
  freightForwarder: "" | "yes" | "no";
  message: string;
  confirmed: boolean;
};

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  businessType: "",
  businessAddress: "",
  salesChannels: [],
  sellsFragrances: "",
  monthlyVolume: "",
  interestedBrands: [],
  internationalShipping: "",
  freightForwarder: "",
  message: "",
  confirmed: false,
};

// ─── Main form ────────────────────────────────────────────────────────────────
export default function WholesaleForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState(false);

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: false }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => set(e.target.name as keyof FormState, e.target.value as any);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(false);

    const newErrors: Record<string, boolean> = {};
    if (!form.firstName.trim()) newErrors.firstName = true;
    if (!form.lastName.trim()) newErrors.lastName = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = true;
    if (!form.company.trim()) newErrors.company = true;
    if (!form.businessType) newErrors.businessType = true;
    if (!form.businessAddress.trim()) newErrors.businessAddress = true;
    if (form.salesChannels.length === 0) newErrors.salesChannels = true;
    if (!form.sellsFragrances) newErrors.sellsFragrances = true;
    if (!form.monthlyVolume) newErrors.monthlyVolume = true;
    if (!form.internationalShipping) newErrors.internationalShipping = true;
    if (!form.freightForwarder) newErrors.freightForwarder = true;
    if (!form.confirmed) newErrors.confirmed = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "wholesale", ...form }),
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
              Inquiry Received!
            </h2>
            <p className="text-[1.65rem] mb-6" style={{ color: quickSilver }}>
              Thank you for your wholesale inquiry. Our trade team will review
              your submission and respond within{" "}
              <span className="text-white font-bold">2–4 business days</span>.
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
          Submit Your Inquiry
        </h2>
        <p
          className="mb-9 text-[1.55rem] leading-[1.5]"
          style={{ color: quickSilver }}
        >
          Complete the form below and our trade team will be in touch with
          pricing, terms and catalogue information.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {/* ── Contact details ── */}
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
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-x-5">
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@business.com"
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

          <Divider />

          {/* ── Business details ── */}
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-x-5">
            <InputField
              label="Business / Company Name"
              name="company"
              type="text"
              placeholder="Your Business Ltd."
              required
              value={form.company}
              onChange={handleChange}
              error={errors.company}
            />
            <InputField
              label="Business Website"
              name="website"
              type="url"
              placeholder="https://yourbusiness.com"
              optional
              value={form.website}
              onChange={handleChange}
            />
          </div>

          <SelectField
            label="Business Type"
            name="businessType"
            required
            placeholder="Select business type…"
            value={form.businessType}
            onChange={handleChange}
            error={errors.businessType}
            options={[
              "Retailer",
              "Distributor",
              "Wholesaler",
              "Online Seller",
              "Salon / Spa",
              "Other",
            ]}
          />

          <InputField
            label="Business Address"
            name="businessAddress"
            type="text"
            placeholder="123 Main St, City, State, ZIP, Country"
            required
            value={form.businessAddress}
            onChange={handleChange}
            error={errors.businessAddress}
          />

          <Divider />

          {/* ── Sales & operations ── */}
          <MultiCheckField
            label="Sales Channels"
            required
            options={SALES_CHANNELS}
            selected={form.salesChannels}
            error={errors.salesChannels}
            onChange={(v) => set("salesChannels", v)}
          />

          <YesNoField
            label="Do you currently sell fragrances?"
            required
            value={form.sellsFragrances}
            error={errors.sellsFragrances}
            onChange={(v) => set("sellsFragrances", v)}
          />

          <SelectField
            label="Estimated Monthly Order Volume"
            name="monthlyVolume"
            required
            placeholder="Select volume range…"
            value={form.monthlyVolume}
            onChange={handleChange}
            error={errors.monthlyVolume}
            options={[
              "Under $999",
              "$1,000 – $4,999",
              "$5,000 – $9,999",
              "$10,000+",
            ]}
          />

          <Divider />

          {/* ── Brand & shipping preferences ── */}
          <MultiCheckField
            label="Interested Brands"
            options={INTERESTED_BRANDS}
            selected={form.interestedBrands}
            onChange={(v) => set("interestedBrands", v)}
          />

          <YesNoField
            label="Do you require international shipping?"
            required
            value={form.internationalShipping}
            error={errors.internationalShipping}
            onChange={(v) => set("internationalShipping", v)}
          />

          <YesNoField
            label="Do you have a freight forwarder?"
            required
            value={form.freightForwarder}
            error={errors.freightForwarder}
            onChange={(v) => set("freightForwarder", v)}
          />

          <Divider />

          {/* ── Message ── */}
          <TextareaField
            label="Message"
            name="message"
            optional
            placeholder="Fragrance type preferences, scent families, concentration preferences, private label interest, or anything else you'd like us to know…"
            value={form.message}
            onChange={handleChange}
            rows={4}
          />

          {/* ── Confirmation checkbox ── */}
          <div className="mb-7">
            <label
              className="flex items-start gap-4 cursor-pointer group"
              style={{
                color: errors.confirmed ? "hsl(0,70%,60%)" : quickSilver,
              }}
            >
              <div
                className="mt-[3px] w-5 h-5 shrink-0 flex items-center justify-center border transition-all duration-200"
                style={{
                  borderColor: errors.confirmed
                    ? "hsl(0,70%,60%)"
                    : form.confirmed
                      ? gold
                      : whiteAlpha10,
                  backgroundColor: form.confirmed ? gold : "transparent",
                }}
                onClick={() => set("confirmed", !form.confirmed)}
              >
                {form.confirmed && (
                  <svg
                    viewBox="0 0 12 10"
                    width="10"
                    height="10"
                    fill="none"
                    stroke={smokyBlack2}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="1 5 4.5 8.5 11 1" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={form.confirmed}
                onChange={(e) => set("confirmed", e.target.checked)}
                className="sr-only"
              />
              <span className="text-[1.4rem] leading-[1.5] max-sm:text-[1.2rem]">
                I confirm I am a registered business and interested in wholesale
                purchasing <span style={{ color: gold }}>*</span>
              </span>
            </label>
            {errors.confirmed && (
              <p
                className="mt-2 ml-9 text-[1.1rem]"
                style={{ color: "hsl(0,70%,60%)" }}
              >
                You must confirm before submitting.
              </p>
            )}
          </div>

          {/* ── Submit ── */}
          <>
            <style>{`
              .submit-btn-wholesale {
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
              .submit-btn-wholesale:disabled { opacity: 0.6; cursor: not-allowed; }
              .submit-btn-wholesale::before {
                content: '';
                position: absolute;
                inset: 0;
                background: ${gold};
                transform: translateY(100%);
                transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 0;
              }
              .submit-btn-wholesale:not(:disabled):hover::before { transform: translateY(0); }
              .submit-btn-wholesale:not(:disabled):hover { color: hsla(40,12%,5%,1); }
              .submit-btn-wholesale span { position: relative; z-index: 1; }
            `}</style>
            <button
              type="submit"
              className="submit-btn-wholesale"
              disabled={loading}
            >
              <span>{loading ? "Sending…" : "Submit Inquiry"}</span>
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
