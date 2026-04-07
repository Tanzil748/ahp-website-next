"use client";

import Ornament from "../ui/Ornament";

export default function ConfirmModal({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        backgroundColor: "hsla(210,4%,5%,0.88)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="w-full max-w-md p-8"
        style={{
          backgroundColor: "hsla(210,4%,11%,1)",
          border: "1px solid hsla(38,61%,73%,0.2)",
        }}
      >
        <div className="mb-4">
          <Ornament />
        </div>
        <p className="text-[hsla(0,0%,60%,1)] text-[1.3rem] mb-8 leading-relaxed">
          {message}
        </p>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 py-3 border border-white/20 text-white/60 text-[1.1rem] font-bold uppercase tracking-[2px] transition-colors hover:border-white/40 hover:text-white/80"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 text-[1.1rem] font-bold uppercase tracking-[2px]"
            style={{
              backgroundColor: "hsla(0,65%,50%,0.2)",
              border: "1px solid hsla(0,65%,50%,0.5)",
              color: "hsl(0,65%,65%)",
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
