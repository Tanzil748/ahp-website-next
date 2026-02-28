import Distribution from "@/components/home/distribution";
import HeroSlider from "@/components/home/HeroSlider";
import NewArrivals from "@/components/home/NewArrivals";
import RecentEvents from "@/components/home/RecentEvents";
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
