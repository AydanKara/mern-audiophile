import {
  Button,
  message,
  Popconfirm,
  Space,
  Table,
  Form,
  Input,
  Spin,
} from "antd";
import { useCallback, useEffect, useState } from "react";

const AdminCategoryPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL; // Your API base URL
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState(null); // State for editing category
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => <img src={imgSrc} alt="Image" width={100} />,
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
            description="Are you sure to delete this category?"
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
          message.error("Failed to update coupon.");
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
    <>
      <Spin spinning={loading}>
        <Form
          form={form}
          name="basic"
          layout="inline"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            margin: "1rem 0",
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="Category name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input category name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image (Url)"
            name="img"
            rules={[
              {
                required: true,
                message: "Please input image url",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            {editingCategory ? "Update Category" : "Create Category"}
          </Button>
          {editingCategory && (
            <Button onClick={onCancelEdit} style={{ marginLeft: "8px" }}>
              Cancel
            </Button>
          )}
        </Form>
      </Spin>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
      />
    </>
  );
};

export default AdminCategoryPage;
