import { useCallback, useEffect, useState } from "react";
import CategoryItem from "./CategoryItem/CategoryItem";
import { message, Spin } from "antd";
import "./Categories.css";

const Categories = ({ closeMenu }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${apiUrl}/api/category`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json(); // Parse the JSON from response
      setDataSource(data); // Set the fetched categories in dataSource
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  return (
    <Spin spinning={loading} size="large">
      <section className="products-categories">
        <div className="products-categories-wrapper">
          {dataSource.map((category) => (
            <CategoryItem
              key={category._id}
              {...category}
              closeMenu={closeMenu}
            />
          ))}
        </div>
      </section>
    </Spin>
  );
};

export default Categories;
