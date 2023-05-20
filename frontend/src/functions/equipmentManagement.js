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
        id: parseInt(data.idSector)
    },
    equipment_type: {
        id: parseInt(data.idEquipmentType)
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

  console.log(updateEquipmentData);

  try {
    const request = await api.put("/equipment", updateEquipmentData);
    console.log(request.status);

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
