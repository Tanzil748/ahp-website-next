"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

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

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-10 sm:py-14 md:py-[70px] bg-[var(--bg-section)]">
      {/* Section title */}
      <div className="page-section-header mt-20">
        <span className="page-section-title text-[1.6rem] sm:text-[1.9rem] md:text-[2.2rem]">
          FAQs
        </span>
        <OrnamentalSep />
      </div>

      {/* FAQ list */}
      <div className="max-w-[1200px] w-full mx-auto mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6 md:px-10">
        {faqs.map((item, i) => (
          <div key={i} className="border-b border-[var(--gold-border)]">
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center px-3 sm:px-[15px] py-4 sm:py-5 border-none outline-none text-[1.5rem] sm:text-[1.8rem] md:text-[2.2rem] text-[var(--gold)] font-bold cursor-pointer text-left tracking-[0.5px] sm:tracking-[1px] transition-colors duration-[250ms] hover:bg-[var(--bg-section)] [font-family:var(--font-display)]"
              style={{
                backgroundColor:
                  openIndex === i ? "var(--bg-section)" : "var(--bg-faq-item)",
              }}
            >
              <span className="pr-2">{item.q}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="ml-2 sm:ml-4 flex-shrink-0 text-[var(--gold)] transition-transform duration-500 ease-in"
                style={{
                  transform:
                    openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <div
              className="overflow-hidden transition-all duration-[600ms] ease-[ease]"
              style={{
                maxHeight: openIndex === i ? "400px" : "0",
                opacity: openIndex === i ? 1 : 0,
                padding: openIndex === i ? "0 12px 24px" : "0 12px",
              }}
            >
              <p className="body-muted text-[1.4rem] sm:text-[1.6rem] md:text-[1.8rem] leading-[1.6] sm:leading-[1.5]">
                {item.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
