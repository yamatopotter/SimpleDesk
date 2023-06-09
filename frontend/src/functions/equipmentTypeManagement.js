import { toast } from "react-toastify";
import { api } from "../service/api";
const baseUrl = "/equipmentType";

export const getEquipmentsType = async () => {
  try {
    const request = await api.get(`${baseUrl}`);

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

export const addEquipementType = async (data) => {
  const newEquipementType = {
    name: data.name.trim(),
  };

  try {
    const request = await api.post(`${baseUrl}`, newEquipementType);

    if (request.status === 201) {
      toast.success("Tipo de equipamento adicionado com sucesso", {
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

export const getEquipmentType = async (id) => {
  try {
    const request = await api.get(`${baseUrl}/${id}`);

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

export const deleteEquipmentType = async (id) => {
  try {
    const request = await api.delete(`${baseUrl}/${id}`);

    if (request.status === 200) {
      return true;
    }
  } catch {
    return false;
  }
};

export const updateEquipmentType = async (name, id) => {
  const updateEquipmentTypeData = {
    id: id,
    name: name.trim(),
  };

  try {
    const request = await api.put(`${baseUrl}`, updateEquipmentTypeData);

    if (request.status === 200) {
      toast.success("Tipo de equipamento atualizado com sucesso", {
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
