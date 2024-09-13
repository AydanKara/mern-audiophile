// import { useContext } from "react";
// import AuthContext from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthGuard() {
  // const { isAuthenticated } = useContext(AuthContext);
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
