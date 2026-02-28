"use client";

export default function HeroVideo() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "55vh",
        overflow: "hidden",
        marginTop: 160,
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.8)",
          display: "block",
        }}
      >
        <source src="/images/about-page/promo-vid.mp4" type="video/mp4" />
      </video>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "hsla(210,4%,9%,1)",
          color: "#fff",
          fontWeight: 900,
          fontSize: "clamp(3.5rem, 12vw, 10rem)",
          fontFamily: "var(--font-forum)",
          padding: "0 30px",
          textAlign: "center",
          lineHeight: 1,
          mixBlendMode: "multiply",
          maxWidth: "90%",
          whiteSpace: "nowrap",
        }}
      >
        Who We Are
      </div>
    </section>
  );
}
