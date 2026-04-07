// Server component — pure layout wrapper
export default function FullScreenMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      {children}
    </div>
  );
}
