/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./ProductItem.css";
import { useEffect, useState } from "react";

const ProductItem = ({ product, isReversed }) => {
  const [isReversedActive, setIsReversedActive] = useState(() => {
    // Initial state check for window size
    return window.innerWidth > 992 ? isReversed : false;
  });

  useEffect(() => {
    const handleResize = () => {
      // Automatically runs when the component re-renders due to state change
      setIsReversedActive(window.innerWidth > 992 ? isReversed : false);
    };

    handleResize(); // Run the check on component mount

    // Instead of adding a listener, re-run `handleResize` when the window size changes due to rerenders
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.body);

    // Cleanup when component unmounts
    return () => resizeObserver.disconnect();
  }, [isReversed]);
  return (
    <li className="product-item">
      <article>
        <div
          className={`products-wrapper ${isReversedActive ? "reversed" : ""}`}
        >
          {isReversedActive ? (
            <>
              <div className="col-2">
                <div className={`product-info margin-unset`}>
                  <h2>{product.name}</h2>
                  <p className="product-desc">{product.description}</p>
                  <Link to={`/product/${product._id}`} className="btn-1">
                    See Product
                  </Link>
                </div>
              </div>
              <div className="col-1">
                <div className="product-image">
                  <img
                    src={product.image}
                    srcSet={`${product.imageTablet} 768w`}
                    alt=""
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-1">
                <div className="product-image">
                  <img
                    src={product.image}
                    srcSet={`${product.imageTablet} 768w`}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-2">
                <div className="product-info">
                  <h2>{product.name}</h2>
                  <p className="product-desc">{product.description}</p>
                  <Link to={`/product/${product._id}`} className="btn-1">
                    See Product
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </article>
    </li>
  );
};

export default ProductItem;
