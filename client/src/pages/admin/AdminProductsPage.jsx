import { Button, message, Popconfirm, Space, Table, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

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
      render: (imgSrc) => <img src={imgSrc} alt="Product Image" width={100} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category?.name || "Unknown",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`, // Format price
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
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
        pagination={{ pageSize: 10 }}
      />
    </Spin>
  );
};

export default AdminProductPage;
