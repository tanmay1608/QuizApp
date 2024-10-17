import axios from "axios";
import { PORT } from "../utils/constants";

export const fetchUserInfo = async (paramsObject) => {
  console.log(paramsObject);
  const userInfo = await axios.get(
    `http://localhost:${PORT}/api/user/${paramsObject?.params?.id}`
  );
  return userInfo.data.user;
};
