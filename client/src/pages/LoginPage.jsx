import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import "../styles/auth.css";
import "../styles/form.css";
/* import AuthContext from "../context/authContext";
import useLoginForm from "../hooks/useLoginForm"; */

const LoginPage = () => {
  /*   const { loginSubmitHandler } = useContext(AuthContext);
  const { values, errors, serverError, onChange, onSubmit } =
    useLoginForm(loginSubmitHandler); */

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(res);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };
  return (
    <>
      <div className="site-heading">
        <h1 className="heading-title">Login</h1>
      </div>
      {error && (
        <div className="alert">
          <h2>{error}</h2>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">E-Mail</label>
          {/* {errors.email && <span className="error">{errors.email}</span>} */}
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}

            /* className={
              errors.email
                ? "error-input"
                : "" || serverError
                ? "error-input"
                : ""
            } */
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          {/* {errors.password && <span className="error">{errors.password}</span>} */}
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            /* className={
              errors.password
                ? "error-input"
                : "" || serverError
                ? "error-input"
                : ""
            } */
          />
        </p>
        <button type="submit" className="btn-1">
          {loading ? "Loading..." : "Login"}
        </button>
        <p className="btn-2 auth">
          <Link to="/register">Create a new user</Link>
          <img src="shared/icon-arrow-right.svg" alt="icon-arrow-right" />
        </p>
      </form>
    </>
  );
};

export default LoginPage;
