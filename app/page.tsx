import Distribution from "@/components/distribution";
import HeroSlider from "@/components/HeroSlider";
import NewArrivals from "@/components/NewArrivals";
import RecentEvents from "@/components/RecentEvents";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Distribution />
      <NewArrivals />
      <RecentEvents />
      <BackToTop />
    </>
  );
}
