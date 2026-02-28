"use client";

export default function BackToTop() {
  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar       { width: 5px; }
        ::-webkit-scrollbar-thumb { background-color: hsl(38,61%,73%); }
        ::-webkit-scrollbar-track { background: transparent; }

        .back-top-btn {
          position: fixed; bottom: 20px; right: 20px;
          background-color: hsl(38,61%,73%); color: hsla(40,12%,5%,1);
          font-size: 2.2rem; width: 50px; height: 50px;
          border-radius: 50%; display: grid; place-items: center;
          box-shadow: 0 0 25px rgba(0,0,0,0.25); transition: 250ms ease;
          z-index: 4; text-decoration: none;
        }
        .back-top-btn:hover { background-color: #fff; color: hsl(38,61%,73%); }
      `}</style>

      <a href="#" className="back-top-btn" aria-label="Back to top">
        ↑
      </a>
    </>
  );
}
