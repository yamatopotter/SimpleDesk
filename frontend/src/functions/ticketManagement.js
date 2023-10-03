import { api } from "../service/api";
import { getToken } from "./localstorage";
import { showToast } from "./message";
const baseURI = "/ticket";

export const getTicket = async (id) => {
  try {
    const request = await api.get(baseURI + "/" + id, {
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

export const getTickets = async () => {
  try {
    const request = await api.get(baseURI, {
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

export const getTicketsByWorkflow = async (workflow) => {
  try {
    const request = await api.get(baseURI + "/workflow/" + workflow, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    return request.data;
  } catch (err) {
    showToast(err);
    return [];
  }
};

export const addTicket = async (data, imgUrl) => {
  const newTicket = {
    title: data.title.trim(),
    description: data.description ? data.description.trim() : "",
    urlPhoto: imgUrl ? imgUrl.trim() : "",
    equipment: {
      id: parseInt(data.idEquipment),
    },
    status: {
      id: 1,
    },
  };

  try {
    const request = await api.post(baseURI, newTicket, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    showToast(request);
    return true;
  } catch (err) {
    showToast(err);
    return false;
  }
};

export const deleteTicket = async (id) => {
  try {
    const request = await api.delete(baseURI + "/" + id, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    showToast(request);
    return true;
  } catch (err) {
    showToast(err);
    return false;
  }
};
