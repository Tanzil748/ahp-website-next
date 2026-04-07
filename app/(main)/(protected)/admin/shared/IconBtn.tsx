"use client";

export default function IconBtn({
  onClick,
  disabled,
  title,
  color,
  bg,
  border,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  color: string;
  bg: string;
  border: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="flex items-center px-4 py-2 transition-all duration-200 disabled:opacity-40"
      style={{ color, backgroundColor: bg, border: `1px solid ${border}` }}
    >
      {children}
    </button>
  );
}
