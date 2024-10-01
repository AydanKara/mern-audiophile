import { useEffect, useState } from "react";
import ProductItem from "./ProductItem/ProductItem";
import { message, Spin } from "antd";
import "./Products.css";

const Products = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/product`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setDataSource(data);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  return (
    <section className="container">
      <Spin spinning={loading}>
        <div className="products-wrapper">
          <ul className="product-list">
            {dataSource.map((product, index) => (
              <ProductItem
                key={product._id}
                product={product}
                isReversed={index % 2 !== 0}
              />
            ))}
          </ul>
        </div>
      </Spin>
    </section>
  );
};

export default Products;
