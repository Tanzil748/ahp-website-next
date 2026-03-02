"use client";

import { useState } from "react";

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

function OrnamentalSep() {
  return (
    <svg
      viewBox="0 0 100 12"
      width="100"
      height="12"
      className="block mx-auto mt-[5px]"
    >
      <line x1="0" y1="6" x2="38" y2="6" stroke="var(--gold)" strokeWidth="1" />
      <rect
        x="44"
        y="2"
        width="8"
        height="8"
        transform="rotate(45 48 6)"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1"
      />
      <line
        x1="58"
        y1="6"
        x2="100"
        y2="6"
        stroke="var(--gold)"
        strokeWidth="1"
      />
    </svg>
  );
}

const SOCIALS: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/alhusseinperfume/",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/alhusseinperfumes/",
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com/al_hussein_perf",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/ahusseinperfumes",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@alhusseinperfumes",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.77a4.85 4.85 0 0 1-1.02-.08z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@AlHusseinPerfumes",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/al-hussein-471a63393/",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Snapchat",
    href: "https://www.snapchat.com/add/husseinperfumes",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.317 4.928-.107 2.019-.208 3.878-.208 3.878s.216.143.5.143c.382 0 .927-.188 1.385-.667.005-.006.012-.008.018-.013l.013-.013c.205-.144.466-.239.758-.239.285 0 .548.085.749.227.012.009.022.018.034.027.346.239.56.623.56 1.054 0 .841-.68 1.389-1.61 1.707a9.09 9.09 0 0 1-.51.157c-.39.1-.83.251-.83.661 0 .123.063.26.189.384.13.126.245.222.406.325.367.231.711.483.873.672.5.582.604 1.193.357 1.724-.355.771-1.23 1.214-2.408 1.214-.142 0-.291-.011-.451-.034-.248-.034-.492-.07-.727-.07-.337 0-.572.062-.809.169-.365.169-.712.445-1.18.693-.534.285-1.113.422-1.724.422-.585 0-1.147-.13-1.667-.397-.462-.24-.81-.518-1.178-.694-.24-.108-.473-.17-.81-.17-.235 0-.479.036-.727.07-.16.023-.309.034-.451.034-1.178 0-2.053-.443-2.408-1.214-.247-.531-.143-1.142.357-1.724.162-.189.506-.441.873-.672.161-.103.276-.199.406-.325.126-.124.189-.261.189-.384 0-.41-.44-.561-.83-.661a9.09 9.09 0 0 1-.51-.157C3.68 13.889 3 13.341 3 12.5c0-.431.214-.815.56-1.054.012-.009.022-.018.034-.027.201-.142.464-.227.749-.227.292 0 .553.095.758.239l.013.013c.006.005.013.007.018.013.458.479 1.003.667 1.385.667.284 0 .5-.143.5-.143S6.916 9.981 6.809 7.962c-.086-1.709-.212-3.735.317-4.928C8.709 1.069 12.066.793 12.206.793z" />
      </svg>
    ),
  },
];

export default function SubscribeSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden text-center py-[100px] px-10 bg-[var(--bg-dark)]">
      {/* Top border line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-[linear-gradient(to_right,transparent,var(--gold-border),transparent)]" />
      {/* Bottom border line */}
      <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-[linear-gradient(to_right,transparent,var(--gold-border),transparent)]" />

      {/* Ghost background word */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none leading-none text-[var(--gold)] opacity-[0.03] tracking-[0.1em]"
        style={{ fontSize: "clamp(8rem, 18vw, 18rem)" }}
      >
        Subscribe
      </span>

      {/* Content */}
      <div className="relative z-10 max-w-[760px] mx-auto">
        {/* Eyebrow */}
        <div className="mb-1">
          <span className="font-bold uppercase tracking-[0.4em] text-[2.2rem] text-[var(--gold)] [font-family:var(--font-display)]">
            Stay Updated
          </span>
          <OrnamentalSep />
        </div>

        {/* Headline */}
        <h2
          className="text-white leading-[1.15] mt-[18px] mb-4 tracking-[0.01em] font-normal [font-family:var(--font-display)]"
          style={{ fontSize: "clamp(3.2rem, 5vw, 5rem)" }}
        >
          Be the First to{" "}
          <em className="not-italic text-[var(--gold)]">Know &amp; Discover</em>
        </h2>

        {/* Copy */}
        <p className="text-[1.6rem] leading-[1.8] mb-10 max-w-[520px] mx-auto text-[hsla(0,0%,60%,1)]">
          Join our mailing list for exclusive wholesale offers, new brand
          arrivals, and fragrance industry news — delivered straight to your
          inbox.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="subscribe-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email address"
            className="subscribe-input text-[1.1rem] sm:text-[1.5rem] px-3 sm:px-5"
          />
          <button
            type="submit"
            className="subscribe-btn text-[0.85rem] sm:text-[1.15rem] tracking-[0.15em] sm:tracking-[0.2em] px-4 sm:px-8"
          >
            Subscribe
          </button>
        </form>

        {/* Follow Us divider */}
        <div className="flex items-center gap-4 max-w-[400px] mx-auto mb-7">
          <div className="flex-1 h-px bg-[hsla(38,61%,73%,0.15)]" />
          <span className="text-[1.1rem] uppercase tracking-[0.2em] whitespace-nowrap text-[hsla(0,0%,40%,1)]">
            Follow Us
          </span>
          <div className="flex-1 h-px bg-[hsla(38,61%,73%,0.15)]" />
        </div>

        {/* Social icons */}
        <div className="flex justify-center items-center flex-wrap gap-[10px]">
          {SOCIALS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Privacy note */}
        <p className="mt-6 text-[1.2rem] tracking-[0.03em] text-[hsla(0,0%,35%,1)]">
          No spam, ever. Unsubscribe at any time.{" "}
          <a
            href="/terms-condition"
            className="no-underline hover:underline text-[hsla(38,61%,73%,0.6)]"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </section>
  );
}
