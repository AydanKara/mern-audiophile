import { Link } from "react-router-dom";
import "../styles/error-page.css";

const ErrorPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-description">
          Oops! The page you are looking for does not exist.
        </p>
        <Link className="btn-1" style={{ margin: "0 auto" }} to={"/"}>
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
