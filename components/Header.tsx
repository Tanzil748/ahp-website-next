"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MaterialSymbolsLocationOnOutline,
  IcSharpAccessTime,
  BasilPhoneOutline,
  MaterialSymbolsMailOutline,
  IcRoundClose,
} from "./Icons";
import { useState, useEffect, useRef } from "react";
import { Show, UserButton } from "@clerk/nextjs";

// ── Always-visible links ──────────────────────────────────────────────────────
const publicLinks = [
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact-us" },
];

// ── Only shown when signed in ─────────────────────────────────────────────────
const authLinks = [
  { label: "Compare List", href: "/compare-list" },
  { label: "My Fragrances", href: "/fragrances" },
];

const userButtonAppearance = {
  variables: {
    colorBackground: "hsla(0, 0%, 16%, 1)",
    colorText: "#ffffff",
    colorTextSecondary: "#ffffff",
    colorPrimary: "hsl(38, 61%, 73%)",
    colorNeutral: "#ffffff",
    borderRadius: "0px",
    fontFamily: "var(--font-primary)",
  },
  elements: {
    userButtonPopoverCard: {
      border: "1px solid hsla(38, 61%, 73%, 0.35)",
      boxShadow: "0 0 40px rgba(0,0,0,0.8)",
      backgroundColor: "hsla(0, 0%, 16%, 1)",
    },
    userButtonPopoverActionButton: {
      fontFamily: "var(--font-primary)",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "2px",
      fontSize: "1.2rem",
      borderRadius: "0",
      color: "#ffffff",
    },
    userButtonPopoverActionButtonText: { color: "#ffffff" },
    userButtonPopoverFooter: { display: "none" },
    userPreviewMainIdentifier__userButton: { color: "#ffffff" },
    userPreviewMainIdentifierText__userButton: { color: "#ffffff" },
    userPreviewSecondaryIdentifier__userButton: { color: "#ffffff" },
  },
};

const userProfileAppearance = {
  variables: {
    colorBackground: "hsla(0, 0%, 16%, 1)",
    colorText: "#ffffff",
    colorTextSecondary: "#ffffff",
    colorPrimary: "hsl(38, 61%, 73%)",
    colorNeutral: "#ffffff",
    borderRadius: "0px",
    fontFamily: "var(--font-primary)",
  },
  elements: {
    cardBox: {
      border: "1px solid hsla(38, 61%, 73%, 0.35)",
      boxShadow: "0 0 80px rgba(0,0,0,0.9)",
    },
    navbar: {
      backgroundColor: "hsla(0, 0%, 12%, 1)",
      borderRight: "1px solid hsla(38, 61%, 73%, 0.2)",
    },
    navbarButton: {
      fontFamily: "var(--font-primary)",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "2px",
      borderRadius: "0",
      color: "#ffffff",
    },
    navbarButtonText: { color: "#ffffff" },
    scrollBox: { backgroundColor: "hsla(0, 0%, 16%, 1)" },
    pageScrollBox: { backgroundColor: "hsla(0, 0%, 16%, 1)" },
    headerTitle: {
      fontFamily: "var(--font-display)",
      fontWeight: "400",
      color: "#ffffff",
    },
    profileSectionTitleText: {
      fontFamily: "var(--font-primary)",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "3px",
      color: "hsl(38, 61%, 73%)",
    },
    profileSectionPrimaryButton: {
      fontFamily: "var(--font-primary)",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "2px",
      color: "hsl(38, 61%, 73%)",
    },
    profileSectionContent: { color: "#ffffff" },
    formFieldLabel: { color: "#ffffff" },
    identityPreviewText: { color: "#ffffff" },
    userPreviewMainIdentifierText: { color: "#ffffff" },
    userPreviewSecondaryIdentifier: { color: "#ffffff" },
    badge: {
      backgroundColor: "hsla(38, 61%, 73%, 0.15)",
      border: "1px solid hsla(38, 61%, 73%, 0.4)",
      color: "hsl(38, 61%, 73%)",
      borderRadius: "0",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "2px",
    },
    footer: { display: "none" },
  },
};

// ── Reusable nav link style ───────────────────────────────────────────────────
const navLinkClass = [
  "relative text-white hover:text-[hsl(38,61%,73%)] font-bold uppercase tracking-widest text-[1.2rem] transition-colors duration-200",
  "after:content-[''] after:absolute after:left-0 after:-bottom-4",
  "after:w-full after:h-[5px]",
  "after:border-t after:border-b after:border-[hsl(38,61%,73%)]",
  "after:scale-x-[0.2] after:opacity-0",
  "after:transition-all after:duration-500",
  "hover:after:scale-x-100 hover:after:opacity-100",
  "focus-visible:after:scale-x-100 focus-visible:after:opacity-100",
  "outline-none",
].join(" ");

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {/* ════════════════════════════════════
          TOPBAR
      ════════════════════════════════════ */}
      <div
        className={[
          "hidden sm:block fixed top-0 left-0 w-full z-50 overflow-hidden",
          "border-b bg-transparent",
          "transition-all duration-300 ease-in-out",
          isActive
            ? "max-h-0 py-0 opacity-0 border-transparent"
            : "max-h-14 py-3 opacity-100 border-white/20",
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-6 px-7">
          <div className="flex items-center gap-6">
            <address className="hidden sm:flex items-center gap-1.5 not-italic">
              <MaterialSymbolsLocationOnOutline className="text-[15px]" />
              <span className="text-white text-[1.1rem] font-bold">
                201 Christopher St, Ronkonkoma, NY, 11779
              </span>
            </address>
            <div
              className="hidden xl:block w-2 h-2 border border-[hsl(38,61%,73%)] rotate-45 shrink-0"
              aria-hidden="true"
            />
            <div className="hidden md:flex items-center gap-1.5">
              <IcSharpAccessTime className="text-[15px]" />
              <span className="text-white text-[1.1rem] font-bold">
                M-F : 9:00 am to 5:00 pm
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="tel:+15169072340"
              className="flex items-center gap-1.5 text-white hover:text-[hsl(38,61%,73%)] transition-colors duration-200 hidden md:flex"
            >
              <BasilPhoneOutline className="text-[15px]" />
              <span className="text-[1.1rem] font-bold">+1 516 907 2340</span>
            </a>
            <div
              className="hidden xl:block w-2 h-2 border border-[hsl(38,61%,73%)] rotate-45 shrink-0"
              aria-hidden="true"
            />
            <a
              href="mailto:sales@alhusseinperfumes.com"
              className="flex items-center gap-1.5 text-white hover:text-[hsl(38,61%,73%)] transition-colors duration-200 hidden sm:flex"
            >
              <MaterialSymbolsMailOutline className="text-[15px]" />
              <span className="text-[1.1rem] font-bold">
                sales@alhusseinperfumes.com
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          HEADER
      ════════════════════════════════════ */}
      <header
        className={[
          "fixed left-0 w-full z-40 border-b",
          "transition-all duration-300 ease-in-out",
          isActive
            ? "top-0 bg-black/60 backdrop-blur-md border-black/15"
            : "top-0 sm:top-14 bg-transparent border-transparent",
          isHidden ? "-translate-y-full delay-[200ms]" : "translate-y-0",
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-2 px-5 h-[80px]">
          <div className="flex items-center">
            <Link
              href="/"
              className={[
                "shrink-0 mr-8 transition-transform duration-300",
                isActive ? "scale-90" : "scale-100",
              ].join(" ")}
            >
              <Image
                src="/images/comp-logo/AHP-logo.png"
                width={180}
                height={72}
                alt="Al Hussein Perfumes - Home"
                priority
              />
            </Link>

            {/* ── Desktop nav ── */}
            <nav
              className="hidden lg:flex items-center gap-8"
              aria-label="Main navigation"
            >
              {/* Public links — always visible */}
              {publicLinks.map((link) => (
                <Link key={link.href} href={link.href} className={navLinkClass}>
                  {link.label}
                </Link>
              ))}

              {/* Auth-only links — only when signed in */}
              <Show when="signed-in">
                <>
                  {authLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={navLinkClass}
                    >
                      {link.label}
                    </Link>
                  ))}
                </>
              </Show>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop auth buttons — signed out */}
            <Show when="signed-out">
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href="/sign-in"
                  className="text-[1.2rem] font-bold tracking-wide px-5 py-2 rounded whitespace-nowrap border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] hover:bg-[hsl(38,61%,73%)] hover:text-[hsl(40,12%,5%)] transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="text-[1.2rem] font-bold tracking-wide px-5 py-2 rounded whitespace-nowrap bg-[hsl(38,61%,73%)] border border-[hsl(38,61%,73%)] text-[hsl(40,12%,5%)] hover:bg-transparent hover:text-[hsl(38,61%,73%)] transition-all duration-200"
                >
                  Register
                </Link>
              </div>
            </Show>

            {/* Desktop UserButton — signed in */}
            <Show when="signed-in">
              <div className="hidden lg:flex">
                <UserButton
                  userProfileProps={{ appearance: userProfileAppearance }}
                  appearance={userButtonAppearance}
                />
              </div>
            </Show>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col justify-center gap-[6px] p-3 pr-0 bg-transparent border-none cursor-pointer"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <span
                className="block w-7 h-0.5 bg-white origin-left"
                style={{
                  animation:
                    "menuLine 400ms ease-in-out 0ms alternate infinite",
                }}
              />
              <span
                className="block w-7 h-0.5 bg-white origin-left"
                style={{
                  animation:
                    "menuLine 400ms ease-in-out 150ms alternate infinite",
                }}
              />
              <span
                className="block w-7 h-0.5 bg-white origin-left"
                style={{
                  animation:
                    "menuLine 400ms ease-in-out 300ms alternate infinite",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════
          FULLSCREEN MOBILE OVERLAY MENU
      ════════════════════════════════════ */}
      <div
        className={[
          "fixed inset-0 z-[100] flex flex-col items-center justify-center",
          "bg-[hsl(40,12%,5%)]",
          "transition-opacity duration-500 ease-in-out",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Close button */}
        <button
          className="absolute top-5 right-5 p-2 rounded-full bg-transparent cursor-pointer border border-white/30 text-white hover:border-[hsl(38,61%,73%)] hover:text-[hsl(38,61%,73%)] transition-all duration-200 flex items-center justify-center"
          onClick={() => setMenuOpen(false)}
          aria-label="Close navigation menu"
        >
          <IcRoundClose className="text-[25px]" />
        </button>

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className={[
            "mb-10 transition-all duration-300",
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
          ].join(" ")}
          style={{ transitionDelay: menuOpen ? "80ms" : "0ms" }}
        >
          <Image
            src="/images/comp-logo/AHP-logo.png"
            width={140}
            height={56}
            alt="Al Hussein Perfumes"
          />
        </Link>

        {/* Nav links */}
        <nav
          className="flex flex-col items-center gap-6 mb-10"
          aria-label="Mobile navigation"
        >
          {/* Public links — always visible */}
          {publicLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={[
                "text-white font-bold uppercase tracking-[0.2em] text-2xl",
                "hover:text-[hsl(38,61%,73%)] focus-visible:text-[hsl(38,61%,73%)]",
                "transition-all duration-300 outline-none",
                menuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3",
              ].join(" ")}
              style={{
                transitionDelay: menuOpen ? `${i * 55 + 120}ms` : "0ms",
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Auth-only links — only when signed in */}
          <Show when="signed-in">
            <>
              {authLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "text-[hsl(38,61%,73%)] font-bold uppercase tracking-[0.2em] text-2xl",
                    "hover:text-white focus-visible:text-white",
                    "transition-all duration-300 outline-none",
                    menuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3",
                  ].join(" ")}
                  style={{
                    transitionDelay: menuOpen
                      ? `${(publicLinks.length + i) * 55 + 120}ms`
                      : "0ms",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </>
          </Show>
        </nav>

        {/* Divider */}
        <div
          className={[
            "w-px h-8 bg-white/20 mb-8 transition-all duration-300",
            menuOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{ transitionDelay: menuOpen ? "460ms" : "0ms" }}
          aria-hidden="true"
        />

        {/* Mobile auth — signed out */}
        <Show when="signed-out">
          <div
            className={[
              "flex flex-col sm:flex-row items-center gap-4 transition-all duration-300",
              menuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3",
            ].join(" ")}
            style={{ transitionDelay: menuOpen ? "500ms" : "0ms" }}
          >
            <Link
              href="/sign-in"
              onClick={() => setMenuOpen(false)}
              className="text-[1.4rem] font-bold tracking-wide px-8 py-3 rounded w-48 text-center border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] hover:bg-[hsl(38,61%,73%)] hover:text-[hsl(40,12%,5%)] transition-all duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="text-[1.4rem] font-bold tracking-wide px-8 py-3 rounded w-48 text-center bg-[hsl(38,61%,73%)] border border-[hsl(38,61%,73%)] text-[hsl(40,12%,5%)] hover:bg-transparent hover:text-[hsl(38,61%,73%)] transition-all duration-200"
            >
              Register
            </Link>
          </div>
        </Show>

        {/* Mobile auth — signed in: UserButton */}
        <Show when="signed-in">
          <div
            className={[
              "flex items-center justify-center transition-all duration-300",
              menuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3",
            ].join(" ")}
            style={{ transitionDelay: menuOpen ? "500ms" : "0ms" }}
          >
            <UserButton
              userProfileProps={{ appearance: userProfileAppearance }}
              appearance={userButtonAppearance}
            />
          </div>
        </Show>

        {/* Footer contact info */}
        <div
          className={[
            "absolute bottom-8 flex flex-col items-center gap-1 transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{ transitionDelay: menuOpen ? "580ms" : "0ms" }}
        >
          <a
            href="tel:+15169072340"
            className="text-white/40 text-[1.1rem] hover:text-[hsl(38,61%,73%)] transition-colors duration-200"
          >
            +1 516 907 2340
          </a>
          <a
            href="mailto:sales@alhusseinperfumes.com"
            className="text-white/40 text-[1.1rem] hover:text-[hsl(38,61%,73%)] transition-colors duration-200"
          >
            sales@alhusseinperfumes.com
          </a>
        </div>
      </div>

      <style>{`@keyframes menuLine { 0% { transform: scaleX(1); } 100% { transform: scaleX(0.5); } }`}</style>
    </>
  );
}
