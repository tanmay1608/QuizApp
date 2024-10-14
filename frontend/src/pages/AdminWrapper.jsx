import { Navigate, Outlet, useNavigate } from "react-router-dom";

const AdminWrapper = () => {
  const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  return savedUser?.role === "admin" ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AdminWrapper;
