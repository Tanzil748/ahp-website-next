"use client";

import { useState } from "react";

// ── Theme tokens ──────────────────────────────────────────────────────────────
const gold = "hsl(38, 61%, 73%)";
const eerieBlack1 = "hsla(210, 4%, 9%, 1)";
const eerieBlack2 = "hsla(210, 4%, 11%, 1)";
const smokyBlack1 = "hsla(40, 12%, 5%, 1)";
const smokyBlack2 = "hsla(30, 8%, 5%, 1)";
const quickSilver = "hsla(0, 0%, 65%, 1)";
const whiteAlpha10 = "hsla(0, 0%, 100%, 0.1)";

// ── Sub-components ────────────────────────────────────────────────────────────

function OrnamentalSep({ align = "left" }: { align?: "left" | "center" }) {
  return (
    <svg
      viewBox="0 0 100 12"
      width="100"
      height="12"
      style={{
        display: "block",
        margin: align === "center" ? "5px auto 0" : "5px 0 0",
      }}
    >
      <line x1="0" y1="6" x2="38" y2="6" stroke={gold} strokeWidth="1" />
      <rect
        x="44"
        y="2"
        width="8"
        height="8"
        transform="rotate(45 48 6)"
        fill="none"
        stroke={gold}
        strokeWidth="1"
      />
      <line x1="58" y1="6" x2="100" y2="6" stroke={gold} strokeWidth="1" />
    </svg>
  );
}

function DiamondSep() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        border: `1px solid ${gold}`,
        transform: "rotate(45deg)",
        flexShrink: 0,
      }}
    />
  );
}

// ── SVG icons ─────────────────────────────────────────────────────────────────
const LocationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke={gold}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke={gold}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 11.5 19.8 19.8 0 011 2.93 2 2 0 012.96 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke={gold}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="32"
    height="32"
    fill="none"
    stroke={gold}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Info card ─────────────────────────────────────────────────────────────────
function InfoCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex items-start gap-[18px] mb-9"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Diamond icon box */}
      <div
        className="flex-shrink-0 w-[52px] h-[52px] grid place-items-center transition-colors duration-300"
        style={{
          border: `1px solid ${gold}`,
          transform: "rotate(45deg)",
          backgroundColor: hovered ? gold : "transparent",
        }}
      >
        <div style={{ transform: "rotate(-45deg)" }}>
          {hovered
            ? (() => {
                // Re-render icon with dark stroke when hovered
                const El = icon as React.FC<{ stroke?: string }>;
                return <El stroke={smokyBlack1} />;
              })()
            : icon}
        </div>
      </div>

      <div>
        <p
          className="uppercase font-bold mb-1"
          style={{
            fontSize: "1.4rem",
            letterSpacing: "0.15em",
            color: gold,
          }}
        >
          {label}
        </p>
        <div
          style={{ fontSize: "1.5rem", color: quickSilver, lineHeight: 1.6 }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

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
          fontFamily: "'DM Sans', sans-serif",
        }}
        placeholder={props.placeholder}
      />
    </div>
  );
}

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
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.6,
          height: 160,
        }}
        placeholder={props.placeholder}
      />
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ContactPage() {
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
  const [btnHovered, setBtnHovered] = useState(false);

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
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Forum&display=swap');

        /* ── btn hover animation (matching site's .btn) ── */
        .contact-btn {
          position: relative;
          color: ${gold};
          font-size: 1.2rem;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
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

        /* ── hero bg ── */
        .contact-hero {
          position: relative;
          padding: 160px 0 100px;
          text-align: center;
          overflow: hidden;
          z-index: 1;
        }
        .contact-hero::before {
          content: "";
          position: absolute; inset: 0; z-index: -1;
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, hsla(38,61%,50%,0.12) 0%, transparent 70%),
            ${eerieBlack1};
        }
        .contact-hero::after {
          content: "";
          position: absolute; inset: 0; z-index: -1;
          background-image:
            linear-gradient(hsla(0,0%,100%,0.04) 1px, transparent 1px),
            linear-gradient(90deg, hsla(0,0%,100%,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        /* ── form corner accents ── */
        .form-card {
          position: relative;
          overflow: hidden;
          background-color: ${smokyBlack2};
          padding: 50px 45px;
        }
        .form-card::before {
          content: "";
          position: absolute;
          top: 0; right: 0;
          width: 120px; height: 120px;
          border-top: 2px solid ${gold};
          border-right: 2px solid ${gold};
          opacity: 0.4;
        }
        .form-card::after {
          content: "";
          position: absolute;
          bottom: 0; left: 0;
          width: 120px; height: 120px;
          border-bottom: 2px solid ${gold};
          border-left: 2px solid ${gold};
          opacity: 0.4;
        }

        /* ── fade-up animations ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up   { animation: fadeUp 0.8s ease forwards; }
        .delay-1   { animation-delay: 0.1s; opacity: 0; }
        .delay-2   { animation-delay: 0.3s; opacity: 0; }
        .delay-3   { animation-delay: 0.5s; opacity: 0; }

        /* ── input placeholder color ── */
        input::placeholder, textarea::placeholder { color: ${quickSilver}; }

        @media (max-width: 992px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 50px !important; }
          .form-row     { grid-template-columns: 1fr !important; }
          .form-card    { padding: 35px 22px !important; }
        }
      `}</style>

      <div
        style={{
          backgroundColor: eerieBlack1,
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
          minHeight: "100vh",
        }}
      >
        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="contact-hero">
          <div className="max-w-[1200px] mx-auto px-4">
            {/* Ornament row */}
            <div className="fade-up delay-1 flex justify-center items-center gap-3 mb-3">
              <DiamondSep />
              <span
                className="uppercase font-bold"
                style={{
                  color: gold,
                  fontSize: "1.4rem",
                  letterSpacing: "0.4em",
                }}
              >
                Get in Touch
              </span>
              <DiamondSep />
            </div>

            <h1
              className="fade-up delay-2 mb-5"
              style={{
                fontFamily: "'Forum', cursive",
                fontSize: "clamp(3.2rem, 6vw, 6rem)",
                lineHeight: 1.2,
                fontWeight: 400,
              }}
            >
              We&apos;d Love to
              <br />
              Hear From You
            </h1>

            <p
              className="fade-up delay-3 mx-auto"
              style={{
                color: quickSilver,
                fontSize: "1.7rem",
                lineHeight: 1.5,
                maxWidth: 520,
              }}
            >
              Whether you have a question, a reservation request, or simply want
              to say hello — our team is always happy to connect.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CONTACT SECTION
        ══════════════════════════════════════ */}
        <section style={{ paddingBlock: 80 }}>
          <div className="max-w-[1200px] mx-auto px-4">
            <div
              className="contact-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.6fr",
                gap: 60,
                alignItems: "start",
              }}
            >
              {/* ── INFO SIDE ── */}
              <div className="fade-up delay-2">
                {/* Subtitle */}
                <div style={{ marginBottom: 12 }}>
                  <span
                    className="uppercase font-bold"
                    style={{
                      color: gold,
                      fontSize: "1.4rem",
                      letterSpacing: "0.4em",
                    }}
                  >
                    Find Us
                  </span>
                  <OrnamentalSep align="left" />
                </div>

                <h2
                  className="mb-5"
                  style={{
                    fontFamily: "'Forum', cursive",
                    fontSize: "clamp(2.4rem, 3.5vw, 3.6rem)",
                    lineHeight: 1.4,
                    fontWeight: 400,
                  }}
                >
                  Contact
                  <br />
                  Information
                </h2>

                <p
                  className="mb-[50px]"
                  style={{
                    color: quickSilver,
                    fontSize: "1.65rem",
                    lineHeight: 1.5,
                  }}
                >
                  We are open five days a week and eager to accommodate your
                  needs. Reach us through any of the channels below.
                </p>

                {/* Info cards */}
                <InfoCard icon={<LocationIcon />} label="Our Location">
                  <p>201 Christopher St</p>
                  <p>Ronkonkoma, NY 11779</p>
                </InfoCard>

                <InfoCard icon={<PhoneIcon />} label="Phone">
                  <p>+1 (516) 907-2340</p>
                  <p>+1 (516) 907-7010</p>
                </InfoCard>

                <InfoCard icon={<EmailIcon />} label="Email">
                  <p>sales@alhusseinperfumes.com</p>
                </InfoCard>

                {/* Gold divider */}
                <div
                  className="my-[50px]"
                  style={{
                    width: "100%",
                    height: 1,
                    background: `linear-gradient(to right, ${gold}, transparent)`,
                    opacity: 0.4,
                  }}
                />

                {/* Hours */}
                <h3
                  className="mb-4"
                  style={{
                    fontFamily: "'Forum', cursive",
                    fontSize: "2.2rem",
                    fontWeight: 400,
                  }}
                >
                  Opening Hours
                </h3>
                <ul className="flex flex-col gap-3">
                  {[
                    { day: "Monday – Friday", time: "9:00 AM – 5:00 PM" },
                    { day: "Saturday", time: "Closed" },
                    { day: "Sunday", time: "Closed" },
                  ].map(({ day, time }) => (
                    <li
                      key={day}
                      className="flex justify-between items-center pb-3"
                      style={{
                        fontSize: "1.5rem",
                        borderBottom: `1px solid ${whiteAlpha10}`,
                      }}
                    >
                      <span className="font-bold text-white">{day}</span>
                      <span style={{ color: gold }}>{time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── FORM SIDE ── */}
              <div className="fade-up delay-3">
                <div className="form-card">
                  {!submitted ? (
                    <>
                      <h2
                        className="mb-2"
                        style={{
                          fontFamily: "'Forum', cursive",
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
                        Fill out the form below and a member of our team will be
                        in touch within 24 hours.
                      </p>

                      <form onSubmit={handleSubmit} noValidate>
                        {/* Row 1 */}
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

                        {/* Row 2 */}
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
                    /* ── SUCCESS STATE ── */
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
                          fontFamily: "'Forum', cursive",
                          fontSize: "clamp(2.4rem, 3.5vw, 3.6rem)",
                          fontWeight: 400,
                          lineHeight: 1.4,
                        }}
                      >
                        Message Sent!
                      </h2>
                      <p style={{ color: quickSilver, fontSize: "1.65rem" }}>
                        Thank you for reaching out. We'll be in touch with you
                        shortly.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
