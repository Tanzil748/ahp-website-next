import { Skeleton } from "@/components/ui/skeleton";

/**
 * Mirrors the layout of <Distribution /> while it streams in.
 * 4-column brand-card grid on lg, 2-col on sm, 1-col on mobile.
 */
export default function DistributionSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="section-base bg-(--bg-dark) overflow-hidden"
    >
      <div className="relative section-container">
        {/* SectionHeader placeholder */}
        <div className="flex flex-col items-center mb-4 gap-2">
          <Skeleton className="h-4 w-24 bg-white/10" />
          <Skeleton className="h-9 w-48 bg-white/10" />
        </div>

        {/* Body text placeholder */}
        <div className="flex flex-col items-center gap-2 mb-10">
          <Skeleton className="h-4 w-[min(560px,90%)] bg-white/10" />
          <Skeleton className="h-4 w-[min(420px,70%)] bg-white/10" />
        </div>

        {/* Brand cards */}
        <ul className="grid gap-10 list-none p-0 m-0 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <li
              key={i}
              className={
                i === 0 || i === 3
                  ? "lg:-translate-y-7.5"
                  : "lg:translate-y-7.5"
              }
            >
              {/* Image area */}
              <Skeleton
                className="w-full mb-6.5 bg-white/10"
                style={{ aspectRatio: "285 / 336" }}
              />

              {/* Heading */}
              <Skeleton className="h-8 w-3/4 mb-3 bg-white/10" />

              {/* Link */}
              <Skeleton className="h-4 w-36 bg-white/10" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
