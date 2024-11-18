/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeAllItems,
} from "../../../redux/slices/cartSlice";
import "./CartModalContent.css";
import { Link } from "react-router-dom";

const CartModalContent = ({ cartItems, totalPrice, toggleCart }) => {
  const dispatch = useDispatch();

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = () => {
    dispatch(removeAllItems());
  };
  return (
    <div className="cart-modal">
      <div className="cart-modal-wrapper">
        <div className="cart-header">
          <h6>CART ({cartItems.length})</h6>
          <button onClick={() => handleRemove()} className="remove-btn">
            Remove all
          </button>
        </div>
        <ul className="cart-list">
          {cartItems.map((item, index) => (
            <li className="cart-item" key={index}>
              <img src={item.image} alt={item.name} />
              <div className="item-heading">
                <p className="item-title">
                  {item.name
                    .replace(/Headphones|Earphones|Speakers/g, "")
                    .trim()}
                </p>
                <p className="item-price">$ {item.price}</p>
              </div>
              <div className="product-quantity">
                <button
                  className="minus"
                  onClick={() => handleDecrement(item._id)}
                >
                  -
                </button>
                <span className="quantity">{item.qty}</span>
                <button
                  className="plus"
                  onClick={() => handleIncrement(item._id)}
                  disabled={item.qty >= item.stock}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="total">
          <p>TOTAL</p>
          <span className="total-price">
            $ {totalPrice.toLocaleString("en")}
          </span>
        </div>
        <Link to={"/checkout"} onClick={toggleCart} className="btn-1">
          Checkout
        </Link>
      </div>
      <div className="cart-modal-overlay" onClick={toggleCart}></div>
    </div>
  );
};

export default CartModalContent;
