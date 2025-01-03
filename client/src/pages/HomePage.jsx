import Categories from "../components/Categories/Categories";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Hero from "../components/Hero/Hero";
import ShopInfo from "../components/Layouts/ShopInfo/ShopInfo";
import "../styles/home.css";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <div className="container">
        <Categories />
      </div>
      <FeaturedProducts />
      <ShopInfo />
    </main>
  );
};

export default HomePage;
