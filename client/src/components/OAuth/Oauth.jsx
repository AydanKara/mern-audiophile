import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../../utils/toastNotifications";

const Oauth = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch(`${apiUrl}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
        credentials: "include",
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
      notifySuccess("You are now signed in");
    } catch (error) {
      console.log("Could not connect to Google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="btn-1 btn-alt-3 auth-btn"
    >
      Continue with Google
    </button>
  );
};

export default Oauth;
