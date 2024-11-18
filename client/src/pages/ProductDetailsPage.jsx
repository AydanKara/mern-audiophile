import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message, Spin } from "antd";
import { addToCart } from "../redux/slices/cartSlice";

import Categories from "../components/Categories/Categories";
import ShopInfo from "../components/Layouts/ShopInfo/ShopInfo";
import ProductGallery from "../components/ProductGallery/ProductGallery";
import ProductOthers from "../components/ProductOthers/ProductOthers";
/* import CommentList from "../components/CommentList/CommentList";
import CommentForm from "../components/CommentForm/CommentForm"; */
import { notifySuccess, notifyWarning } from "../utils/toastNotifications";

import "../styles/product-details.css";

const ProductDetailsPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { currentUser } = useSelector((state) => state.user);

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/product/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setDataSource(data);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [apiUrl, id]);

  const handleAddToCart = () => {
    const itemToAdd = {
      _id: dataSource._id,
      name: dataSource.name,
      price: dataSource.price,
      qty: quantity,
      image: dataSource.image,
      stock: dataSource.stock,
    };

    dispatch(addToCart(itemToAdd));
    notifySuccess(`Added ${quantity} of ${dataSource.name} to the cart.`);
  };

  const incrementQuantity = () => {
    if (quantity < dataSource.stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      notifyWarning("You've reached the maximum stock limit.");
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <main>
      <section className="container">
        <Spin spinning={loading}>
          <div className="products-container">
            <button className="btn-back go-back" onClick={() => navigate(-1)}>
              Go Back
            </button>
            <div className="product-list">
              <div className="product-item">
                <article>
                  <ul className="product-wrapper">
                    <li className="col-1">
                      <div className="product-image">
                        <img src={dataSource.image} alt={dataSource.name} />
                      </div>
                    </li>
                    <li className="col-2">
                      <div className="product-info">
                        <h2>{dataSource.name}</h2>
                        <p className="product-desc">{dataSource.description}</p>
                        <h6>$ {dataSource.price?.toLocaleString("en")}</h6>
                        <div className="product-action">
                          <div className="product-quantity">
                            <button
                              className="minus"
                              onClick={decrementQuantity}
                              disabled={quantity <= 1}
                            >
                              -
                            </button>
                            <span className="quantity">{quantity}</span>
                            <button
                              className="plus"
                              onClick={incrementQuantity}
                              disabled={quantity >= dataSource.stock}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="btn-1"
                            onClick={handleAddToCart}
                            disabled={dataSource.stock < 1}
                          >
                            ADD TO CART
                          </button>
                        </div>

                        <p className="stock">Available: {dataSource.stock}</p>
                      </div>
                    </li>
                  </ul>
                  <ul className="product-details">
                    <li className="features">
                      <h3>Features</h3>
                      <p>{dataSource.features}</p>
                    </li>
                    <li className="in-the-box">
                      <h3>In The Box</h3>
                      <ul className="product-includes">
                        {dataSource.inTheBox?.map((item) => (
                          <li className="include-item" key={item._id}>
                            <span>{item.quantity}x</span>
                            <p>{item.item}</p>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </Spin>
      </section>
      <section className="container">
        <ProductGallery product={dataSource} />
      </section>
      <section className="container">
        <ProductOthers excludeProductId={dataSource._id} />
      </section>
      <div className="container">
        <Categories />
      </div>
      <ShopInfo />
      {/* <li className="comment-write">
                      <h3>write a comment:</h3>
                      { {currentUser ? (
                        <CommentForm />
                      ) : (
                        <p className="not-logged">
                          You must be logged in to be able to write a comment.
                        </p>
                      )} 
                    </li> */}
      {/* <h5>Comments:</h5>
                 <CommentList /> */}
    </main>
  );
};

export default ProductDetailsPage;
