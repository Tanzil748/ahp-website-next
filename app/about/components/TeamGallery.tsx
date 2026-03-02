"use client";

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

function GalleryImg({ src }: { src: string }) {
  return (
    <div className="overflow-hidden bg-[#111] w-full h-full transition-shadow duration-300 hover:shadow-[0_10px_25px_rgba(255,215,0,0.12)]">
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover block transition-transform duration-300 hover:scale-[1.02]"
      />
    </div>
  );
}

export default function TeamGallery() {
  return (
    <section className="min-h-screen pt-[5px] pb-12 sm:pb-16 md:pb-20 px-3 sm:px-5 bg-[var(--bg-section)] flex flex-col justify-center">
      {/* Section title */}
      <div className="page-section-header">
        <span className="page-section-title text-[1.6rem] sm:text-[1.9rem] md:text-[2.2rem]">
          Our Team
        </span>
        <OrnamentalSep />
      </div>

      <div className="max-w-[1200px] w-full mx-auto mt-[10px] p-3 sm:p-4 md:p-6 bg-[var(--bg-section)] overflow-hidden">
        {/* ── Desktop grid (md+) ── */}
        <div className="hidden md:grid grid-cols-12 grid-rows-3 gap-[14px] h-[520px]">
          <div className="col-start-1 col-end-5 row-start-1 row-end-3">
            <GalleryImg src="/images/about-page/team-gallery/gallery-4.jpg" />
          </div>
          <div className="col-start-5 col-end-9 row-start-1 row-end-2">
            <GalleryImg src="/images/about-page/team-gallery/gallery-1.jpg" />
          </div>
          <div className="col-start-9 col-end-13 row-start-1 row-end-2">
            <GalleryImg src="/images/about-page/team-gallery/gallery-7.jpg" />
          </div>
          <div className="col-start-5 col-end-9 row-start-2 row-end-3">
            <GalleryImg src="/images/about-page/team-gallery/gallery-6.jpg" />
          </div>
          <div className="col-start-9 col-end-13 row-start-2 row-end-4">
            <GalleryImg src="/images/about-page/team-gallery/gallery-3.jpg" />
          </div>
          <div className="col-start-1 col-end-5 row-start-3 row-end-4">
            <GalleryImg src="/images/about-page/team-gallery/gallery-5.jpg" />
          </div>
          <div className="col-start-5 col-end-9 row-start-3 row-end-4">
            <GalleryImg src="/images/about-page/team-gallery/gallery-8.jpg" />
          </div>
        </div>

        {/* ── Tablet grid (sm) ── */}
        <div className="hidden sm:grid md:hidden grid-cols-2 gap-[10px]">
          {[
            "/images/about-page/team-gallery/gallery-4.jpg",
            "/images/about-page/team-gallery/gallery-1.jpg",
            "/images/about-page/team-gallery/gallery-7.jpg",
            "/images/about-page/team-gallery/gallery-6.jpg",
            "/images/about-page/team-gallery/gallery-3.jpg",
            "/images/about-page/team-gallery/gallery-5.jpg",
          ].map((src) => (
            <div key={src} className="h-[180px]">
              <GalleryImg src={src} />
            </div>
          ))}
          <div className="col-span-2 h-[180px]">
            <GalleryImg src="/images/about-page/team-gallery/gallery-8.jpg" />
          </div>
        </div>

        {/* ── Mobile stack ── */}
        <div className="flex flex-col gap-[8px] sm:hidden">
          {[
            "/images/about-page/team-gallery/gallery-4.jpg",
            "/images/about-page/team-gallery/gallery-1.jpg",
            "/images/about-page/team-gallery/gallery-7.jpg",
            "/images/about-page/team-gallery/gallery-6.jpg",
            "/images/about-page/team-gallery/gallery-3.jpg",
            "/images/about-page/team-gallery/gallery-5.jpg",
            "/images/about-page/team-gallery/gallery-8.jpg",
          ].map((src) => (
            <div key={src} className="h-[200px]">
              <GalleryImg src={src} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
