import { toast } from "react-toastify";
import { api } from "../service/api";
import { deleteToken, getToken, setToken } from "./localstorage";
const baseURI = "/authentication";

export const authUser = async (data, setIsAuthenticated, setUsetData) => {
  const loginData = {
    email: data.email.trim(),
    password: data.password.trim(),
  };

  try {
    const response = await api.post(baseURI + "/login", loginData);

    if (response.status === 200) {
      toast.success("Login realizado com sucesso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setToken(response.data.token);
      await getUserData(setIsAuthenticated, setUsetData);

      return true;
    }
  } catch (e) {
    console.log(e);
    toast.error("Falha ao realizar login, verifique o usuário e senha", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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
    if (response.status === 201) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const logoutUser = (setIsAuthenticated, setUserData) => {
  setIsAuthenticated(false);
  setUserData({});
  deleteToken();

  return true;
};
