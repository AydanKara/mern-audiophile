import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthGuard() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}
