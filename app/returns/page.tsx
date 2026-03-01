import BackToTop from "@/components/BackToTop";
import Image from "next/image";

const sections = [
  {
    number: "1",
    title: "Return Policy",
    icon: "↩",
    content:
      "We have a 30-day return policy, which means you have 30 days after receiving your item to request a return. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase. To start a return, contact us at sales@alhusseinperfumes.com. If your return is accepted, we'll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.",
  },
  {
    number: "2",
    title: "Damages & Issues",
    icon: "⚠",
    content:
      "Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.",
  },
  {
    number: "3",
    title: "Exceptions / Non-Returnable Items",
    icon: "✕",
    content: [
      {
        label: "Non-Returnable Categories",
        text: "Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products).",
      },
      {
        label: "Hazardous Materials",
        text: "We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.",
      },
      {
        label: "Sale Items & Gift Cards",
        text: "Unfortunately, we cannot accept returns on sale items or gift cards.",
      },
    ],
  },
  {
    number: "4",
    title: "Exchanges",
    icon: "⇄",
    content:
      "The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.",
  },
  {
    number: "5",
    title: "Refunds",
    icon: "✓",
    content:
      "We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund.",
  },
];

type ContentItem = { label: string; text: string };

export default function ReturnsPage() {
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

        <div className="relative z-[1] max-w-[900px] mx-auto px-5">
          <p className="fade-up delay-1 text-[hsl(38,61%,73%)] font-bold uppercase tracking-[0.4em] mb-3 text-[1.2rem]">
            Al Hussein Perfumes Inc.
          </p>
          {/* ── Wavy separator ── */}
          <div className="flex justify-center mb-3 fade-up delay-2">
            <Image
              src="/images/patterns/separator.svg"
              width={100}
              height={10}
              alt=""
              aria-hidden="true"
            />
          </div>
          <h1
            className="fade-up delay-3 text-white font-normal mb-6"
            style={{
              fontFamily: "var(--font-forum)",
              fontSize: "clamp(4rem, 6vw, 7rem)",
              lineHeight: 1.1,
            }}
          >
            Return & Refund Policy
          </h1>
          <p
            className="fade-up delay-4 text-[hsla(0,0%,65%,1)] mx-auto text-[1.6rem] leading-[1.7]"
            style={{ maxWidth: 560 }}
          >
            Your satisfaction is our priority. Learn everything you need to know
            about our returns, exchanges and refund process.
          </p>

          {/* 30-day badge */}
          <div className="fade-up delay-5 inline-flex items-center gap-3 mt-8 px-6 py-3 border border-[hsl(38,61%,73%)] border-opacity-30">
            <span className="w-2 h-2 rounded-full bg-[hsl(38,61%,73%)]" />
            <span className="text-[hsl(38,61%,73%)] text-[1.3rem] uppercase tracking-[0.2em] font-bold">
              30-Day Return Window
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
            { value: "30 Days", label: "Return Window" },
            { value: "Same Method", label: "Refund Payment" },
            { value: "Free Label", label: "Return Shipping" },
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
          className="mt-12 px-8 py-8 border border-[hsl(38,61%,73%)] border-opacity-40 text-center"
          style={{ background: "hsla(210,4%,11%,1)" }}
        >
          <p
            className="text-[hsl(38,61%,73%)] font-normal mb-3 text-[2rem]"
            style={{ fontFamily: "var(--font-forum)" }}
          >
            Need Help With a Return?
          </p>
          <p className="text-[hsla(0,0%,65%,1)] text-[1.5rem] leading-[1.7]">
            For any return questions or to start a return, contact us at{" "}
            <a
              href="mailto:sales@alhusseinperfumes.com"
              className="text-[hsl(38,61%,73%)] hover:text-white transition-colors duration-300 underline underline-offset-4"
            >
              sales@alhusseinperfumes.com
            </a>
          </p>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
