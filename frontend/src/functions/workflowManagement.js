import { toast } from "react-toastify";
import { api } from "../service/api";
import { getToken } from "./localstorage";
const baseUrl = "/workflow";

export const getWorkflow = async () => {
  try {
    const request = await api.get(`${baseUrl}`);

    if (request.status === 200) {
      return request.data;
    }
  } catch {
    toast.error("Erro na comunicação com a API. Tente novamente.", {
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
