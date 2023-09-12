import { toast } from "react-toastify";
import { api } from "../service/api";
const baseUrl = "/status";

export const getStatuses = async () => {
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

export const addStatus = async (data) => {
  const newStatus = {
    name: data.name.trim(),
    workflow: {id: data.workflow},
  };

  try {
    const request = await api.post(`${baseUrl}`, newStatus);

    if (request.status === 201) {
      toast.success("Status adicionado com sucesso", {
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

export const getStatus = async (id) => {
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

export const deleteStatus = async (id) => {
  try {
    const request = await api.delete(`${baseUrl}/${id}`);

    if (request.status === 200) {
      return true;
    }
  } catch {
    return false;
  }
};

export const updateStatus = async (data) => {
  const updateStatusData = {
    id: data.id,
    name: data.name.trim(),
    workflow: { id: data.workflow },
  };

  try {
    const request = await api.put(`${baseUrl}`, updateStatusData);

    if (request.status === 200) {
      toast.success("Status atualizado com sucesso", {
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
