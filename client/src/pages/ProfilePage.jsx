import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  clearAllErrors,
  clearFieldError,
  signInFailure,
} from "../redux/user/userSlice";
import { notifySuccess } from "../utils/toastNotifications";
import "../styles/profile-page.css";
import ConfirmModal from "../components/Modal/ConfirmModal";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username,
        email: currentUser.email,
      });
    }
    // Clear all errors when the component mounts (e.g., page refresh)
    dispatch(clearAllErrors());
  }, [currentUser, dispatch]);

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
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
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
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      notifySuccess("User updated successfully");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleConfirmDelete = () => {
    handleDelete();
    setShowModal(false); // Close modal after confirming
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  return (
    <main>
      <div className="site-heading">
        <h1 className="heading-title">{currentUser.username}`s Profile</h1>
      </div>
      <section className="container">
        <div className="profile-section-wrapper">
          <form className="form" onSubmit={handleSubmit}>
            <p className="input-box">
              <label htmlFor="email">E-Mail</label>
              {error?.email && <span className="error">{error.email}</span>}
              <input
                type="email"
                name="email"
                id="email"
                className={error?.email ? "error-input" : ""}
                defaultValue={currentUser.email}
                onChange={handleChange}
              />
            </p>
            <p className="input-box">
              <label htmlFor="username">Username</label>
              {error?.username && (
                <span className="error">{error.username}</span>
              )}
              <input
                type="text"
                name="username"
                id="username"
                defaultValue={currentUser.username}
                onChange={handleChange}
                className={error?.username ? "error-input" : ""}
              />
            </p>
            <p className="input-box">
              <label htmlFor="password">Password</label>
              {error?.password && (
                <span className="error">{error.password}</span>
              )}

              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                className={error?.password ? "error-input" : ""}
              />
            </p>
            <p className="input-box">
              <label htmlFor="repass">Confirm Password</label>
              {error?.repass && <span className="error">{error.repass}</span>}
              <input
                type="password"
                name="repass"
                id="repass"
                onChange={handleChange}
                className={error?.repass ? "error-input" : ""}
              />
            </p>
            <button disabled={loading} type="submit" className="btn-1">
              {loading ? "Loading..." : "Update"}
            </button>

            <div className="profile-actions">
              <span onClick={() => setShowModal(true)} className="btn-2">
                Delete Account
              </span>
              <span onClick={handleSignOut} className="btn-2">
                Sign out
              </span>
            </div>
          </form>
        </div>
      </section>

      {showModal && (
        <ConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </main>
  );
};

export default ProfilePage;
