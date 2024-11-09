import {
  Button,
  message,
  Popconfirm,
  Space,
  Table,
  Form,
  Input,
  Spin,
  Row,
  Col,
} from "antd";
import { useCallback, useEffect, useState } from "react";

const AdminCategoryPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState(null); // State for editing category
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt="Category"
          width={80}
          style={{ borderRadius: "5px", border: "1px solid #f0f0f0" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => onEditCategory(record)}>
            Update
          </Button>
          <Popconfirm
            title="Delete the category"
            description="Are you sure you want to delete this category?"
            onConfirm={() => deleteCategory(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
  }, [apiUrl]); // Add apiUrl as a dependency

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/category/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
      message.success("Category deleted successfully");
      fetchCategories(); // Refetch categories after deletion
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (editingCategory) {
        // Update existing coupon
        const response = await fetch(
          `${apiUrl}/api/category/${editingCategory._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
            credentials: "include",
          }
        );
        if (response.ok) {
          message.success("Category updated successfully");
          setEditingCategory(null); // Clear the editing state
          form.resetFields();
          fetchCategories(); // Refresh the list of categories
        } else {
          message.error("Failed to update category.");
        }
      } else {
        const response = await fetch(`${apiUrl}/api/category/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        });
        if (response.ok) {
          message.success("Category created successfully");
          form.resetFields();
          fetchCategories(); // Refetch categories after creation
        }
      }
    } catch (error) {
      console.error("Failed to create category" + error);
      message.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  const onEditCategory = (category) => {
    setEditingCategory(category);
    form.setFieldsValue({
      name: category.name,
      img: category.img,
    });
  };

  const onCancelEdit = () => {
    setEditingCategory(null);
    form.resetFields();
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories when the component mounts
  }, [fetchCategories]); // Use fetchCategories as a dependency

  return (
    <Spin spinning={loading}>
      <div
        className="container"
        style={{
          margin: "auto",
          padding: "40px",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
          {editingCategory ? "Edit Category" : "Create Category"}
        </h2>
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={24}>
            <Col span={12} xs={24} sm={12} md={12}>
              <Form.Item
                label="Category Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input category name!",
                  },
                ]}
              >
                <Input placeholder="Enter category name" />
              </Form.Item>
            </Col>

            <Col span={12} xs={24} sm={12} md={12}>
              <Form.Item
                label="Image URL"
                name="img"
                rules={[
                  {
                    required: true,
                    message: "Please input image URL!",
                  },
                ]}
              >
                <Input placeholder="Enter image URL" />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ textAlign: "right" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "8px" }}
            >
              {editingCategory ? "Update Category" : "Create Category"}
            </Button>
            {editingCategory && <Button onClick={onCancelEdit}>Cancel</Button>}
          </div>
        </Form>
      </div>

      <div
        className="container"
        style={{
          marginTop: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={(record) => record._id}
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </Spin>
  );
};

export default AdminCategoryPage;
