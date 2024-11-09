import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import "./OrderConfirmationModal.css";

const OrderConfirmationModal = ({ isVisible, onClose }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, totalPrice } = cart;
  const [isExpanded, setIsExpanded] = useState(false);

  const initialDisplayCount = 1;
  const displayedItems = isExpanded
    ? cartItems
    : cartItems.slice(0, initialDisplayCount);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      footer={null}
      centered
      width={540}
    >
      <div style={{ textAlign: "left", padding: "2.8rem 2.4rem" }}>
        <img
          src="/shared/icon-order-confirmation.svg"
          alt="order confirmation"
        />
        <h3 style={{ margin: "3.3rem 0 2.4rem 0" }}>
          THANK YOU
          <br /> FOR YOUR ORDER
        </h3>
        <p style={{ opacity: "50%" }}>
          You will receive an email confirmation shortly.
        </p>

        <div className="order-summary-container">
          <div
            className={`order-details ${isExpanded ? "expanded" : "collapsed"}`}
          >
            {displayedItems.map((item) => (
              <div className="order-product-details" key={item._id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="order-product-image"
                />
                <div className="order-product-info">
                  <p className="order-product-name">
                    {item.name
                      .replace(/Headphones|Earphones|Speakers/g, "")
                      .trim()}
                  </p>
                  <p className="order-product-price">
                    $ {item.price.toLocaleString("en")}
                  </p>
                </div>
                <p className="order-product-quantity">x{item.qty}</p>
              </div>
            ))}

            {cartItems.length > initialDisplayCount && (
              <div className="other-items" onClick={toggleExpand}>
                <p className="additional-items">
                  {isExpanded
                    ? "View less"
                    : `and ${
                        cartItems.length - initialDisplayCount
                      } other item(s)`}
                </p>
              </div>
            )}
          </div>
          <div
            className={`grand-total-container ${
              cartItems.length === 1 ? "single-item-padding" : ""
            }`}
          >
            <p className="grand-total-text">GRAND TOTAL</p>
            <p className="grand-total-price">
              $ {totalPrice.toLocaleString("en")}
            </p>
          </div>
        </div>

        <Link
          to={"/"}
          className="btn-1"
          style={{ width: "100%", textAlign: "center" }}
        >
          BACK TO HOME
        </Link>
      </div>
    </Modal>
  );
};

export default OrderConfirmationModal;
