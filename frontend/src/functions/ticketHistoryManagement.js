import { api } from "../service/api";
import { getToken } from "./localstorage";
import { showToast } from "./message";
const baseURI = "/ticketHistory";

export const getTicketHistoryByTicket = async (id) => {
  try {
    const request = await api.get(baseURI + "/ticket/" + id, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    return request.data;
  } catch (err) {
    showToast(err);
    return false;
  }
};

export const addTicketHistory = async (data, urlPhoto) => {
  const newTicketHistory = {
    description: data.description,
    urlPhoto: urlPhoto ? urlPhoto.trim() : null,
    ticket: {
      id: parseInt(data.idTicket),
    },
    status: {
      id: parseInt(data.status),
    },
  };

  try {
    const request = await api.post(baseURI, newTicketHistory, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    });

    showToast(request);
    return true;
  } catch (err) {
    showToast(err);
    return false;
  }
};
