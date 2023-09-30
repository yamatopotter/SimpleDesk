import { toast } from "react-toastify";
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
  } catch {
    return false;
  }
};

export const updateEquipment = async (id, data) => {
  const updateEquipmentData = {
    id: parseInt(id),
    name: data.name.trim(),
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
    console.log(request.status);

    if (request.status === 200) {
      return true;
    }
  } catch {
    return false;
  }
};
