import dynamic from "next/dynamic";
import { Suspense } from "react";

import HeroSlider from "@/components/home/HeroSlider";
import BackToTop from "@/components/BackToTop";
import SubscribeSection from "@/components/SubscribeSection";

import DistributionSkeleton from "@/components/home/skeletons/DistributionSkeleton";
import LatestCollectionsSkeleton from "@/components/home/skeletons/LatestCollectionsSkeleton";
import RecentEventsSkeleton from "@/components/home/skeletons/RecentEventsSkeleton";

// Lazily loaded — excluded from the initial JS bundle so the hero
// and navigation paint instantly, then each section streams in on its own.
const Distribution = dynamic(() => import("@/components/home/Distribution"));
const LatestCollections = dynamic(
  () => import("@/components/home/LatestCollections"),
);
const RecentEvents = dynamic(() => import("@/components/home/RecentEvents"));

export default function Home() {
  return (
    <>
      {/* ── Static — painted on first load, no JS needed ── */}
      <HeroSlider />

      {/* ── Lazy sections — each has its own skeleton fallback ── */}
      <Suspense fallback={<DistributionSkeleton />}>
        <Distribution />
      </Suspense>

      <Suspense fallback={<LatestCollectionsSkeleton />}>
        <LatestCollections />
      </Suspense>

      <Suspense fallback={<RecentEventsSkeleton />}>
        <RecentEvents />
      </Suspense>

      {/* ── Static — always visible, no hydration delay ── */}
      <BackToTop />
      <SubscribeSection />
    </>
  );
}
