import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Categories from "../components/Categories/Categories";
import CategoryProducts from "../components/Categories/CategoryProducts/CategoryProducts";
import { message, Spin } from "antd";
import ShopInfo from "../components/Layouts/ShopInfo/ShopInfo";

const CatalogCategoryPage = () => {
  const { categoryTitle } = useParams();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiUrl}/api/product/catalog/${categoryTitle}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiUrl, categoryTitle]);

  return (
    <main>
      <Spin spinning={loading}>
        <div className="category-heading">
          <h1 className="heading-title">{categoryTitle}</h1>
        </div>
        <CategoryProducts products={products} />
        <div className="container">
          <Categories />
        </div>
      </Spin>
      <ShopInfo />
    </main>
  );
};

export default CatalogCategoryPage;
