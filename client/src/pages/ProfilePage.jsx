import { useState } from "react";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import AuthContext from "../context/authContext";
// import * as cartService from "../services/cartService";
// import * as likeService from "../services/likeService";
// import * as productService from "../services/productService";
import "../styles/profile-page.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const ProfilePage = () => {
  // const { userId, isAuthenticated, username } = useContext(AuthContext);
  // const [cartItems, setCartItems] = useState([]);
  // const [likedItems, setLikedItems] = useState([]);

  /*   useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        try {
          // Fetch cart items
          const cartItems = await cartService.getCartItems(userId);
          const cartProductDetails = await Promise.all(
            cartItems.map((item) => productService.getOne(item.productId))
          );
          setCartItems(cartProductDetails);

          // Fetch liked items
          const likes = await likeService.getUserLikes(userId);
          const likedProductDetails = await Promise.all(
            likes.map((like) => productService.getOne(like.productId))
          );
          setLikedItems(likedProductDetails);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [userId, isAuthenticated]); */

  /*   if (!isAuthenticated) {
    return <p>You must be logged in to view your profile.</p>;
  } */

  /*   const getSliderSettings = (items) => ({
    dots: true,
    infinite: items.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, items.length),
    slidesToScroll: 3,
    initialSlide: 0,
    appendDots: (dots) => (
      <div style={{ position: "relative" }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  }); */

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <main>
      <div className="site-heading">
        <h1 className="heading-title">{currentUser.username}`s Profile</h1>
      </div>
      <section className="container">
        <div className="profile-section-wrapper">
          <form onSubmit={handleSubmit}>
            <p className="input-box">
              <label htmlFor="email">E-Mail</label>
              {/*  {errors.email && <span className="error">{errors.email}</span>} */}
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={currentUser.email}
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
                defaultValue={currentUser.username}
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
              {loading ? "Loading..." : "Update"}
            </button>
            {error && <p className="error">{error}</p>}
            {updateSuccess && (
              <p className="success">User is updated Successfully!</p>
            )}
            <div className="profile-actions">
              <span className="btn-2">Delete Account</span>
              <span className="btn-2">Sign out</span>
            </div>
          </form>
          {/* <div className="profile-products">
            <h3>Products in Cart</h3>
            {cartItems.length > 0 ? (
              <Slider {...getSliderSettings(cartItems)}>
                {cartItems.map((item) => (
                  <div key={item._id} className="profile-products-item">
                    <div className="profile-products-media">
                      <img src={item.image} alt="Product Image" />
                    </div>
                    <h5>{item.name}</h5>
                    <Link to={`/catalog/${item._id}/details`} className="btn-1">
                      See Product
                    </Link>
                  </div>
                ))}
              </Slider>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          <div className="profile-products">
            <h3>Liked Products</h3>
            {likedItems.length > 0 ? (
              <Slider {...getSliderSettings(likedItems)}>
              {likedItems.map((item) => (
                <div key={item._id} className="profile-products-item">
                  <div className="profile-products-media">
                    <img src={item.image} alt="Product Image" />
                  </div>
                  <h5>{item.name}</h5>
                  <Link to={`/catalog/${item._id}/details`} className="btn-1">
                    See Product
                  </Link>
                </div>
              ))}
            </Slider>
            ) : (
              <p>You haven`t liked any products yet.</p>
            )}
          </div> */}
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
