import axios from "axios";
import { PORT } from "../utils/constants";

export const verfiyUserRole = async () => {
  const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  if (savedUser) {
    try {
      const response = await axios.post(
        `http://localhost:${PORT}/api/user`,
        { role: savedUser?.role },
        { withCredentials: true }
      );

      if (!response?.data?.isVerfied) localStorage.removeItem("user");
      return response?.data?.isVerfied;
    } catch (error) {
      return false;
    }
  }

  return false;
};
