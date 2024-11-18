import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  clearFieldError,
  clearAllErrors,
} from "../redux/user/userSlice.js";
import Oauth from "../components/OAuth/Oauth.jsx";
import { notifyError, notifySuccess } from "../utils/toastNotifications.js";
import "../styles/auth.css";
import "../styles/form.css";

const LoginPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    // Clear all errors when the component mounts (e.g., page refresh)
    dispatch(clearAllErrors());
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Dispatch action to clear specific field error
    dispatch(clearFieldError(name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch(`${apiUrl}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();

      // Handle field-specific validation errors
      if (data.errors) {
        const errors = data.errors.reduce((acc, error) => {
          acc[error.field] = error.message;
          return acc;
        }, {});
        dispatch(signInFailure(errors));
        return;
      }

      if (data.success === false) {
        notifyError(data.message || "Login failed! Wrong credentials.");
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
      notifySuccess("You are now signed in");
    } catch (err) {
      notifyError(error || "Something went wrong! Please try again.");
      dispatch(signInFailure(err.message));
    }
  };

  return (
    <>
      <div className="site-heading">
        <h1 className="heading-title">Login</h1>
      </div>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <p>
            <label htmlFor="email">E-Mail</label>
            {error?.email && <span className="error">{error.email}</span>}
            <input
              type="email"
              name="email"
              id="email"
              className={error?.email ? "error-input" : ""}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            {error?.password && <span className="error">{error.password}</span>}
            <input
              type="password"
              name="password"
              id="password"
              className={error?.password ? "error-input" : ""}
              onChange={handleChange}
            />
          </p>
          <div className="form-actions">
            <button type="submit" className="btn-1 auth-btn">
              {loading ? "Loading..." : "Login"}
            </button>
            <Oauth />
          </div>

          <p className="btn-2 auth">
            <Link to="/register">Create a new user</Link>
            <img src="shared/icon-arrow-right.svg" alt="icon-arrow-right" />
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
