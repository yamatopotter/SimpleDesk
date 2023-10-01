import { toast } from "react-toastify";
import { api } from "../service/api";
import { getToken } from "./localstorage";
const baseURI = "/ticketHistory";

export const getTicketHistoryByTicket = async (id) => {
  try {
    const request = await api.get(baseURI + "/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    });

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
  }
};

export const addTicketHistory = async (data, urlPhoto) => {
  const newTicketHistory = {
    description: data.description,
    urlPhoto: urlPhoto ? urlPhoto.trim() : null,
    ticket: {
      id: data.idTicket,
    },
    status: {
      id: data.status,
    },
  };

  try {
    const request = await api.get(baseURI, newTicketHistory, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    });

    if (request.status === 201) {
      return true;
    }
  } catch {
    return false;
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
  }
};
