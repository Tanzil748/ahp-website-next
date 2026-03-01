"use client";

export default function HeroVideo() {
  return (
    <section className="relative min-h-[35vh] sm:min-h-[45vh] md:min-h-[55vh] overflow-hidden mt-24 sm:mt-32 md:mt-40">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover brightness-[0.8] block mt-5"
      >
        <source src="/images/about-page/promo-vid.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[hsla(210,4%,9%,1)] text-white font-black text-center leading-none px-4 sm:px-6 md:px-[30px] max-w-[95%] sm:max-w-[90%] whitespace-nowrap"
        style={{
          fontFamily: "var(--font-forum)",
          fontSize: "clamp(2.8rem, 10vw, 10rem)",
          mixBlendMode: "multiply",
        }}
      >
        Who We Are
      </div>
    </section>
  );
}
