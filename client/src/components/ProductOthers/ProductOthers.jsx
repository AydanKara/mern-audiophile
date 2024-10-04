import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spin, message } from "antd";
import "./ProductOthers.css";

const ProductOthers = ({ excludeProductId }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [randomProducts, setRandomProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      setLoading(true);
      try {
        if (!excludeProductId) {
          return <Spin spinning={true} />;
        }

        const response = await fetch(
          `${apiUrl}/api/product/random?excludeId=${excludeProductId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch random products");
        }
        const products = await response.json();
        setRandomProducts(products);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomProducts();
  }, [apiUrl, excludeProductId]);

  return (
    <div className="product-others">
      <h3>you may also like</h3>
      <Spin spinning={loading}>
        <ul className="others-list">
          {randomProducts.map((product) => (
            <li className="other-item" key={product._id}>
              <div className="other-img">
                <img src={product.image} alt={product.name} />
              </div>
              <h5>{product.name}</h5>
              <Link to={`/product/${product._id}`} className="btn-1">
                See Product
              </Link>
            </li>
          ))}
        </ul>
      </Spin>
    </div>
  );
};

export default ProductOthers;
