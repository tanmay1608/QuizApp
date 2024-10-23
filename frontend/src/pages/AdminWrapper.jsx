import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLoaderData, useNavigate } from "react-router-dom";

const AdminWrapper = () => {
  const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const isVerfied = useLoaderData();

  return isVerfied && savedUser?.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default AdminWrapper;
