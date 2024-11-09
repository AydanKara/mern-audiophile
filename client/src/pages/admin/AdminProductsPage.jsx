import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Button, message, Popconfirm, Space, Table, Spin } from "antd";
import "./AdminProductsPage.css"

const AdminProductPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL; // Your API base URL
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // React Router navigation hook

  // Columns for the product table
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imgSrc) => (
        <td data-label="Image">
          <img src={imgSrc} alt="Product Image" width={100} />
        </td>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <td data-label="Name">
          <strong>{text}</strong>
        </td>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <td data-label="Category">
          {category?.name || "Unknown"}
        </td>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <td data-label="Price">
          ${price.toFixed(2)}
        </td>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <td data-label="Actions">
          <Space>
            <Button type="primary" onClick={() => onEditProduct(record)}>
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete this product?"
              onConfirm={() => deleteProduct(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        </td>
      ),
    },
  ];

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${apiUrl}/api/product`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json(); // Parse JSON response
      setDataSource(data); // Set products in state
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  }, [apiUrl]);

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/product/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      message.success("Product deleted successfully");
      fetchProducts(); // Refetch products after deletion
    } catch (error) {
      message.error(error.message);
    }
  };

  // Handle the edit button click, navigate to AdminProductEditPage
  const onEditProduct = (product) => {
    navigate(`/admin/products/edit/${product._id}`); // Navigate to edit page
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when component mounts
  }, [fetchProducts]);

  return (
    <Spin spinning={loading}>
      <h2 style={{textAlign: "center", paddingBottom: "2rem"}}>Products</h2>
      <Table
        className="container"
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 5 }}
      />
    </Spin>
  );
};

export default AdminProductPage;
