import BackToTop from "@/components/BackToTop";
import Image from "next/image";

const shippingMethods = [
  { method: "FedEx Standard", time: "3–5 business days", cost: "Free" },
  { method: "FedEx Two Days", time: "2 business days", cost: "$12.95" },
  { method: "FedEx Overnight ✦", time: "1–2 business days", cost: "$19.95" },
];

const domesticSections = [
  {
    number: "1",
    icon: "⏱",
    title: "Shipment Processing Time",
    content: [
      {
        label: "Standard Processing",
        text: "All orders are processed within 2–3 business days. Orders are not shipped or delivered on weekends or holidays.",
      },
      {
        label: "High Volume Delays",
        text: "If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you via email or telephone.",
      },
    ],
  },
  {
    number: "2",
    icon: "📦",
    title: "Shipment to P.O. Boxes or APO/FPO Addresses",
    content:
      "alhusseinperfumes.com ships to addresses within the U.S., U.S. Territories, and APO/FPO/DPO addresses.",
  },
  {
    number: "3",
    icon: "✉",
    title: "Shipment Confirmation & Order Tracking",
    content:
      "You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.",
  },
  {
    number: "4",
    icon: "$",
    title: "Customs, Duties & Taxes",
    content:
      "alhusseinperfumes.com is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).",
  },
  {
    number: "5",
    icon: "⚠",
    title: "Damages",
    content:
      "alhusseinperfumes.com is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.",
  },
];

type ContentItem = { label: string; text: string };

export default function ShippingPage() {
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
            Shipping Policy
          </h1>
          <p
            className="fade-up delay-4 text-[hsla(0,0%,65%,1)] mx-auto text-[1.6rem] leading-[1.7]"
            style={{ maxWidth: 560 }}
          >
            Thank you for visiting and shopping at alhusseinperfumes.com.
            Following are the terms and conditions that constitute our Shipping
            Policy.
          </p>
          <div className="fade-up delay-5 inline-flex items-center gap-3 mt-8 px-6 py-3 border border-[hsl(38,61%,73%)] border-opacity-30">
            <span className="w-2 h-2 rounded-full bg-[hsl(38,61%,73%)]" />
            <span className="text-[hsl(38,61%,73%)] text-[1.3rem] uppercase tracking-[0.2em] font-bold">
              U.S. Domestic Shipping Only
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
            { value: "2–3 Days", label: "Processing Time" },
            { value: "Free", label: "Standard Shipping" },
            { value: "24 Hours", label: "Tracking Active" },
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

      <section className="max-w-[900px] mx-auto px-5 py-20">
        {/* ── Domestic heading ── */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-[hsl(38,61%,73%)] to-transparent opacity-40" />
          <h2
            className="text-[hsl(38,61%,73%)] font-normal text-[2.4rem] uppercase tracking-[0.2em] shrink-0"
            style={{ fontFamily: "var(--font-forum)" }}
          >
            Domestic Shipping
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-[hsl(38,61%,73%)] to-transparent opacity-40" />
        </div>

        {/* ── Shipping rates table ── */}
        <div
          className="mb-8 border border-white/10 overflow-hidden"
          style={{ background: "hsla(210,4%,11%,1)" }}
        >
          {/* Table header */}
          <div
            className="grid grid-cols-3 px-6 py-4"
            style={{
              borderBottom: "1px solid hsla(0,0%,100%,0.08)",
              background: "hsla(210,4%,13%,1)",
            }}
          >
            {["Shipment Method", "Estimated Delivery", "Cost"].map((h) => (
              <span
                key={h}
                className="text-[hsl(38,61%,73%)] font-bold uppercase tracking-[0.2em] text-[1.2rem]"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {shippingMethods.map((row, i) => (
            <div
              key={row.method}
              className="group grid grid-cols-3 px-6 py-5 transition-colors duration-200 hover:bg-white/5"
              style={{
                borderBottom:
                  i < shippingMethods.length - 1
                    ? "1px solid hsla(0,0%,100%,0.06)"
                    : "none",
              }}
            >
              <span
                className="text-white text-[1.5rem]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {row.method}
              </span>
              <span className="text-[hsla(0,0%,65%,1)] text-[1.5rem]">
                {row.time}
              </span>
              <span
                className="font-bold text-[1.5rem]"
                style={{
                  color: row.cost === "Free" ? "hsl(38,61%,73%)" : "#fff",
                }}
              >
                {row.cost}
              </span>
            </div>
          ))}

          {/* Footnote */}
          <div
            className="px-6 py-4"
            style={{
              borderTop: "1px solid hsla(0,0%,100%,0.06)",
              background: "hsla(210,4%,13%,1)",
            }}
          >
            <p className="text-[hsla(0,0%,50%,1)] text-[1.3rem]">
              ✦ Overnight delivery is only available for orders with delivery
              addresses within the continental United States. Delivery delays
              can occasionally occur.
            </p>
          </div>
        </div>

        {/* ── Domestic sections ── */}
        <div className="flex flex-col gap-6 mb-16">
          {domesticSections.map((sec) => (
            <div
              key={sec.number}
              className="group border border-white/10 transition-all duration-300 hover:border-[hsl(38,61%,73%)] hover:border-opacity-40"
              style={{ background: "hsla(210,4%,11%,1)" }}
            >
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
                <h3
                  className="text-white font-normal text-[2rem] leading-tight"
                  style={{ fontFamily: "var(--font-forum)" }}
                >
                  {sec.title}
                </h3>
              </div>
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

        {/* ── International heading ── */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-[hsl(38,61%,73%)] to-transparent opacity-40" />
          <h2
            className="text-[hsl(38,61%,73%)] font-normal xs:text-[2.4rem] uppercase tracking-[0.2em] shrink-0"
            style={{ fontFamily: "var(--font-forum)" }}
          >
            International Shipping
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-[hsl(38,61%,73%)] to-transparent opacity-40" />
        </div>

        {/* ── International notice ── */}
        <div
          className="border border-white/10 px-8 py-8 flex gap-6 items-start mb-16"
          style={{ background: "hsla(210,4%,11%,1)" }}
        >
          <span
            className="shrink-0 w-[44px] h-[44px] flex items-center justify-center border border-[hsl(38,61%,73%)] text-[hsl(38,61%,73%)] text-[1.8rem]"
            style={{ fontFamily: "var(--font-forum)" }}
          >
            🌍
          </span>
          <div>
            <p
              className="text-white font-normal text-[2rem] mb-2"
              style={{ fontFamily: "var(--font-forum)" }}
            >
              Currently U.S. Only
            </p>
            <p className="text-[hsla(0,0%,65%,1)] text-[1.55rem] leading-[1.85]">
              We currently do not ship outside the United States. We are working
              on expanding our shipping capabilities and hope to serve
              international customers in the future.
            </p>
          </div>
        </div>

        {/* ── Contact strip ── */}
        <div
          className="px-8 py-8 border border-[hsl(38,61%,73%)] border-opacity-40 text-center"
          style={{ background: "hsla(210,4%,11%,1)" }}
        >
          <p
            className="text-[hsl(38,61%,73%)] font-normal mb-3 text-[2rem]"
            style={{ fontFamily: "var(--font-forum)" }}
          >
            Questions About Your Order?
          </p>
          <p className="text-[hsla(0,0%,65%,1)] text-[1.5rem] leading-[1.7]">
            For any shipping questions or concerns, contact us at{" "}
            <a
              href="mailto:alhusseinperfumes@alhusseinperfumes.com"
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
