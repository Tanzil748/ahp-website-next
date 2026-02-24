"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Compare List", href: "/compare-list" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  // .header.active + .header.hide scroll logic
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsActive(y > 50);
      setIsHidden(y > lastScrollY.current && y > 100);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // body.nav-active
  useEffect(() => {
    document.body.classList.toggle("nav-active", menuOpen);
    return () => document.body.classList.remove("nav-active");
  }, [menuOpen]);

  return (
    <>
      <style>{`
        /* ── Google Fonts — same as your original <link> tags ── */
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Forum&display=swap');

        /* ── All CSS variables from index.css :root ── */
        :root {
          --gold-crayola:      hsl(38, 61%, 73%);
          --quick-silver:      hsla(0, 0%, 65%, 1);
          --smoky-black-1:     hsla(40, 12%, 5%, 1);
          --eerie-black-4:     hsla(0, 0%, 13%, 1);
          --white:             hsla(0, 0%, 100%, 1);
          --white-alpha-20:    hsla(0, 0%, 100%, 0.2);
          --white-alpha-10:    hsla(0, 0%, 100%, 0.1);
          --black-alpha-80:    hsla(0, 0%, 0%, 0.8);
          --black-alpha-15:    hsla(0, 0%, 0%, 0.15);
          --radius-circle:     50%;
          --transition-1:      250ms ease;
          --transition-2:      500ms ease;
          --fontSize-label-1:  1.4rem;
          --fontSize-label-2:  1.2rem;
          --weight-bold:       700;
          --letterSpacing-1:   0.15em;
          --fontFamily-forum:   "Forum", cursive;
          --fontFamily-dm_sans: "DM Sans", sans-serif;
        }

        /* ── Apply fonts to the header/topbar elements ── */
        .topbar,
        .topbar-item,
        .topbar-item .span,
        .nav-open-btn,
        .navbar,
        .navbar-link,
        .navbar-link .span,
        .navbar-title,
        .navbar-text,
        .sidebar-link,
        .contact-label {
          font-family: var(--fontFamily-dm_sans);
        }

        /* ── html base font-size from index.css (makes 1rem = 10px
           so 1.2rem = 12px, 1.4rem = 14px etc.)                    ── */
        html { font-size: 10px; }

        /* ── .separator (reused style from index.css line 236) ── */
        .separator {
          width: 8px;
          height: 8px;
          border: 1px solid var(--gold-crayola);
          transform: rotate(45deg);
        }

        /* ── .hover-underline (index.css line 250) ── */
        .hover-underline {
          position: relative;
          max-width: max-content;
        }
        .hover-underline::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 5px;
          border-top: 1px solid var(--gold-crayola);
          border-bottom: 1px solid var(--gold-crayola);
          transform: scaleX(0.2);
          opacity: 0;
          transition: var(--transition-2);
        }
        .hover-underline:is(:hover, :focus-visible)::after {
          transform: scaleX(1);
          opacity: 1;
        }

        /* ── #TOPBAR ── */
        /* Mobile: display none */
        .topbar {
          display: none;
        }
        /* 575px+: fixed topbar shown, only .link items visible */
        @media (min-width: 575px) {
          .topbar {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            padding-block: 10px;
            border-bottom: 1px solid var(--white-alpha-20);
            z-index: 4;
            transition: var(--transition-1);
          }
          /* Hides topbar when header becomes active (scrolled) */
          .topbar.header-active {
            transform: translateY(-100%);
          }
          /* non-link items (address, hours) hidden at 575px */
          .topbar-item:not(.link),
          .topbar .separator {
            display: none;
          }
          .topbar .container,
          .topbar-item {
            display: flex;
            align-items: center;
          }
          .topbar .container {
            justify-content: center;
            gap: 30px;
          }
          .topbar-item {
            gap: 6px;
          }
          .topbar-item .span {
            font-size: var(--fontSize-label-1);
          }
          .topbar .link {
            transition: var(--transition-1);
          }
          .topbar .link:is(:hover, :focus-visible) {
            color: var(--gold-crayola);
          }
        }
        /* 992px+: non-link items shown, separator shown */
        @media (min-width: 992px) {
          .topbar-item:not(.link) {
            display: flex;
          }
          .topbar .item-2 {
            margin-inline-end: auto;
          }
        }
        /* 1200px+: separator shown */
        @media (min-width: 1200px) {
          .topbar .container {
            max-width: unset;
          }
          .topbar .separator {
            display: block;
          }
        }

        /* ── #HEADER ── */
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background-color: transparent;
          z-index: 4;
          border-bottom: 1px solid transparent;
          transition: var(--transition-1);
        }
        /* at 575px header sits below topbar */
        @media (min-width: 575px) {
          .header {
            top: 51px;
          }
          .header.active {
            top: 0;
          }
        }
        .header.active {
          padding-block: 20px;
          background-color: var(--eerie-black-4);
          border-color: var(--black-alpha-15);
        }
        .header.hide {
          transform: translateY(-100%);
          transition-delay: 250ms;
        }
        .header .container {
          padding-inline: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }

        /* ── hamburger button ── */
        .nav-open-btn {
          padding: 12px;
          padding-inline-end: 0;
          background: none;
          border: none;
          cursor: pointer;
        }
        .nav-open-btn .line {
          width: 30px;
          height: 2px;
          background-color: var(--white);
          margin-block: 4px;
          transform-origin: left;
          animation: menuBtn 400ms ease-in-out alternate infinite;
          display: block;
        }
        @keyframes menuBtn {
          0%   { transform: scaleX(1);   }
          100% { transform: scaleX(0.5); }
        }
        .nav-open-btn .line-2 { animation-delay: 150ms; }
        .nav-open-btn .line-3 { animation-delay: 300ms; }

        /* ── overlay ── */
        .overlay {
          position: fixed;
          top: 0; left: 0; bottom: 0; right: 0;
          background-color: var(--black-alpha-80);
          opacity: 0;
          pointer-events: none;
          transition: var(--transition-2);
          z-index: 1;
        }
        .overlay.active {
          opacity: 1;
          pointer-events: all;
        }

        /* ── navbar sidebar ── */
        .navbar {
          position: fixed;
          background-color: var(--smoky-black-1);
          top: 0;
          left: -360px;
          bottom: 0;
          max-width: 360px;
          width: 100%;
          padding-inline: 30px;
          padding-block-end: 50px;
          overflow-y: auto;
          visibility: hidden;
          z-index: 2;
          transition: var(--transition-2);
        }
        .navbar.active {
          visibility: visible;
          transform: translateX(360px);
        }
        .navbar::-webkit-scrollbar-thumb {
          background-color: var(--white-alpha-10);
        }

        /* close button */
        .navbar .close-btn {
          color: var(--white);
          border: 1px solid currentColor;
          padding: 4px;
          border-radius: var(--radius-circle);
          margin-inline-start: auto;
          margin-block: 30px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          cursor: pointer;
          transition: var(--transition-1);
        }
        .navbar .close-btn:is(:hover, :focus-visible) {
          color: var(--gold-crayola);
        }

        /* logo in sidebar */
        .navbar .logo {
          max-width: max-content;
          margin-inline: auto;
          margin-block-end: 60px;
          display: block;
        }

        /* nav list */
        .navbar-list {
          border-bottom: 1px solid var(--white-alpha-20);
          margin-block-end: 100px;
          list-style: none;
          padding: 0;
          margin-top: 0;
        }
        .navbar-item {
          border-top: 1px solid var(--white-alpha-20);
        }
        .navbar-link {
          position: relative;
          font-size: var(--fontSize-label-2);
          text-transform: uppercase;
          padding-block: 10px;
          max-width: unset;
          display: flex;
          align-items: center;
          color: var(--white);
          text-decoration: none;
        }
        .navbar-link::after {
          display: none;
        }
        .navbar-link .span {
          transition: var(--transition-1);
        }
        .navbar-link:is(:hover, :focus-visible) .span {
          color: var(--gold-crayola);
          transform: translateX(20px);
        }
        /* the diamond separator inside each nav link */
        .navbar-link .separator {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%) rotate(45deg);
          opacity: 0;
          transition: var(--transition-1);
        }
        .navbar-link:is(:hover, :focus-visible) .separator {
          opacity: 1;
        }

        /* sidebar contact section */
        .navbar-title {
          margin-block-end: 15px;
          color: var(--white);
          font-size: var(--fontSize-label-2);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: var(--weight-bold);
        }
        .navbar-text {
          margin-block: 10px;
          color: var(--quick-silver);
          font-size: var(--fontSize-label-2);
        }
        .navbar .body-4 {
          color: var(--quick-silver);
        }
        .navbar .contact-label {
          margin-block-end: 10px;
          color: var(--white);
          font-weight: var(--weight-bold);
        }
        .navbar .text-center .separator {
          margin-block: 30px;
          margin-inline: auto;
        }
        .sidebar-link {
          transition: var(--transition-1);
          color: var(--quick-silver);
          font-size: var(--fontSize-label-2);
          text-decoration: none;
        }
        .sidebar-link:is(:hover, :focus-visible) {
          color: var(--gold-crayola);
        }

        /* ── 1200px+: desktop nav replaces hamburger ── */
        @media (min-width: 1200px) {
          .nav-open-btn,
          .navbar .close-btn,
          .navbar .logo,
          .navbar-title,
          .navbar-text,
          .navbar .contact-label,
          .navbar .text-center,
          .overlay {
            display: none;
          }
          .header .container {
            max-width: unset;
          }
          /* reset the sidebar styles so navbar acts as inline nav */
          .navbar,
          .navbar.active {
            all: unset;
            margin-inline: auto 20px;
          }
          .navbar-list {
            all: unset;
            display: flex;
            gap: 30px;
            list-style: none;
          }
          .navbar-item {
            border-top: none;
          }
          .navbar .separator {
            display: none;
          }
          .navbar-link {
            font-weight: var(--weight-bold);
            letter-spacing: var(--letterSpacing-1);
          }
          .navbar-link::after {
            display: block;
          }
          .navbar-link:is(:hover, :focus-visible) .span {
            transform: unset;
          }
        }
      `}</style>

      {/* ════════════════════════════════════
          TOPBAR
          — hidden mobile, fixed at 575px+
          — slides up when header is active
      ════════════════════════════════════ */}
      <div className={`topbar${isActive ? " header-active" : ""}`}>
        <div className="container">
          {/* address — hidden below 992px */}
          <address className="topbar-item">
            <div className="icon">
              {/* location-outline SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path
                  d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a16 16 0 0025.5 0C304 409.89 400 272 400 185c0-75.61-64.5-137-144-137z"
                  stroke="currentColor"
                  strokeWidth="32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="256"
                  cy="192"
                  r="48"
                  stroke="currentColor"
                  strokeWidth="32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="span">
              201 Christopher St, Ronkonkoma, NY, 11779
            </span>
          </address>

          {/* separator — hidden below 1200px */}
          <div className="separator" aria-hidden="true" />

          {/* hours — hidden below 992px */}
          <div className="topbar-item item-2">
            <div className="icon">
              {/* time-outline SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <circle
                  cx="256"
                  cy="256"
                  r="208"
                  stroke="currentColor"
                  strokeWidth="32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M256 128v144h96"
                  stroke="currentColor"
                  strokeWidth="32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="span">M-F : 9:00 am to 5:00 pm</span>
          </div>

          {/* phone — always visible (it's a .link) */}
          <a href="tel:+15169072340" className="topbar-item link">
            <div className="icon">
              {/* call-outline SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path
                  d="M451 374c-15.88-16-54.34-39.35-73-48.76-24.3-12.24-26.3-13.24-45.4.95-12.74 9.47-21.21 17.93-36.12 14.75s-47.31-21.11-75.68-49.39-47.34-61.62-50.53-76.48 5.41-23.23 14.79-36c13.22-18 12.22-21 .92-45.3-8.81-18.9-32.84-57-48.9-72.8C119.9 44 119.9 47 108.83 51.6A160.15 160.15 0 0083 65.37C57 83 48.24 101.23 49.75 126c1.6 26.4 13.85 60.93 36.72 99.1 22.24 37.2 35.47 52.31 79.17 96s59.12 57.11 96.28 79.62c38.36 22.91 72.93 35.48 99.32 37.33 21.73 1.49 39.65-7.68 58.56-34.52a159.41 159.41 0 0013.58-25.94c4.53-11.05 7.53-11.05-1.38-19.59z"
                  stroke="currentColor"
                  strokeWidth="32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="span">+1 516 907 2340</span>
          </a>

          {/* separator — hidden below 1200px */}
          <div className="separator" aria-hidden="true" />

          {/* email — always visible (it's a .link) */}
          <a
            href="mailto:sales@alhusseinperfumes.com"
            className="topbar-item link"
          >
            <div className="icon">
              {/* mail-outline SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <rect
                  x="48"
                  y="96"
                  width="416"
                  height="320"
                  rx="40"
                  ry="40"
                  stroke="currentColor"
                  strokeWidth="32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M112 160l144 112 144-112"
                  stroke="currentColor"
                  strokeWidth="32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="span">sales@alhusseinperfumes.com</span>
          </a>
        </div>
      </div>

      {/* ════════════════════════════════════
          HEADER
      ════════════════════════════════════ */}
      <header
        className={`header${isActive ? " active" : ""}${isHidden ? " hide" : ""}`}
      >
        <div className="container">
          {/* Logo */}
          <Link href="/" className="logo">
            <Image
              src="/images/comp-logo/AHP-logo.png"
              width={125}
              height={50}
              alt="Al Hussein Perfumes - Home"
              priority
            />
          </Link>

          {/* Desktop nav (visible at 1200px+, hidden below by CSS) */}
          <nav className={`navbar${menuOpen ? " active" : ""}`}>
            {/* Close button — hidden at 1200px+ */}
            <button
              className="close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              {/* close icon — thick stroke matches --ionicon-stroke-width: 40px */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path
                  d="M368 368L144 144M368 144L144 368"
                  stroke="currentColor"
                  strokeWidth="48"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Logo in sidebar — hidden at 1200px+ */}
            <Link href="/" className="logo" onClick={() => setMenuOpen(false)}>
              <Image
                src="/images/comp-logo/AHP-logo.png"
                width={110}
                height={44}
                alt="Al Hussein Perfumes"
              />
            </Link>

            {/* Nav links */}
            <ul className="navbar-list">
              {navLinks.map((link) => (
                <li key={link.href} className="navbar-item">
                  <Link
                    href={link.href}
                    className="navbar-link hover-underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    {/* diamond separator — visible in sidebar on hover */}
                    <div className="separator" aria-hidden="true" />
                    <span className="span">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Sidebar contact section — hidden at 1200px+ */}
            <div className="text-center">
              <p className="navbar-title">Contact Us</p>
              <div className="separator" aria-hidden="true" />
              <p className="navbar-text body-4">
                201 Christopher St, Ronkonkoma, NY 11779
              </p>
              <a
                href="mailto:sales@alhusseinperfumes.com"
                className="navbar-text sidebar-link"
                style={{ display: "block" }}
              >
                sales@alhusseinperfumes.com
              </a>
              <a
                href="tel:+15169072340"
                className="navbar-text sidebar-link"
                style={{ display: "block" }}
              >
                +1 516 907 2340
              </a>
              <div className="separator" aria-hidden="true" />
              <p className="contact-label">Follow Us</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "16px",
                  marginTop: "8px",
                }}
              >
                {[
                  { label: "Instagram", href: "#" },
                  { label: "Facebook", href: "#" },
                  { label: "Twitter", href: "#" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="sidebar-link">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          {/* Hamburger — hidden at 1200px+ */}
          <button
            className="nav-open-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="line" />
            <span className="line line-2" />
            <span className="line line-3" />
          </button>
        </div>
      </header>

      {/* ════════════════════════════════════
          OVERLAY — hidden at 1200px+
      ════════════════════════════════════ */}
      <div
        className={`overlay${menuOpen ? " active" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}
