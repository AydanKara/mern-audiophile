import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "../components/OAuth/Oauth";
import {
  clearAllErrors,
  clearFieldError,
  signInFailure,
  signInStart,
  signUpSuccess,
} from "../redux/user/userSlice";
import { notifyError, notifyInfo } from "../utils/toastNotifications";
import "../styles/auth.css";
import "../styles/form.css";

const RegisterPage = () => {
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
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // Check for field-specific validation errors
      if (data.errors) {
        // Create an object mapping field names to error messages
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
      dispatch(signUpSuccess());
      navigate("/login");
      notifyInfo("You can now login with your email and password")
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };

  return (
    <>
      <div className="site-heading">
        <h1 className="heading-title">Create new Account</h1>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <p className="input-box">
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
        <p className="input-box">
          <label htmlFor="username">Username</label>
          {error?.username && <span className="error">{error.username}</span>}
          <input
            type="text"
            name="username"
            id="username"
            className={error?.username ? "error-input" : ""}
            onChange={handleChange}
          />
        </p>
        <p className="input-box">
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
        <p className="input-box">
          <label htmlFor="repass">Confirm Password</label>
          {error?.repass && <span className="error">{error.repass}</span>}
          <input
            type="password"
            name="repass"
            id="repass"
            className={error?.repass ? "error-input" : ""}
            onChange={handleChange}
          />
        </p>
        <button disabled={loading} type="submit" className="btn-1">
          {loading ? "Loading..." : "Create Account"}
        </button>
        <Oauth />
        <p className="btn-2 auth">
          <Link to="/login">Login instead</Link>
          <img src="shared/icon-arrow-right.svg" alt="icon-arrow-right" />
        </p>
      </form>
    </>
  );
};

export default RegisterPage;
