import { api } from "../service/api";
import { getToken } from "./localstorage";
const baseURI = "/equipment";

export const getEquipments = async () => {
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

    return false;
  } catch {
    return false;
  }
};

export const getEquipment = async (id) => {
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
    return false
  }
};

export const addEquipment = async (data) => {
  const newEquipment = {
    name: data.name.trim(),
    sector: {
      id: parseInt(data.idSector),
    },
    equipment_type: {
      id: parseInt(data.idEquipmentType),
    },
  };

  try {
    const request = await api.post(baseURI, newEquipment, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    if (request.status === 201) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
};

export const deleteEquipment = async (id) => {
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

export const updateEquipment = async (data) => {
  const updateEquipmentData = {
    id: data.id,
    name: data.name,
    sector: {
      id: parseInt(data.idSector),
    },
    equipment_type: {
      id: parseInt(data.idEquipmentType),
    },
  };

  try {
    const request = await api.put(baseURI, updateEquipmentData, {
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
