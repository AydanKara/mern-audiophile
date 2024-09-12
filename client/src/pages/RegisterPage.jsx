import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import "../styles/form.css";
import { useState } from "react";
import Oauth from "../components/OAuth/Oauth";
/* import AuthContext from "../context/authContext";
import useRegisterForm from "../hooks/useRegisterForm"; */

const RegisterPage = () => {
  /*  const { registerSubmitHandler } = useContext(AuthContext);
  const { values, errors, serverError, onChange, onSubmit } = useRegisterForm(
    registerSubmitHandler
  ); */

  const navigate = useNavigate()
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null)
      navigate("/login")
      console.log(data);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <>
      <div className="site-heading">
        <h1 className="heading-title">Create new Account</h1>
      </div>
       {error && (
        <div className="alert">
          <h2>{error}</h2>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <p className="input-box">
          <label htmlFor="email">E-Mail</label>
          {/*  {errors.email && <span className="error">{errors.email}</span>} */}
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}

            /* className={errors.email ? "error-input" : ""} */
          />
        </p>
        <p className="input-box">
          <label htmlFor="username">Username</label>
          {/*   {errors.username && <span className="error">{errors.username}</span>} */}

          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}

            /* className={errors.username ? "error-input" : ""} */
          />
        </p>
        <p className="input-box">
          <label htmlFor="password">Password</label>
          {/* {errors.password && <span className="error">{errors.password}</span>} */}

          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}

            /*  className={errors.password ? "error-input" : ""} */
          />
        </p>
        <p className="input-box">
          <label htmlFor="repass">Confirm Password</label>
          {/*  {errors.repass && <span className="error">{errors.repass}</span>} */}

          <input
            type="password"
            name="repass"
            id="repass"
            onChange={handleChange}

            /*  className={errors.repass ? "error-input" : ""} */
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
