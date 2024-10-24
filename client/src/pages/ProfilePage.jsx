import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Form, Input, Row, Col, Divider, Button } from "antd";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  clearAllErrors,
  clearFieldError,
} from "../redux/user/userSlice";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "../utils/toastNotifications";
import "../styles/profile-page.css";
import ConfirmModal from "../components/Modal/ConfirmModal";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    phone: "",
    shippingInfo: {},
  });

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        fullName: currentUser.fullName || "",
        phone: currentUser.phone || "",
        shippingInfo: {
          address: currentUser.shippingInfo?.address || "",
          zipCode: currentUser.shippingInfo?.zipCode || "",
          city: currentUser.shippingInfo?.city || "",
          country: currentUser.shippingInfo?.country || "",
        },
      });
      form.setFieldsValue({
        username: currentUser.username,
        email: currentUser.email,
        fullName: currentUser.fullName,
        phone: currentUser.phone,
        shippingInfo: {
          address: currentUser.shippingInfo?.address,
          zipCode: currentUser.shippingInfo?.zipCode,
          city: currentUser.shippingInfo?.city,
          country: currentUser.shippingInfo?.country,
        },
      });
    }
    dispatch(clearAllErrors());
  }, [currentUser, dispatch, form]);
  console.log(formData);

  const handleChange = (changedValues) => {
    const fieldKey = Object.keys(changedValues)[0];

    if (fieldKey.startsWith("shippingInfo")) {
      // If the changed field is within shippingInfo, merge it properly
      setFormData((prevFormData) => ({
        ...prevFormData,
        shippingInfo: {
          ...prevFormData.shippingInfo,
          ...changedValues.shippingInfo,
        },
      }));
    } else {
      // For other top-level fields
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...changedValues,
      }));
    }

    if (fieldKey) {
      dispatch(clearFieldError(fieldKey));
    }
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          fullName: formData.fullName,
          phone: formData.phone,
          shippingInfo: formData.shippingInfo,
        }),
      });
      const data = await res.json();
      console.log("Response from server:", data);

      if (data.errors) {
        const errors = data.errors.reduce((acc, error) => {
          acc[error.field] = error.message;
          return acc;
        }, {});
        dispatch(updateUserFailure(errors));
        return;
      }

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        notifyError(data.message || "Login failed! Wrong credentials.");
        return;
      }

      dispatch(updateUserSuccess(data));
      notifySuccess("Profile updated successfully");
    } catch (error) {
      console.error("Error during update:", error);
      dispatch(updateUserFailure(error.message));
      notifyWarning(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleConfirmDelete = () => {
    handleDelete();
    setShowModal(false); // Close modal after confirming
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  return (
    <main>
      <div className="site-heading">
        <h1 className="heading-title">{currentUser.username}`s Profile</h1>
      </div>
      <section className="container">
        <div className="profile-section-wrapper">
          <Form
            form={form}
            layout="vertical"
            onValuesChange={handleChange}
            onFinish={handleSubmit}
            style={{
              maxWidth: 730,
              margin: "auto",
              padding: "40px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 className="sub-title">Account Information</h2>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please enter your username" },
                  ]}
                  validateStatus={error?.name ? "error" : ""}
                  help={error?.name}
                >
                  <Input
                    className="form-item-input"
                    placeholder="Enter your username"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                  ]}
                  validateStatus={error?.email ? "error" : ""}
                  help={error?.email}
                >
                  <Input
                    className="form-item-input"
                    placeholder="Enter your email"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      message: "Please enter your phone number",
                    },
                  ]}
                  validateStatus={error?.phone ? "error" : ""}
                  help={error?.phone}
                >
                  <Input
                    className="form-item-input"
                    placeholder="Enter your phone number"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Full Name"
                  name="fullName"
                  rules={[
                    {
                      message: "Please enter your full name",
                    },
                  ]}
                  validateStatus={error?.fullName ? "error" : ""}
                  help={error?.fullName}
                >
                  <Input
                    className="form-item-input"
                    placeholder="Enter your full name"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            <h2 className="sub-title">Shipping Information</h2>
            <Row gutter={16}>
              <Col xs={24}>
                <Form.Item
                  label="Address"
                  name={["shippingInfo", "address"]}
                  rules={[{ message: "Please enter your address" }]}
                >
                  <Input
                    className="form-item-input"
                    placeholder="Enter your address"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="ZIP Code"
                  name={["shippingInfo", "zipCode"]}
                  rules={[{ message: "Please enter your ZIP code" }]}
                >
                  <Input
                    className="form-item-input"
                    placeholder="Enter your ZIP code"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="City"
                  name={["shippingInfo", "city"]}
                  rules={[{ message: "Please enter your city" }]}
                >
                  <Input
                    className="form-item-input"
                    placeholder="Enter your city"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Country"
                  name={["shippingInfo", "country"]}
                  rules={[{ message: "Please enter your country" }]}
                >
                  <Input
                    className="form-item-input"
                    placeholder="Enter your country"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Button
              htmlType="submit"
              disabled={loading}
              className="btn-1"
              style={{ height: "auto" }}
            >
              {loading ? "Loading..." : "Update"}
            </Button>

            <div className="profile-actions">
              <span onClick={() => setShowModal(true)} className="btn-2">
                Delete Account
              </span>
              <span onClick={handleSignOut} className="btn-2">
                Sign out
              </span>
            </div>
          </Form>
        </div>
      </section>

      {showModal && (
        <ConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </main>
  );
};

export default ProfilePage;
