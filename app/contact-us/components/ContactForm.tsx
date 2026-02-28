"use client";

import { useState } from "react";
import {
  gold,
  eerieBlack2,
  smokyBlack1,
  smokyBlack2,
  quickSilver,
  whiteAlpha10,
  CheckIcon,
} from "./contactUtils";

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
        className="block uppercase font-bold mb-1.5"
        style={{ fontSize: "1.4rem", letterSpacing: "3px", color: quickSilver }}
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
        className="w-full h-[56px] px-5 text-white outline-none transition-colors duration-500"
        style={{
          backgroundColor: eerieBlack2,
          border: `1px solid ${error ? "hsl(0,70%,60%)" : focused ? gold : whiteAlpha10}`,
          fontSize: "1.6rem",
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
        className="block uppercase font-bold mb-1.5"
        style={{ fontSize: "1.4rem", letterSpacing: "3px", color: quickSilver }}
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
        className="w-full px-5 py-5 text-white outline-none resize-none transition-colors duration-500"
        style={{
          backgroundColor: eerieBlack2,
          border: `1px solid ${error ? "hsl(0,70%,60%)" : focused ? gold : whiteAlpha10}`,
          fontSize: "1.6rem",
          fontFamily: "var(--font-dm-sans)",
          lineHeight: 1.6,
          height: 160,
        }}
      />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        .contact-btn {
          position: relative;
          color: ${gold};
          font-size: 1.2rem;
          font-weight: 700;
          font-family: var(--font-dm-sans);
          text-transform: uppercase;
          letter-spacing: 3px;
          border: 2px solid ${gold};
          padding: 16px 48px;
          overflow: hidden;
          z-index: 1;
          cursor: pointer;
          background: transparent;
          width: 100%;
          margin-top: 10px;
          transition: color 250ms ease;
        }
        .contact-btn::before {
          content: "";
          position: absolute;
          bottom: 100%; left: 50%;
          transform: translateX(-50%);
          width: 200%; height: 200%;
          border-radius: 50%;
          background-color: ${gold};
          transition: 500ms ease;
          z-index: -1;
        }
        .contact-btn:hover::before { bottom: -50%; }
        .contact-btn .t1 { display: block; transition: 250ms ease; }
        .contact-btn .t2 {
          position: absolute;
          top: 100%; left: 50%;
          transform: translateX(-50%);
          min-width: max-content;
          color: ${smokyBlack1};
          display: block;
          transition: 250ms ease;
        }
        .contact-btn:hover .t1 { transform: translateY(-40px); }
        .contact-btn:hover .t2 { top: 50%; transform: translate(-50%, -50%); }

        .form-card {
          position: relative;
          overflow: hidden;
          background-color: ${smokyBlack2};
          padding: 50px 45px;
        }
        .form-card::before {
          content: "";
          position: absolute; top: 0; right: 0;
          width: 120px; height: 120px;
          border-top: 2px solid ${gold};
          border-right: 2px solid ${gold};
          opacity: 0.4;
        }
        .form-card::after {
          content: "";
          position: absolute; bottom: 0; left: 0;
          width: 120px; height: 120px;
          border-bottom: 2px solid ${gold};
          border-left: 2px solid ${gold};
          opacity: 0.4;
        }
        input::placeholder, textarea::placeholder { color: ${quickSilver}; }
        @media (max-width: 992px) {
          .form-row  { grid-template-columns: 1fr !important; }
          .form-card { padding: 35px 22px !important; }
        }
      `}</style>

      <div className="fade-up delay-3">
        <div className="form-card">
          {!submitted ? (
            <>
              <h2
                className="mb-2"
                style={{
                  fontFamily: "var(--font-forum)",
                  fontSize: "clamp(2.4rem, 3.5vw, 3.6rem)",
                  lineHeight: 1.4,
                  fontWeight: 400,
                }}
              >
                Send Us a Message
              </h2>
              <p
                className="mb-9"
                style={{
                  color: quickSilver,
                  fontSize: "1.55rem",
                  lineHeight: 1.5,
                }}
              >
                Fill out the form below and a member of our team will be in
                touch within 24 hours.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                {/* Row 1 — Name */}
                <div
                  className="form-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0 20px",
                  }}
                >
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

                {/* Row 2 — Contact */}
                <div
                  className="form-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0 20px",
                  }}
                >
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

                {/* Company */}
                <InputField
                  label="Company / Business Name"
                  name="company"
                  type="text"
                  placeholder="Your Company Ltd."
                  value={form.company}
                  onChange={handleChange}
                />

                {/* Message */}
                <TextareaField
                  label="Message"
                  name="message"
                  placeholder="Tell us how we can help…"
                  required
                  value={form.message}
                  onChange={handleChange}
                  error={errors.message}
                />

                <button type="submit" className="contact-btn">
                  <span className="t1">Send Message</span>
                  <span className="t2">Send Message</span>
                </button>
              </form>
            </>
          ) : (
            /* Success state */
            <div className="text-center py-10">
              <div
                className="w-[70px] h-[70px] rounded-full grid place-items-center mx-auto mb-6"
                style={{ border: `2px solid ${gold}` }}
              >
                <CheckIcon />
              </div>
              <h2
                className="mb-3"
                style={{
                  fontFamily: "var(--font-forum)",
                  fontSize: "clamp(2.4rem, 3.5vw, 3.6rem)",
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                Message Sent!
              </h2>
              <p style={{ color: quickSilver, fontSize: "1.65rem" }}>
                Thank you for reaching out. We&apos;ll be in touch with you
                shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
