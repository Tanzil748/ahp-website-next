"use client";

import { useState } from "react";
import {
  gold,
  eerieBlack2,
  smokyBlack2,
  quickSilver,
  whiteAlpha10,
  CheckIcon,
} from "../app/contact-us/components/contactUtils";

// ─── Input field ──────────────────────────────────────────────────────────────
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
      <label
        className="block uppercase font-bold mb-1.5 text-[1.4rem] max-sm:text-[1.2rem] tracking-[3px]"
        style={{ color: quickSilver }}
      >
        {label} {required && <span style={{ color: gold }}>*</span>}
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
        className="w-full h-[56px] max-sm:h-[48px] px-5 text-white outline-none transition-colors duration-500 text-[1.6rem] max-sm:text-[1.4rem]"
        style={{
          backgroundColor: eerieBlack2,
          border: `1px solid ${error ? "hsl(0,70%,60%)" : focused ? gold : whiteAlpha10}`,
          fontFamily: "var(--font-dm-sans)",
        }}
      />
    </div>
  );
}

// ─── Textarea field ───────────────────────────────────────────────────────────
function TextareaField({
  label,
  required,
  error,
  ...props
}: {
  label: string;
  required?: boolean;
  error?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="mb-5">
      <label
        className="block uppercase font-bold mb-1.5 text-[1.4rem] max-sm:text-[1.2rem] tracking-[3px]"
        style={{ color: quickSilver }}
      >
        {label} {required && <span style={{ color: gold }}>*</span>}
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
        className="w-full px-5 py-5 text-white outline-none resize-none transition-colors duration-500 text-[1.6rem] max-sm:text-[1.4rem] h-[160px] max-sm:h-[130px] leading-[1.6]"
        style={{
          backgroundColor: eerieBlack2,
          border: `1px solid ${error ? "hsl(0,70%,60%)" : focused ? gold : whiteAlpha10}`,
          fontFamily: "var(--font-dm-sans)",
        }}
      />
    </div>
  );
}

// ─── Submit button ────────────────────────────────────────────────────────────
function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <>
      <style>{`
        .submit-btn {
          position: relative;
          width: 100%;
          margin-top: 10px;
          height: 56px;
          padding: 0 48px;
          overflow: hidden;
          cursor: pointer;
          background: transparent;
          border: 2px solid hsl(38,61%,73%);
          font-family: var(--font-dm-sans);
          font-weight: 700;
          font-size: 1.2rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: hsl(38,61%,73%);
          transition: color 0.35s ease;
        }
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: hsl(38,61%,73%);
          transform: translateY(100%);
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }
        .submit-btn:not(:disabled):hover::before { transform: translateY(0); }
        .submit-btn:not(:disabled):hover { color: hsla(40,12%,5%,1); }
        .submit-btn span { position: relative; z-index: 1; }
      `}</style>
      <button type="submit" className="submit-btn" disabled={loading}>
        <span>{loading ? "Sending…" : "Send Message"}</span>
      </button>
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(false);

    // Validation
    const newErrors: Record<string, boolean> = {};
    if (!form.firstName.trim()) newErrors.firstName = true;
    if (!form.lastName.trim()) newErrors.lastName = true;
    if (!form.message.trim()) newErrors.message = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      setSendError(true);
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="fade-up delay-3">
      <div
        className="relative overflow-hidden px-[45px] py-[50px] max-lg:px-[22px] max-lg:py-[35px] max-sm:px-[16px] max-sm:py-[28px]"
        style={{ backgroundColor: smokyBlack2 }}
      >
        {/* Top-right corner accent */}
        <span
          className="absolute top-0 right-0 w-[120px] h-[120px] opacity-40 pointer-events-none"
          style={{
            borderTop: `2px solid ${gold}`,
            borderRight: `2px solid ${gold}`,
          }}
        />
        {/* Bottom-left corner accent */}
        <span
          className="absolute bottom-0 left-0 w-[120px] h-[120px] opacity-40 pointer-events-none"
          style={{
            borderBottom: `2px solid ${gold}`,
            borderLeft: `2px solid ${gold}`,
          }}
        />

        {!submitted ? (
          <>
            <h2
              className="mb-2 font-normal leading-[1.4]"
              style={{
                fontFamily: "var(--font-forum)",
                fontSize: "clamp(2.4rem, 3.5vw, 3.6rem)",
                fontWeight: 400,
              }}
            >
              Send Us a Message
            </h2>
            <p
              className="mb-9 text-[1.55rem] leading-[1.5]"
              style={{ color: quickSilver }}
            >
              Fill out the form below and a member of our team will be in touch
              within 24 hours.
            </p>

            <form onSubmit={handleSubmit} noValidate>
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
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <InputField
                label="Company / Business Name"
                name="company"
                type="text"
                placeholder="Your Company Ltd."
                value={form.company}
                onChange={handleChange}
              />

              <TextareaField
                label="Message"
                name="message"
                placeholder="Tell us how we can help…"
                required
                value={form.message}
                onChange={handleChange}
                error={errors.message}
              />

              <SubmitButton loading={loading} />

              {sendError && (
                <p
                  className="mt-4 text-center text-[1.3rem]"
                  style={{ color: "hsl(0,70%,60%)" }}
                >
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </>
        ) : (
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
              Message Sent!
            </h2>
            <p className="text-[1.65rem]" style={{ color: quickSilver }}>
              Thank you for reaching out. We&apos;ll be in touch with you
              shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
