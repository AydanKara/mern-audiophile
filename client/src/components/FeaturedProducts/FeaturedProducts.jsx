import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FeaturedProducts.css";

const FeaturedProducts = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/product/featured?names=YX1 Wireless Earphones,ZX7 Speaker,ZX9 Speaker`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setFeaturedProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  console.log(featuredProducts);

  return (
    <section className="featured-products">
      <div className="container">
        <div className="product-1">
          <div className="product-1-content">
            <h2 className="product-1-heading">
              ZX9
              <br />
              SPEAKER
            </h2>
            <p className="product-1-desc">
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>
            <Link
              to={`product/${featuredProducts[2]?._id}`}
              className="btn-1 btn-alt"
            >
              See product
            </Link>
          </div>
        </div>
        <div className="product-2">
          <div className="product-2-content">
            <h4>ZX7 SPEAKER</h4>
            <Link
              to={`product/${featuredProducts[1]?._id}`}
              className="btn-1 btn-alt-3"
            >
              See product
            </Link>
          </div>
        </div>
        <div className="product-3">
          <div className="product-3-col product-3-img"></div>
          <div className="product-3-col">
            <h4>YX1 EARPHONES</h4>
            <Link
              to={`product/${featuredProducts[0]?._id}`}
              className="btn-1 btn-alt-3"
            >
              See product
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
