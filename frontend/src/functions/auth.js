import { toast } from "react-toastify";
import { api } from "../service/api";

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
  }
};
