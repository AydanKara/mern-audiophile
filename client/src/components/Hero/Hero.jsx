import { Link } from "react-router-dom";
import "./Hero.css";
import { useEffect, useState } from "react";
import { Spin } from "antd";

const Hero = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/product/latest`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [apiUrl]);

  if (loading) {
    return <Spin spinning={loading} />;
  }

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-wrapper">
          <p className="hero-overline overline">New product</p>
          <h1 className="hero-heading">{product.name}</h1>
          <p className="hero-desc">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <Link to={`/product/${product._id}`} className="btn-1">
            See Product
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
