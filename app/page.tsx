import Distribution from "@/components/home/Distribution";
import HeroSlider from "@/components/home/HeroSlider";
import LatestCollections from "@/components/home/LatestCollections";
import RecentEvents from "@/components/home/RecentEvents";
import BackToTop from "@/components/BackToTop";
import SubscribeSection from "@/components/SubscribeSection";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Distribution />
      <LatestCollections />
      <RecentEvents />
      <BackToTop />
      <SubscribeSection />
    </>
  );
}
