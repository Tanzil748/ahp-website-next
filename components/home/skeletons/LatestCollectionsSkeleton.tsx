import { Skeleton } from "@/components/ui/skeleton";

/**
 * Mirrors the layout of <LatestCollections /> while it streams in.
 * Shows a row of card-shaped skeletons that mimics the carousel track.
 */
export default function LatestCollectionsSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="section-base bg-(--bg-section) overflow-hidden"
    >
      <div className="section-container">
        {/* SectionHeader placeholder */}
        <div className="flex flex-col items-center mb-10 gap-2">
          <Skeleton className="h-4 w-24 bg-white/10" />
          <Skeleton className="h-9 w-56 bg-white/10" />
        </div>
      </div>

      {/* Carousel row — show 5 cards; the overflow hides the rest */}
      <div className="relative w-full max-w-container mx-auto px-4">
        {/* Prev arrow ghost */}
        <Skeleton className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 z-10" />

        <div className="overflow-hidden w-full">
          <ul className="flex gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <li
                key={i}
                className="shrink-0 w-[min(285px,calc(100vw-3rem))] rounded-xl p-5 bg-[#111]"
              >
                {/* Square image area */}
                <Skeleton
                  className="w-full bg-white/10 rounded-lg"
                  style={{ aspectRatio: "1 / 1" }}
                />
                {/* Collection name */}
                <Skeleton className="mt-3.75 h-5 w-3/4 mx-auto bg-white/10" />
              </li>
            ))}
          </ul>
        </div>

        {/* Next arrow ghost */}
        <Skeleton className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 z-10" />
      </div>
    </div>
  );
}
