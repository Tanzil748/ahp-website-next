import BackToTop from "@/components/BackToTop";
import Link from "next/link";

const sections = [
  {
    number: "1",
    title: "How to Identify Authentic Products",
    icon: "◈",
    content: [
      {
        label: "Official Packaging",
        text: "Genuine Al Hussein Perfumes products feature high-quality, precisely printed packaging with crisp typography, consistent colour, and no smudging or misalignment. Examine the box closely — counterfeit packaging often feels lightweight, has uneven seams, or uses slightly off-brand colour tones.",
      },
      {
        label: "Holographic Seal",
        text: "Every authentic bottle is sealed with our proprietary holographic sticker on the base. This seal shifts colour under light and cannot be replicated by counterfeiters. If the seal is absent, damaged, or does not shift colour, the product is not genuine.",
      },
      {
        label: "Batch Code & Serial Number",
        text: "A unique batch code is embossed or printed on the bottom of every bottle and mirrored inside the box. These codes can be verified at any time by contacting our team at sales@alhusseinperfumes.com.",
      },
    ],
  },
  {
    number: "2",
    title: "Warning Signs of Counterfeit Fragrances",
    icon: "⚠",
    content: [
      {
        label: "Unusually Low Price",
        text: "If a deal seems too good to be true, it almost certainly is. Counterfeit sellers often undercut authentic retail pricing by 50% or more. Our fragrances are priced to reflect their quality — be suspicious of drastically discounted products.",
      },
      {
        label: "Poor Scent Performance",
        text: "Counterfeit fragrances are often made with inferior or harmful chemical substitutes. They may smell similar at first spray but lack depth, longevity, and the true character of the original accord. If a fragrance fades within minutes or smells slightly 'off', it may be fake.",
      },
      {
        label: "Spelling & Print Errors",
        text: "Look carefully at the bottle engraving, cap, and box text. Counterfeits frequently contain subtle misspellings, incorrect font weights, or missing legal text such as ingredient listings and country of origin.",
      },
      {
        label: "Suspicious Retailers",
        text: "Purchase only from our official website or our authorised retail partners. Unauthorised marketplace listings on auction sites or unknown third-party platforms carry a high risk of counterfeit products.",
      },
    ],
  },
  {
    number: "3",
    title: "The Risks of Counterfeit Perfumes",
    icon: "✕",
    content: [
      {
        label: "Health & Safety",
        text: "Counterfeit fragrances are unregulated and often contain unknown chemical compounds, heavy metals, or allergens that can cause skin irritation, rashes, respiratory issues, or serious allergic reactions. Unlike genuine products, counterfeits are never dermatologically tested.",
      },
      {
        label: "Environmental Impact",
        text: "Fake perfumes are typically produced with little to no regard for environmental standards. The chemical waste from counterfeit manufacturing causes significant harm to local ecosystems and water supplies.",
      },
      {
        label: "Economic Harm",
        text: "Purchasing counterfeit goods directly funds criminal networks and deprives legitimate businesses, artisans, and employees of their livelihoods. It also harms the broader economy through lost tax revenue and undermined brand trust.",
      },
    ],
  },
  {
    number: "4",
    title: "Where to Buy Authentic Products",
    icon: "✓",
    content:
      "Al Hussein Perfumes products are exclusively sold through our official website and a carefully selected network of authorised retail partners. We do not authorise any third-party auction sites, pop-up online stores, or unverified social media shops to sell our products. When in doubt, contact us directly before purchasing from an unfamiliar source — we are always happy to verify an authorised retailer for you.",
  },
  {
    number: "5",
    title: "Report a Counterfeit",
    icon: "⚑",
    content:
      "If you have purchased or encountered what you believe to be a counterfeit Al Hussein Perfumes product, please report it to us immediately at sales@alhusseinperfumes.com. Include the retailer name or URL, the product details, and any photographs if possible. Your report helps us protect other customers and take action against counterfeit networks. All reports are treated in strict confidence.",
  },
];

type ContentItem = { label: string; text: string };

export default function CounterfeitAwarenessPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "hsla(210,4%,9%,1)",
        fontFamily: "var(--font-dm-sans)",
      }}
    >
      {/* ── Hero ── */}
      <section
        className="relative text-center overflow-hidden"
        style={{
          paddingBlock: "120px 80px",
          background:
            "linear-gradient(180deg, hsla(210,4%,13%,1) 0%, hsla(210,4%,9%,1) 100%)",
        }}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" x="30" y="30" fill="%23c9ab81" opacity="0.4"/></svg>')`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gold glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,hsla(38,61%,50%,0.1)_0%,transparent_70%)]" />

        {/* Corner accents */}
        <span className="absolute top-8 left-8 w-[80px] h-[80px] opacity-20 pointer-events-none border-t border-l border-[hsl(38,61%,73%)]" />
        <span className="absolute top-8 right-8 w-[80px] h-[80px] opacity-20 pointer-events-none border-t border-r border-[hsl(38,61%,73%)]" />
        <span className="absolute bottom-8 left-8 w-[80px] h-[80px] opacity-20 pointer-events-none border-b border-l border-[hsl(38,61%,73%)]" />
        <span className="absolute bottom-8 right-8 w-[80px] h-[80px] opacity-20 pointer-events-none border-b border-r border-[hsl(38,61%,73%)]" />

        <div className="relative z-[1] max-w-[900px] mx-auto px-5">
          <p className="fade-up delay-1 text-[hsl(38,61%,73%)] font-bold uppercase tracking-[0.4em] mb-3 text-[1.2rem]">
            Al Hussein Perfumes Inc.
          </p>

          <div className="fade-up delay-2 flex justify-center mb-3">
            <svg viewBox="0 0 100 12" width="100" height="12">
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
          </div>

          <h1
            className="fade-up delay-3 text-white font-normal mb-6"
            style={{
              fontFamily: "var(--font-forum)",
              fontSize: "clamp(4rem, 6vw, 7rem)",
              lineHeight: 1.1,
            }}
          >
            Counterfeit Awareness
          </h1>
          <p
            className="fade-up delay-4 text-[hsla(0,0%,65%,1)] mx-auto text-[1.6rem] leading-[1.7]"
            style={{ maxWidth: 560 }}
          >
            Protecting you and the integrity of our craft. Learn how to identify
            genuine Al Hussein Perfumes products and stay safe from
            counterfeits.
          </p>

          {/* Badge */}
          <div className="fade-up delay-5 inline-flex items-center gap-3 mt-8 px-6 py-3 border border-[hsl(38,61%,73%)] border-opacity-30">
            <span className="w-2 h-2 rotate-45 bg-[hsl(38,61%,73%)]" />
            <span className="text-[hsl(38,61%,73%)] text-[1.3rem] uppercase tracking-[0.2em] font-bold">
              Buy With Confidence
            </span>
          </div>
        </div>
      </section>

      {/* ── Quick-stat strip ── */}
      <section
        className="border-y border-white/10"
        style={{ background: "hsla(210,4%,11%,1)" }}
      >
        <div className="max-w-[900px] mx-auto px-5 py-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { value: "100%", label: "Authentic Guarantee" },
            { value: "Verified", label: "Authorised Retailers" },
            { value: "Tested", label: "Dermatologically Safe" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span
                className="text-[hsl(38,61%,73%)] font-normal text-[2.8rem]"
                style={{ fontFamily: "var(--font-forum)" }}
              >
                {stat.value}
              </span>
              <span className="text-[hsla(0,0%,65%,1)] text-[1.3rem] uppercase tracking-[0.2em] font-bold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sections ── */}
      <section className="max-w-[900px] mx-auto px-5 py-20">
        <div className="flex flex-col gap-6">
          {sections.map((sec) => (
            <div
              key={sec.number}
              className="group border border-white/10 transition-all duration-300 hover:border-[hsl(38,61%,73%)] hover:border-opacity-40"
              style={{ background: "hsla(210,4%,11%,1)" }}
            >
              {/* Header */}
              <div
                className="flex items-center gap-5 px-8 py-6"
                style={{ borderBottom: "1px solid hsla(0,0%,100%,0.08)" }}
              >
                <span
                  className="shrink-0 w-[44px] h-[44px] flex items-center justify-center border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold text-[1.6rem] transition-all duration-300 group-hover:bg-[hsl(38,61%,73%)] group-hover:text-[hsla(40,12%,5%,1)]"
                  style={{ fontFamily: "var(--font-forum)" }}
                >
                  {sec.icon}
                </span>
                <h2
                  className="text-white font-normal text-[2rem] leading-tight"
                  style={{ fontFamily: "var(--font-forum)" }}
                >
                  {sec.title}
                </h2>
              </div>

              {/* Body */}
              <div className="px-8 py-6">
                {typeof sec.content === "string" ? (
                  <p className="text-[hsla(0,0%,65%,1)] text-[1.55rem] leading-[1.85]">
                    {sec.content}
                  </p>
                ) : (
                  <div className="flex flex-col gap-5">
                    {(sec.content as ContentItem[]).map((item) => (
                      <div key={item.label} className="flex flex-col gap-1">
                        <span className="text-[hsl(38,61%,73%)] font-bold uppercase tracking-[0.15em] text-[1.2rem]">
                          {item.label}
                        </span>
                        <p className="text-[hsla(0,0%,65%,1)] text-[1.55rem] leading-[1.85]">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Contact strip ── */}
        <div
          className="mt-12 px-8 py-8 border border-[hsl(38,61%,73%)] border-opacity-40 text-center relative overflow-hidden"
          style={{ background: "hsla(210,4%,11%,1)" }}
        >
          {/* Corner accents */}
          <span className="absolute top-0 right-0 w-[60px] h-[60px] opacity-30 pointer-events-none border-t border-r border-[hsl(38,61%,73%)]" />
          <span className="absolute bottom-0 left-0 w-[60px] h-[60px] opacity-30 pointer-events-none border-b border-l border-[hsl(38,61%,73%)]" />

          <p
            className="text-[hsl(38,61%,73%)] font-normal mb-3 text-[2rem]"
            style={{ fontFamily: "var(--font-forum)" }}
          >
            Spotted a Counterfeit?
          </p>
          <p className="text-[hsla(0,0%,65%,1)] text-[1.5rem] leading-[1.7] mb-6">
            Report suspicious products or sellers directly to our team. We take
            every report seriously and act swiftly to protect our customers.
          </p>
          <a
            href="mailto:sales@alhusseinperfumes.com"
            className="group relative inline-flex items-center gap-3 px-8 py-3 border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] font-bold uppercase tracking-[0.25em] text-[1.2rem] overflow-hidden transition-colors duration-300 hover:text-[hsl(40,12%,5%)]"
            style={{ fontFamily: "var(--font-forum)" }}
          >
            <span className="absolute inset-0 -translate-x-full bg-[hsl(38,61%,73%)] transition-transform duration-300 group-hover:translate-x-0 -z-10" />
            <Link className="relative z-10" href={`/write-counterfeit-report`}>
              Report Now
            </Link>
            <span className="relative z-10">→</span>
          </a>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
