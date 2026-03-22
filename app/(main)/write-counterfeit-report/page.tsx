"use client";

import { useState } from "react";
import Link from "next/link";

// ── Input field ───────────────────────────────────────────────────────────────
function InputField({
  label,
  required,
  error,
  ...props
}: {
  label: string;
  required?: boolean;
  error?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="mb-5">
      <label className="block uppercase font-bold mb-1.5 text-[1.4rem] max-sm:text-[1.2rem] tracking-[3px] text-[hsla(0,0%,65%,1)]">
        {label} {required && <span className="text-[hsl(38,61%,73%)]">*</span>}
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
        className={`w-full h-[56px] max-sm:h-[48px] px-5 text-white outline-none transition-colors duration-500 text-[1.6rem] max-sm:text-[1.4rem] bg-[hsla(0,0%,13%,1)] border [font-family:var(--font-dm-sans)] ${
          error
            ? "border-[hsl(0,70%,60%)]"
            : focused
              ? "border-[hsl(38,61%,73%)]"
              : "border-white/10"
        }`}
      />
    </div>
  );
}

// ── Textarea field ────────────────────────────────────────────────────────────
function TextareaField({
  label,
  required,
  error,
  hint,
  heightClass = "h-[200px]",
  ...props
}: {
  label: string;
  required?: boolean;
  error?: boolean;
  hint?: string;
  heightClass?: string;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "style">) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="mb-5">
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="block uppercase font-bold text-[1.4rem] max-sm:text-[1.2rem] tracking-[3px] text-[hsla(0,0%,65%,1)]">
          {label}{" "}
          {required && <span className="text-[hsl(38,61%,73%)]">*</span>}
        </label>
        {hint && <span className="text-[1.2rem] text-white/10">{hint}</span>}
      </div>
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
        className={`w-full px-5 py-5 text-white outline-none resize-none transition-colors duration-500 text-[1.6rem] max-sm:text-[1.4rem] leading-[1.6] bg-[hsla(0,0%,13%,1)] border [font-family:var(--font-dm-sans)] ${heightClass} ${
          error
            ? "border-[hsl(0,70%,60%)]"
            : focused
              ? "border-[hsl(38,61%,73%)]"
              : "border-white/10"
        }`}
      />
    </div>
  );
}

// ── Select field ──────────────────────────────────────────────────────────────
function SelectField({
  label,
  required,
  error,
  options,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  required?: boolean;
  error?: boolean;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="mb-5">
      <label className="block uppercase font-bold mb-1.5 text-[1.4rem] max-sm:text-[1.2rem] tracking-[3px] text-[hsla(0,0%,65%,1)]">
        {label} {required && <span className="text-[hsl(38,61%,73%)]">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full h-[56px] max-sm:h-[48px] px-5 text-white outline-none transition-colors duration-500 text-[1.6rem] max-sm:text-[1.4rem] appearance-none cursor-pointer bg-[hsla(0,0%,13%,1)] border [font-family:var(--font-dm-sans)] ${
          error
            ? "border-[hsl(0,70%,60%)]"
            : focused
              ? "border-[hsl(38,61%,73%)]"
              : "border-white/10"
        }`}
      >
        <option value="" disabled className="bg-[hsla(40,12%,5%,1)]">
          {placeholder ?? "Select an option…"}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[hsla(40,12%,5%,1)]">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

// ── File upload field ─────────────────────────────────────────────────────────
function FileUploadField({
  label,
  hint,
  error,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  error?: boolean;
  value: File | null;
  onChange: (file: File | null) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="mb-5">
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="block uppercase font-bold text-[1.4rem] max-sm:text-[1.2rem] tracking-[3px] text-[hsla(0,0%,65%,1)]">
          {label}
        </label>
        {hint && <span className="text-[1.2rem] text-white/10">{hint}</span>}
      </div>
      <label
        tabIndex={0}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`flex items-center gap-4 w-full h-[56px] max-sm:h-[48px] px-5 cursor-pointer transition-colors duration-500 bg-[hsla(0,0%,13%,1)] border ${
          error
            ? "border-[hsl(0,70%,60%)]"
            : focused
              ? "border-[hsl(38,61%,73%)]"
              : "border-white/10"
        }`}
      >
        <span className="shrink-0 px-4 py-1.5 text-[1.2rem] font-bold uppercase tracking-[2px] border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] [font-family:var(--font-dm-sans)]">
          Choose File
        </span>
        <span
          className={`truncate text-[1.5rem] ${value ? "text-white" : "text-[hsla(0,0%,65%,1)]"}`}
        >
          {value ? value.name : "No file chosen"}
        </span>
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </label>

      {value && (
        <div className="flex items-center justify-between mt-2 px-1">
          <p className="text-[1.3rem] text-[hsla(0,0%,65%,1)]">
            {(value.size / 1024 / 1024).toFixed(2)} MB
          </p>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-[1.3rem] uppercase tracking-[2px] font-bold text-[hsla(0,0%,65%,1)] transition-colors duration-200 hover:text-[hsl(0,70%,60%)]"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

// ── Submit button ─────────────────────────────────────────────────────────────
function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="relative w-full mt-[10px] h-[56px] px-12 overflow-hidden cursor-pointer bg-transparent border-2 border-[hsl(38,61%,73%)] [font-family:var(--font-dm-sans)] font-bold text-[1.2rem] tracking-[3px] uppercase text-[hsl(38,61%,73%)] transition-colors duration-[350ms] before:content-[''] before:absolute before:inset-0 before:bg-[hsl(38,61%,73%)] before:translate-y-full before:transition-transform before:duration-[450ms] before:ease-[cubic-bezier(0.4,0,0.2,1)] before:z-0 hover:before:translate-y-0 hover:text-[hsla(40,12%,5%,1)] disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none"
    >
      <span className="relative z-10">
        {loading ? "Submitting…" : "Submit Report"}
      </span>
    </button>
  );
}

// ── Constants ─────────────────────────────────────────────────────────────────
const PRODUCT_TYPES = [
  "Eau de Parfum",
  "Eau de Toilette",
  "Perfume Oil",
  "Gift Set",
  "Other",
];

const PURCHASE_CHANNELS = [
  "Online Marketplace (e.g. Amazon, eBay)",
  "Social Media Shop",
  "Unknown Website",
  "Physical Store",
  "Street Vendor",
  "Other",
];

// ── Main component ────────────────────────────────────────────────────────────
export default function WriteCounterfeitReportPage() {
  const [form, setForm] = useState({
    reporterName: "",
    reporterEmail: "",
    productName: "",
    productType: "",
    purchaseChannel: "",
    sellerName: "",
    sellerUrl: "",
    purchaseDate: "",
    purchasePrice: "",
    description: "",
    imageFile: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(false);

    const newErrors: Record<string, boolean> = {};
    if (!form.reporterEmail.trim()) newErrors.reporterEmail = true;
    if (!form.productName.trim()) newErrors.productName = true;
    if (!form.purchaseChannel) newErrors.purchaseChannel = true;
    if (!form.description.trim()) newErrors.description = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      // TODO: wire up to Convex mutation or email handler
      await new Promise((res) => setTimeout(res, 1200)); // simulated delay
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-32 px-5 bg-[hsla(210,4%,9%,1)] [font-family:var(--font-dm-sans)]">
      <div className="max-w-[820px] mx-auto">
        {/* Page heading */}
        <div className="text-center mb-12 mt-12">
          <span className="uppercase font-bold tracking-[0.4em] text-[1.2rem] text-[hsl(38,61%,73%)] [font-family:var(--font-display)]">
            Counterfeit Awareness
          </span>
          <h1 className="font-normal text-white mt-3 leading-[1.1] [font-family:var(--font-display)] text-[clamp(3.6rem,6vw,6rem)]">
            Report a Counterfeit
          </h1>
          <p className="mt-4 text-[1.6rem] leading-[1.5] text-[hsla(0,0%,65%,1)]">
            Help us protect our customers. All reports are treated in strict
            confidence and acted upon swiftly.
          </p>
        </div>

        {/* Card */}
        <div className="relative overflow-hidden px-[45px] py-[50px] max-lg:px-[22px] max-lg:py-[35px] max-sm:px-[16px] max-sm:py-[28px] bg-[hsla(40,12%,5%,1)]">
          {/* Corner accents */}
          <span className="absolute top-0 right-0 w-[120px] h-[120px] opacity-40 pointer-events-none border-t-2 border-r-2 border-[hsl(38,61%,73%)]" />
          <span className="absolute bottom-0 left-0 w-[120px] h-[120px] opacity-40 pointer-events-none border-b-2 border-l-2 border-[hsl(38,61%,73%)]" />

          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate>
              {/* ── Your Details ── */}
              <p className="text-[hsl(38,61%,73%)] font-bold uppercase tracking-[3px] text-[1.2rem] mb-5">
                Your Details
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                <InputField
                  label="Your Name"
                  name="reporterName"
                  type="text"
                  placeholder="Full name…"
                  hint="Optional"
                  value={form.reporterName}
                  onChange={handleChange}
                />
                <InputField
                  label="Your Email"
                  name="reporterEmail"
                  type="email"
                  placeholder="email@example.com"
                  required
                  value={form.reporterEmail}
                  onChange={handleChange}
                  error={errors.reporterEmail}
                />
              </div>

              <div className="w-full h-px my-7 opacity-20 bg-[hsl(38,61%,73%)]" />

              {/* ── Product Details ── */}
              <p className="text-[hsl(38,61%,73%)] font-bold uppercase tracking-[3px] text-[1.2rem] mb-5">
                Product Details
              </p>

              <InputField
                label="Product Name / Fragrance"
                name="productName"
                type="text"
                placeholder="e.g. Oud Al Layl 100ml…"
                required
                value={form.productName}
                onChange={handleChange}
                error={errors.productName}
              />

              <SelectField
                label="Product Type"
                options={PRODUCT_TYPES}
                value={form.productType}
                onChange={(v) => {
                  setForm((prev) => ({ ...prev, productType: v }));
                  setErrors((prev) => ({ ...prev, productType: false }));
                }}
                placeholder="Select a product type…"
              />

              <div className="w-full h-px my-7 opacity-20 bg-[hsl(38,61%,73%)]" />

              {/* ── Purchase Details ── */}
              <p className="text-[hsl(38,61%,73%)] font-bold uppercase tracking-[3px] text-[1.2rem] mb-5">
                Purchase Details
              </p>

              <SelectField
                label="Where Was It Purchased?"
                required
                error={errors.purchaseChannel}
                options={PURCHASE_CHANNELS}
                value={form.purchaseChannel}
                onChange={(v) => {
                  setForm((prev) => ({ ...prev, purchaseChannel: v }));
                  setErrors((prev) => ({ ...prev, purchaseChannel: false }));
                }}
                placeholder="Select a channel…"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                <InputField
                  label="Seller / Store Name"
                  name="sellerName"
                  type="text"
                  placeholder="Seller or shop name…"
                  value={form.sellerName}
                  onChange={handleChange}
                />
                <InputField
                  label="Seller URL"
                  name="sellerUrl"
                  type="url"
                  placeholder="https://…"
                  value={form.sellerUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                <InputField
                  label="Date of Purchase"
                  name="purchaseDate"
                  type="date"
                  value={form.purchaseDate}
                  onChange={handleChange}
                />
                <InputField
                  label="Price Paid"
                  name="purchasePrice"
                  type="text"
                  placeholder="e.g. $24.99"
                  value={form.purchasePrice}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full h-px my-7 opacity-20 bg-[hsl(38,61%,73%)]" />

              {/* ── Description ── */}
              <TextareaField
                label="Describe the Issue"
                name="description"
                placeholder="Describe what made you suspect this product is counterfeit — packaging, scent, seal, seller behaviour, etc…"
                required
                error={errors.description}
                value={form.description}
                onChange={handleChange}
                heightClass="h-[220px]"
              />

              <div className="w-full h-px my-7 opacity-20 bg-[hsl(38,61%,73%)]" />

              {/* ── Evidence ── */}
              <FileUploadField
                label="Attach a Photo"
                hint="Optional"
                value={form.imageFile}
                onChange={(file) =>
                  setForm((prev) => ({ ...prev, imageFile: file }))
                }
              />

              <SubmitButton loading={loading} />

              {submitError && (
                <p className="mt-4 text-center text-[1.3rem] text-[hsl(0,70%,60%)]">
                  Something went wrong. Please try again.
                </p>
              )}

              {Object.keys(errors).length > 0 && (
                <p className="mt-4 text-center text-[1.3rem] text-[hsl(0,70%,60%)]">
                  Please fill in all required fields.
                </p>
              )}
            </form>
          ) : (
            <div className="text-center py-10">
              <div className="w-[70px] h-[70px] rounded-full grid place-items-center mx-auto mb-6 border-2 border-[hsl(38,61%,73%)]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="hsl(38,61%,73%)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="mb-3 font-normal leading-[1.4] [font-family:var(--font-display)] text-[clamp(2.4rem,3.5vw,3.6rem)] text-white">
                Report Received
              </h2>
              <p className="text-[1.65rem] mb-2 text-[hsla(0,0%,65%,1)]">
                Thank you for helping us protect our customers.
              </p>
              <p className="text-[1.5rem] mb-8 text-[hsla(0,0%,50%,1)]">
                Our team will review your report and follow up if needed.
              </p>
              <Link
                href="/counterfeit-awareness"
                className="group relative inline-flex items-center gap-3 px-10 py-4 border overflow-hidden text-[1.2rem] font-bold uppercase tracking-[0.3em] border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] [font-family:var(--font-display)] transition-colors duration-300 hover:text-[hsla(40,12%,5%,1)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
                <span className="relative z-10">Back to Awareness Page</span>
                <span className="relative z-10">→</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
