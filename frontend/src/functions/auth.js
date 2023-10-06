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
    const limiteDeTempo = 7000;
    const temporizador = setTimeout(() => {
      toast.warn(
        "Por favor, aguarde mais um pouco, nosso servidor está ligando...",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }, limiteDeTempo);

    const response = await api.post(baseURI + "/login", loginData);

    clearTimeout(temporizador);

    setToken(response.data.token);
    await getUserData(setIsAuthenticated, setUsetData);

    return true;
  } catch (e) {
    clearTimeout(temporizador);
    showToast(e);
    return false;
  }
};

export async function getUserData(setIsAuthenticated, setUserData) {
  const limiteDeTempo = 7000;
  const temporizador = setTimeout(() => {
    toast.warn(
      "Por favor, aguarde mais um pouco, nosso servidor está ligando...",
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  }, limiteDeTempo);

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

      clearTimeout(temporizador);
      return true;
    } catch {
      deleteToken();
      setIsAuthenticated(false);
      return false;
    }
  } else {
    clearTimeout(temporizador);
    deleteToken();
    setIsAuthenticated(false);
    return false;
  }
}

export async function updateLiveUserData(userData, setUserData) {
  setUserData(userData);
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
