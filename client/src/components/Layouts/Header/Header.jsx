import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Dropdown } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import "./Header.css";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../../../redux/user/userSlice";
import { useState } from "react";
import CartModalContent from "../../Modal/CartModalContent/CartModalContent";

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  const [cartVisible, setCartVisible] = useState(false);

  const toggleCart = () => {
    setCartVisible(!cartVisible);
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

  // Menu items for profile dropdown
  const profileMenuItems = currentUser
    ? [
        {
          key: "profile",
          label: <NavLink to="/profile">Profile</NavLink>,
        },
        {
          key: "logout",
          label: <NavLink onClick={handleSignOut}>Logout</NavLink>,
        },
      ]
    : [
        {
          key: "login",
          label: <NavLink to="/login">Login</NavLink>,
        },
        {
          key: "register",
          label: <NavLink to="/register">Register</NavLink>,
        },
      ];

  const profileMenu = { items: profileMenuItems };

  return (
    <header>
      <div className="container">
        <div id="header-wrapper">
          <NavLink className="logo" to="/">
            <img src="/shared/logo.svg" alt="website logo" />
          </NavLink>
          <nav>
            <ul id="nav-list">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  HOME
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/catalog/headphones"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Headphones
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/catalog/speakers"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Speakers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/catalog/earphones"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Earphones
                </NavLink>
              </li>
              {currentUser?.isAdmin && (
                <>
                  <li
                    className="nav-item"
                    style={{ marginInline: "auto 1rem" }}
                  >
                    <NavLink
                      to="/admin"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Admin
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Profile Dropdown */}
            <Dropdown menu={profileMenu} placement="bottomRight">
              <Button
                type="text"
                icon={
                  <UserOutlined style={{ fontSize: "2rem", color: "#fff" }} />
                }
              />
            </Dropdown>

            {/* Cart Icon */}

            <Badge
              count={totalQuantity}
              style={{ backgroundColor: "#f0f0f0", color: "black" }}
            >
              <ShoppingCartOutlined
                style={{ fontSize: "2.4rem", color: "#fff" }}
                onClick={toggleCart}
              />
            </Badge>
          </div>
          {/* Cart Modal */}
          {cartVisible && (
            <CartModalContent
              cartItems={cartItems}
              toggleCart={toggleCart}
              totalPrice={totalPrice}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
