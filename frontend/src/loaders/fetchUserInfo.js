import axios from "axios";

export const fetchUserInfo = async (paramsObject) => {
  console.log(paramsObject);
  const userInfo = await axios.get(
    `http://localhost:8000/api/user/${paramsObject?.params?.id}`
  );
  return userInfo.data.user;
};
