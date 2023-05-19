import { toast } from "react-toastify";
import { api } from "../service/api";

export const getEquipments = async () => {
  try {
    const request = await api.get("/equipment");

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
        id: data.idSector
    },
    equipment_type: {
        id: data.idEquipmentType
    }
  };

  try {
    const request = await api.post("/equipment", newEquipment);

    if (request.status === 201) {
      toast.success("Equipamento adicionado com sucesso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return true;
    }
  } catch {
    toast.error("Valide os dados inseridos.", {
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

export const getEquipment = async (id) => {
  try {
    const request = await api.get(`/equipment/${id}`);

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

export const deleteEquipment = async (id) => {
  try {
    const request = await api.delete(`/equipment/${id}`);

    if (request.status === 200) {
      return true;
    }
  } catch {
    return false;
  }
};

export const updateEquipment = async (id, name, idSector, idEquipmentType) => {
  const updateEquipmentData = {
    id: id,
    name: name.trim(),
    sector: {
      id: idSector,
    },
    equipment_type: {
      id: idEquipmentType,
    },
  };

  try {
    const request = await api.put("/equipment", updateEquipmentData);

    if (request.status === 200) {
      toast.success("Equipamento atualizado com sucesso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return true;
    }
  } catch {
    toast.error("Valide os dados inseridos.", {
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
