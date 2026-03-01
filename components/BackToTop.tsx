"use client";
import { Fa7SolidChevronUp } from "./Icons";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar       { width: 5px; }
        ::-webkit-scrollbar-thumb { background-color: hsl(38,61%,73%); }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <a
        href="#"
        className={`fixed bottom-5 right-5 z-[4] grid place-items-center w-[50px] h-[50px] rounded-full text-[2.2rem] shadow-[0_0_25px_rgba(0,0,0,0.25)] transition-all duration-[250ms] ease-in-out no-underline bg-[hsl(38,61%,73%)] text-[hsla(40,12%,5%,1)] hover:bg-white hover:text-[hsl(38,61%,73%)] ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-label="Back to top"
      >
        <Fa7SolidChevronUp />
      </a>
    </>
  );
}
