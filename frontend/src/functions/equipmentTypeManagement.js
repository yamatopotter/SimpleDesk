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
  const newSector = {
    name: data.name.trim(),
  };

  try {
    const request = await api.post(`${baseUrl}`, newSector);

    if (request.status === 201) {
      toast.success("Setor adicionado com sucesso", {
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

export const deleteSector = async (id) => {
  try {
    const request = await api.delete(`${baseUrl}/${id}`);

    if (request.status === 200) {
      toast.success("Setor excluído com sucesso", {
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
    toast.error(
      "Não é possivel excluir porque há informações vinculadas a esse setor",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
    return false;
  }
};

export const updateEquipmentType = async (name, id) => {
  const updateSectorData = {
    id: id,
    name: name.trim(),
  };

  try {
    const request = await api.put(`${baseUrl}`, updateSectorData);

    if (request.status === 200) {
      toast.success("Setor atualizado com sucesso", {
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
