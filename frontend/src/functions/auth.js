import { toast } from "react-toastify";
import { api } from "../service/api";
import { getToken, setToken } from "./localstorage";

export const authUser = async (data) => {
  const loginData = {
    email: data.email.trim(),
    password: data.password.trim(),
  };

  try {
    const response = await api.post("/authentication/login", loginData);

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
      await getData();

      return true;
    }
  } catch {
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
    const response = await api.get("/authentication", {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    if (response.status === 200) {
      setUserData(response.data);
      setIsAuthenticated(true);
    }
  } else {
    deleteToken();
    setIsAuthenticated(false);
  }
}

export const RegisterUser = async (data) => {
  const newUser = {
    name: data.name.trim(),
    email: data.email.trim(),
    password: data.password.trim(),
    phone: data.phone.trim(),
    role: "USER",
  };

  try {
    const response = await api.post("/authentication/register", newUser);
    if (response.status === 201) {
      toast.success("Usuário registrado com sucesso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (e) {
    toast.error(
      "Falha ao adicionar o usuário, verifique se todas as informações foram preenchidas",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  }
};
