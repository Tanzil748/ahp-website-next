"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FaqItem {
  q: string;
  a: string;
}

// ─── Theme tokens ─────────────────────────────────────────────────────────────
const theme = {
  goldCrayola: "hsl(38, 61%, 73%)",
  eerieBlack1: "hsla(210, 4%, 9%, 1)",
};

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs: FaqItem[] = [
  {
    q: "Who do you sell to?",
    a: "We exclusively serve wholesale clients, distributors, retailers, and e-commerce businesses. We do not sell directly to consumers. If you are interested in becoming a partner, please contact our sales team to begin the onboarding process.",
  },
  {
    q: "Do you have a minimum order quantity (MOQ)?",
    a: "Yes, we maintain minimum order quantities based on product category and brand. MOQs ensure efficient production and logistics. Please contact us for a customized quote based on your needs.",
  },
  {
    q: "Are your products authentic?",
    a: "All products supplied are 100% authentic and sourced directly from authorized manufacturers or brand partners. We maintain strict quality control procedures to ensure product integrity.",
  },
  {
    q: "Which markets do you ship to?",
    a: "We ship globally and work with distributors across North America, Europe, the Middle East, and other international markets. Shipping terms and lead times vary depending on destination.",
  },
  {
    q: "What payment terms do you offer?",
    a: "We only accept ACH deposits, Zelle, or wire transfers. No cash or credit card payments allowed. We do not offer any payment plans.",
  },
  {
    q: "How long does order fulfillment take?",
    a: "Lead times depend on product availability and order volume. In-stock wholesale orders are typically processed within a few business days. Larger or custom orders may require additional production time.",
  },
  {
    q: "Do you support Amazon or other marketplace sellers?",
    a: "Yes, we work with qualified e-commerce sellers and marketplace distributors. Compliance with brand policies and marketplace regulations is required.",
  },
  {
    q: "Can you provide compliance documentation?",
    a: "We can provide required documentation such as MSDS, IFRA certificates, ingredient disclosures, and other regulatory documents upon request.",
  },
  {
    q: "What is your return or damage policy?",
    a: "Any damaged or defective products must be reported within a specified timeframe after delivery. Claims are reviewed promptly, and resolutions may include replacement or credit.",
  },
];

// ─── Ornamental separator ─────────────────────────────────────────────────────
function OrnamentalSep() {
  return (
    <svg
      viewBox="0 0 100 12"
      width="100"
      height="12"
      style={{ display: "block", margin: "5px auto 0" }}
    >
      <line
        x1="0"
        y1="6"
        x2="38"
        y2="6"
        stroke="hsl(38,61%,73%)"
        strokeWidth="1"
      />
      <rect
        x="44"
        y="2"
        width="8"
        height="8"
        transform="rotate(45 48 6)"
        fill="none"
        stroke="hsl(38,61%,73%)"
        strokeWidth="1"
      />
      <line
        x1="58"
        y1="6"
        x2="100"
        y2="6"
        stroke="hsl(38,61%,73%)"
        strokeWidth="1"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <style>{`
        .faq-wrapper {
          max-width: 1200px;
          width: 100%;
          margin: 40px auto 0;
          padding: 0 40px;
        }
        .faq-answer {
          font-size: 1.8rem;
          max-height: 0;
          opacity: 0;
          line-height: 1.5;
          overflow: hidden;
          transition: all 0.6s ease;
          color: hsla(0,0%,65%,1);
          font-family: var(--font-dm-sans);
          padding: 0 15px;
        }
        .faq-answer.open { max-height: 300px; opacity: 1; padding: 0 15px 30px; }
        .faq-btn { transition: background 0.25s ease; }
        .faq-btn:hover { background-color: hsla(210,4%,9%,1) !important; }
        .d-arrow { transition: transform 0.5s ease-in; color: hsl(38,61%,73%); flex-shrink: 0; }
        .d-arrow.rotate { transform: rotate(180deg); }
        @media (max-width: 1240px) { .faq-wrapper { padding: 0 24px; } }
        @media (max-width: 600px)  { .faq-wrapper { padding: 0 16px; } }
      `}</style>

      <section style={{ paddingBlock: 70, backgroundColor: theme.eerieBlack1 }}>
        {/* Section title */}
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <span
            style={{
              color: theme.goldCrayola,
              fontFamily: "var(--font-forum)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.4em",
              fontSize: "2.2rem",
              lineHeight: "1.2em",
            }}
          >
            FAQs
          </span>
          <OrnamentalSep />
        </div>

        {/* FAQ list */}
        <div className="faq-wrapper">
          {faqs.map((item, i) => (
            <div
              key={i}
              style={{ borderBottom: "1px solid hsla(38,61%,73%,0.35)" }}
            >
              <button
                className="faq-btn"
                onClick={() => toggle(i)}
                style={{
                  width: "100%",
                  backgroundColor:
                    openIndex === i ? theme.eerieBlack1 : "#181818",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 15px",
                  border: "none",
                  outline: "none",
                  fontSize: "2.2rem",
                  color: theme.goldCrayola,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "var(--font-forum)",
                  letterSpacing: 1,
                  textAlign: "left",
                }}
              >
                <span>{item.q}</span>
                <svg
                  className={`d-arrow${openIndex === i ? " rotate" : ""}`}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{ marginLeft: 16 }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <p className={`faq-answer${openIndex === i ? " open" : ""}`}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
