import Banner from "../Banner/Banner";
import CategoriesSection from "../CategoriesSection/CategoriesSection";
import FlashSaleSection from "../FlashSaleSection/FlashSaleSection";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import TopVendors from "../TopVendors/TopVendors";
import NewArrivals from "../NewArrivals/NewArrivals";

const Home = () => {
  return (
    <div>
      <Banner />
      <CategoriesSection />
      <FlashSaleSection />
      <FeaturedProducts />
      <TopVendors />
      <NewArrivals />
    </div>
  );
};

export default Home;
