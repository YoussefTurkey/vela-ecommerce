import BestSellers from "./components/home/BestSellers";
import BrandsStrip from "./components/home/BrandsStrip";
import CategoryGrid from "./components/home/CategoryGrid";
import CustomerReviews from "./components/home/CustomerReviews";
import FeaturedGrid from "./components/home/FeaturedGrid";
import FlashSale from "./components/home/FlashSale";
import Hero from "./components/home/Hero";
import Newsletter from "./components/home/Newsletter";
import PromoBanner from "./components/home/PromoBanner";

export default function Home() {
  return (
    <div className="flex flex-col bg-white">
      <Hero />
      <CategoryGrid />
      <FlashSale />
      <FeaturedGrid />
      <BestSellers />
      <BrandsStrip />
      <PromoBanner />
      <CustomerReviews />
      <Newsletter />
    </div>
  );
}
