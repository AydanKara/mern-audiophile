import {
  Button,
  Form,
  Input,
  message,
  Spin,
  InputNumber,
  Select,
  Row,
  Col,
} from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

const AdminProductEditPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams(); // Get product ID from URL parameters
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch categories for the select dropdown
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/category`);
        const data = await response.json();

        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, [apiUrl]);

  useEffect(() => {
    // Fetch the existing product data by ID and populate the form
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/product/${id}`);
        const data = await response.json();
        form.setFieldsValue(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
        message.error("Failed to load product data");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [apiUrl, id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      if (response.ok) {
        message.success("Product updated successfully");
        navigate(`/admin/products`);
      } else {
        message.error("Failed to update product");
      }
    } catch (error) {
      console.error("Failed to update product", error);
      message.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="edit-product"
        layout="vertical"
        onFinish={onFinish}
        style={{
          maxWidth: 800,
          margin: "auto",
          padding: "40px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
          Edit Product
        </h2>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Product Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input product name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please select a category!",
                },
              ]}
            >
              <Select placeholder="Select a category">
                {categories.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input product price!",
                },
              ]}
            >
              <InputNumber
                min={0}
                formatter={(value) => `€ ${value}`}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Stock Quantity"
              name="stock"
              rules={[
                {
                  required: true,
                  message: "Please input stock quantity!",
                },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Image URL"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please input image URL!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Gallery Images (URLs)"
              name="galleryImage"
              rules={[
                {
                  required: true,
                  message: "Please input exactly 3 image URLs!",
                },
                {
                  validator: (_, value) => {
                    if (!value || value.length !== 3) {
                      return Promise.reject(
                        new Error("You must input exactly 3 image URLs!")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Select
                mode="tags"
                placeholder="Enter image URLs"
                tokenSeparators={[","]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input product description!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Features"
              name="features"
              rules={[
                {
                  required: true,
                  message: "Please input product features!",
                },
              ]}
            >
              <TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="Product Includes">
              <Form.List name="inTheBox">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Row key={field.key} gutter={24} align="middle">
                        <Col span={12}>
                          <Form.Item
                            {...field}
                            label="Item"
                            name={[field.name, "item"]}
                            key={[field.key, "item"]}
                            rules={[
                              {
                                required: true,
                                message: "Please input item name!",
                              },
                            ]}
                          >
                            <Input placeholder="Item Name" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            {...field}
                            label="Quantity"
                            name={[field.name, "quantity"]}
                            key={[field.key, "quantity"]}
                            rules={[
                              {
                                required: true,
                                message: "Please input quantity!",
                              },
                            ]}
                          >
                            <InputNumber min={1} style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Button danger onClick={() => remove(field.name)}>
                            Remove
                          </Button>
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block>
                        Add Item
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          style={{
            marginTop: "20px",
            textAlign: "right",
          }}
        >
          <Button type="primary" htmlType="submit">
            Update Product
          </Button>
          <Button
            onClick={() => navigate("/admin/products")}
            style={{ marginLeft: "8px" }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default AdminProductEditPage;
