import { api } from "../service/api";
import { getToken } from "./localstorage";
import { showToast } from "./message";
const baseURI = "/sector";

export const getSectors = async () => {
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

export const addSector = async (data) => {
  try {
    const request = await api.post(baseURI, data, {
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

export const getSector = async (id) => {
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

export const deleteSector = async (id) => {
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

export const updateSector = async (data) => {
  try {
    const request = await api.put(baseURI, data, {
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
