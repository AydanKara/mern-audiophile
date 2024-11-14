import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Dropdown, Modal } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import "./Header.css";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../../../redux/user/userSlice";
import { useState } from "react";
import CartModalContent from "../../Modal/CartModalContent/CartModalContent";
import { notifySuccess } from "../../../utils/toastNotifications";
import Categories from "../../Categories/Categories";

const Header = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`${apiUrl}/api/auth/signout`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      notifySuccess("You are now signed out");
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
        <div className="header-wrapper">
          <div className="hamburger-menu" onClick={toggleMobileMenu}>
            <img src="/shared/icon-hamburger.svg" alt="hamburger icon" />
          </div>
          <NavLink className="logo" to="/">
            <img src="/shared/logo.svg" alt="website logo" />
          </NavLink>
          <nav>
            <ul className="nav-list">
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
            </ul>
          </nav>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginLeft: "auto",
            }}
          >
            {currentUser?.isAdmin && (
              <>
                <div className="nav-item" style={{ marginInline: "auto 1rem" }}>
                  <NavLink
                    to="/admin"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Admin
                  </NavLink>
                </div>
              </>
            )}
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

          {/* Mobile Menu Modal */}
          <Modal
            open={mobileMenuVisible}
            onCancel={toggleMobileMenu}
            footer={null}
            className="mobile-menu-modal"
          >
            <Categories closeMenu={toggleMobileMenu} />
          </Modal>
        </div>
      </div>
    </header>
  );
};

export default Header;
