import { Navigate, Outlet, useNavigate } from "react-router-dom";


const AdminWrapper = () => { 
  const role=localStorage.getItem("role");
  console.log(role);
  return role === "admin" ? <Outlet/> : <Navigate to={"/login"}/>;

};

export default AdminWrapper;
