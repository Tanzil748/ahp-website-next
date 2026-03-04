export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-[85dvh] w-full px-4 py-8 mt-[54px]">
      {children}
    </div>
  );
}
