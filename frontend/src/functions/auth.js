import { toast } from "react-toastify";
import { api } from "../service/api";
import { deleteToken, getToken, setToken } from "./localstorage";
import { showToast } from "./message";
const baseURI = "/authentication";

export const authUser = async (data, setIsAuthenticated, setUsetData) => {
  const loginData = {
    email: data.email.trim(),
    password: data.password.trim(),
  };

  try {
    const response = await api.post(baseURI + "/login", loginData);

    setToken(response.data.token);
    await getUserData(setIsAuthenticated, setUsetData);

    return true;
  } catch (e) {
    showToast(e);
    return false;
  }
};

export async function getUserData(setIsAuthenticated, setUserData) {
  const userToken = getToken();

  if (userToken) {
    try {
      const response = await api.get("/authentication", {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (response.status === 200) {
        setUserData(response.data);
        setIsAuthenticated(true);
      }

      return true;
    } catch {
      deleteToken();
      setIsAuthenticated(false);
      return false;
    }
  } else {
    deleteToken();
    setIsAuthenticated(false);
    return false;
  }
}

export const registerUser = async (data) => {
  try {
    const response = await api.post(baseURI + "/register", data, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });
    showToast(response);
    return true;
  } catch (err) {
    showToast(err);
    return false;
  }
};

export const logoutUser = (setIsAuthenticated, setUserData) => {
  setIsAuthenticated(false);
  setUserData({});
  deleteToken();

  return true;
};
