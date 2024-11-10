import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Divider, Form, Input, Radio, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearAllErrors, clearFieldError } from "../redux/user/userSlice";
import OrderConfirmationModal from "../components/Modal/OrderConfirmationModal";
import "../styles/CheckoutPage.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { cartItems, totalPrice, itemsPrice, shippingPrice, taxPrice } = cart;

  const [paymentMethod, setPaymentMethod] = useState("eMoney");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    shippingInfo: {},
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        shippingInfo: {
          address: currentUser.shippingInfo?.address || "",
          zipCode: currentUser.shippingInfo?.zipCode || "",
          city: currentUser.shippingInfo?.city || "",
          country: currentUser.shippingInfo?.country || "",
        },
      });
      form.setFieldsValue({
        fullName: currentUser.fullName,
        email: currentUser.email,
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

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

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

  const onFinish = async (values) => {
    setIsModalVisible(true);
    console.log(formData);
    console.log(values);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleButtonClick = () => {
    form.submit(); // Trigger the form submit when button is clicked
  };

  return (
    <main className="container checkout-container">
      <button
        className="btn-back go-back"
        style={{ marginBottom: "3.8rem" }}
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
      <Row gutter={32}>
        {/* Left Section: Checkout Form */}
        <Col xs={24} md={24} lg={16}>
          <Form
            layout="vertical"
            form={form}
            name="checkout-form"
            initialValues={{ paymentMethod: "eMoney" }}
            onValuesChange={handleChange}
            onFinish={onFinish}
            style={{
              maxWidth: 730,
              margin: "auto",
              padding: "40px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ marginBottom: "4rem" }}>CHECKOUT</h3>
            {/* Billing Details */}
            <h3 className="sub-title">Billing Details</h3>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Name"
                  name="fullName"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                >
                  <Input
                    className="form-item-input"
                    placeholder="Enter your name"
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
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input
                    className="form-item-input"
                    placeholder="Enter your phone number"
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Shipping Info */}
            <h3 className="sub-title" style={{ marginTop: "5.3rem" }}>
              Shipping Info
            </h3>
            <Form.Item
              label="Address"
              name={["shippingInfo", "address"]}
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input
                className="form-item-input"
                placeholder="Enter your address"
              />
            </Form.Item>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="ZIP Code"
                  name={["shippingInfo", "zipCode"]}
                  rules={[
                    { required: true, message: "Please enter your ZIP code" },
                  ]}
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
                  rules={[
                    { required: true, message: "Please enter your city" },
                  ]}
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
                  rules={[
                    { required: true, message: "Please enter your country" },
                  ]}
                >
                  <Input
                    className="form-item-input"
                    placeholder="Enter your country"
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Payment Details */}
            <h3 className="sub-title" style={{ marginTop: "6rem" }}>
              Payment Details
            </h3>
            <Row gutter={12} style={{ marginBottom: "2.4rem" }}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Payment Method"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                />
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="paymentMethod" noStyle>
                  <Radio.Group
                    onChange={handlePaymentChange}
                    value={paymentMethod}
                    className="custom-radio-group"
                  >
                    <Radio value="eMoney" className="custom-radio-card">
                      e-Money
                    </Radio>
                    <Radio value="cashOnDelivery" className="custom-radio-card">
                      Cash on Delivery
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            {/* Conditionally render the message for 'Cash on Delivery' */}
            {paymentMethod === "cashOnDelivery" ? (
              <Row>
                <Col xs={24} className="cash-on-delivery">
                  <img src="shared\icon-cash-on-delivery.svg" alt="" />
                  <p style={{ opacity: ".5" }}>
                    The ‘Cash on Delivery’ option enables you to pay in cash
                    when our delivery courier arrives at your residence. Just
                    make sure your address is correct so that your order will
                    not be cancelled.
                  </p>
                </Col>
              </Row>
            ) : (
              <Row gutter={12}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="e-Money Number"
                    name="eMoneyNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your e-Money number",
                      },
                    ]}
                  >
                    <Input
                      className="form-item-input"
                      placeholder="Enter your e-Money number"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="e-Money PIN"
                    name="eMoneyPin"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your e-Money PIN",
                      },
                    ]}
                  >
                    <Input
                      type="password"
                      className="form-item-input"
                      placeholder="Enter your e-Money PIN"
                    />
                  </Form.Item>
                </Col>
              </Row>
            )}
          </Form>
        </Col>

        {/* Right Section: Summary */}
        <Col xs={24} md={24} lg={8}>
          <div className="summary-container">
            <h6>SUMMARY</h6>
            <ul className="summary-items">
              {cartItems.map((item) => (
                <li className="summary-item" key={item._id}>
                  <img src={item.image} alt="Product" />
                  <div className="item-details">
                    <p className="item-name">
                      {item.name
                        .replace(/Headphones|Earphones|Speakers/g, "")
                        .trim()}
                    </p>
                    <p className="item-price">
                      $ {item.price.toLocaleString("en")}
                    </p>
                  </div>
                  <p className="item-quantity">x{item.qty}</p>
                </li>
              ))}
            </ul>
            <Divider />
            <div className="summary-total">
              <p style={{ opacity: ".5" }}>TOTAL</p>
              <span style={{ fontSize: "1.8rem", fontWeight: "700" }}>
                $ {itemsPrice.toLocaleString("en")}
              </span>
            </div>
            <div className="summary-shipping">
              <p style={{ opacity: ".5" }}>SHIPPING</p>
              <span style={{ fontSize: "1.8rem", fontWeight: "700" }}>
                $ {shippingPrice.toLocaleString("en")}
              </span>
            </div>
            <div className="summary-vat">
              <p style={{ opacity: ".5" }}>VAT (INCLUDED)</p>
              <span style={{ fontSize: "1.8rem", fontWeight: "700" }}>
                $ {taxPrice.toLocaleString("en")}
              </span>
            </div>
            <div className="summary-grand-total">
              <p style={{ opacity: ".5" }}>GRAND TOTAL</p>
              <span
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  color: "#d87d4a",
                }}
              >
                $ {totalPrice.toLocaleString("en")}
              </span>
            </div>
            <button className="btn-1" onClick={handleButtonClick}>
              CONTINUE & PAY
            </button>
          </div>
        </Col>
      </Row>

      {isModalVisible && (
        <OrderConfirmationModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
};

export default CheckoutPage;
