import { useState } from "react";
import "../styles/CheckoutPage.css";
import { Button, Col, Divider, Form, Input, Radio, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { cart } = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState("eMoney");

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const onFinish = async (values) => {
    console.log(values);
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
        <Col xs={24} md={16}>
          <Form
            layout="vertical"
            form={form}
            initialValues={{ paymentMethod: "eMoney" }}
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
                  name="name"
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
              name="address"
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
                  name="zipCode"
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
                  name="city"
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
                  name="country"
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
                  name="paymentMethod"
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
                        required:
                          form.getFieldValue("paymentMethod") === "eMoney",
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
                        required:
                          form.getFieldValue("paymentMethod") === "eMoney",
                        message: "Please enter your e-Money PIN",
                      },
                    ]}
                  >
                    <Input
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
        <Col xs={24} md={8}>
          <div className="summary-container">
            <h6>SUMMARY</h6>
            <ul className="summary-items">
              <li className="summary-item">
                <img src="product-image-url" alt="Product" />
                <div className="item-details">
                  <p className="item-name">XX99 MK II</p>
                  <p className="item-price">$ 2,999</p>
                </div>
                <p className="item-quantity">x1</p>
              </li>
              <li className="summary-item">
                <img src="product-image-url" alt="Product" />
                <div className="item-details">
                  <p className="item-name">XX59</p>
                  <p className="item-price">$ 899</p>
                </div>
                <p className="item-quantity">x2</p>
              </li>
              <li className="summary-item">
                <img src="product-image-url" alt="Product" />
                <div className="item-details">
                  <p className="item-name">YX1</p>
                  <p className="item-price">$ 599</p>
                </div>
                <p className="item-quantity">x1</p>
              </li>
            </ul>
            <Divider />
            <div className="summary-total">
              <p>TOTAL</p>
              <span>$ 5,396</span>
            </div>
            <div className="summary-shipping">
              <p>SHIPPING</p>
              <span>$ 50</span>
            </div>
            <div className="summary-vat">
              <p>VAT (INCLUDED)</p>
              <span>$ 1,079</span>
            </div>
            <div className="summary-grand-total">
              <p>GRAND TOTAL</p>
              <span>$ 5,446</span>
            </div>
          </div>
        </Col>
        {/* <Button type="primary" htmlType="submit" block>
        CONTINUE & PAY
      </Button> */}
      </Row>
    </main>
  );
};

export default CheckoutPage;
