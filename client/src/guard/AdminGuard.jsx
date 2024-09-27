import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminGuard = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser && currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminGuard;
