import { api } from "../service/api";
import { getToken } from "./localstorage";
import { showToast } from "./message";
const baseURI = "/status";

export const getStatuses = async () => {
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

export const addStatus = async (data) => {
  const newStatus = {
    name: data.name.trim(),
    workflow: { id: data.workflow },
  };

  try {
    const request = await api.post(baseURI, newStatus, {
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

export const getStatus = async (id) => {
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

export const deleteStatus = async (id) => {
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

export const updateStatus = async (data) => {
  const updateStatusData = {
    id: data.id,
    name: data.name,
    workflow: { id: data.workflow },
  };

  try {
    const request = await api.put(baseURI, updateStatusData, {
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
