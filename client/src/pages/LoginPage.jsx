import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import "../styles/form.css";
import { useState } from "react";
/* import AuthContext from "../context/authContext";
import useLoginForm from "../hooks/useLoginForm"; */

const LoginPage = () => {
  /*   const { loginSubmitHandler } = useContext(AuthContext);
  const { values, errors, serverError, onChange, onSubmit } =
    useLoginForm(loginSubmitHandler); */

  const navigate = useNavigate();
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
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(res)
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
      
    } catch (err) {
      setLoading(false);
      setError(err.message);
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
