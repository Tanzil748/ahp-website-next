import { Skeleton } from "@/components/ui/skeleton";

/**
 * Mirrors the layout of <RecentEvents /> while it streams in.
 * 3-column event-card grid on lg, 2-col on sm, 1-col on mobile.
 */
export default function RecentEventsSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="section-base bg-(--bg-dark) overflow-hidden"
    >
      <div className="section-container">
        {/* SectionHeader placeholder */}
        <div className="flex flex-col items-center mb-10 gap-2">
          <Skeleton className="h-4 w-28 bg-white/10" />
          <Skeleton className="h-9 w-44 bg-white/10" />
        </div>

        {/* Event cards — aspect-ratio matches the real EventCard */}
        <ul className="grid gap-10 list-none p-0 m-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <li key={i} style={{ aspectRatio: "350 / 450" }}>
              <Skeleton className="w-full h-full bg-white/10 rounded-sm" />
            </li>
          ))}
        </ul>

        {/* "View Our Blog" button ghost */}
        <div className="flex justify-center mt-10">
          <Skeleton className="h-12 w-40 bg-white/10" />
        </div>
      </div>
    </section>
  );
}
