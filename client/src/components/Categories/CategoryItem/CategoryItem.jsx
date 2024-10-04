/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import "./CategoryItem.css";

const CategoryItem = ({ img, name }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/catalog/${name}`)} className="category-cart">
      <div className="category-img-wrapper">
        <img className="category-img" src={img} alt={name} />
      </div>
      <div className="category-title">
        <h6>{name}</h6>
        <p className="btn-2">
          <Link to={`/catalog/${name}`}>Shop</Link>
          <img src="/shared/icon-arrow-right.svg" alt="icon-arrow-right" />
        </p>
      </div>
    </div>
  );
};

export default CategoryItem;
