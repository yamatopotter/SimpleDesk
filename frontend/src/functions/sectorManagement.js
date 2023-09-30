import { api } from "../service/api";
import { getToken } from "./localstorage";
const baseURI = "/sector";

export const getSectors = async () => {
  try {
    const request = await api.get(baseURI, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    if (request.status === 200) {
      return request.data;
    }
  } catch {
    return false;
  }
};

export const addSector = async (data) => {
  try {
    const request = await api.post(baseURI, data);

    if (request.status === 201) {
      return true;
    }

    return false;
  } catch {
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

    if (request.status === 200) {
      return request.data;
    }

    return false;
  } catch {
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

    if (request.status === 204) {
      return true;
    }

    return false;
  } catch {
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

    if (request.status === 200) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
};
