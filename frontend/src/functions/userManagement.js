import { toast } from "react-toastify";
import { api } from "../service/api";
import { getToken } from "./localstorage";
import { get } from "react-hook-form";
const baseURI = "/user";

export const getUsers = async () => {
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

// export const addUser = async (data, imgUrl, userId) => {
//   const newTicket = {
//     title: data.title.trim(),
//     description: data.description ? data.description.trim() : "",
//     urlPhoto: imgUrl ? imgUrl.trim() : "",
//     user: {
//       id: parseInt(userId),
//     },
//     equipment: {
//       id: parseInt(data.idEquipment),
//     },
//     status: {
//       id: 1,
//     },
//   };

//   try {
//     const request = await api.post(`${baseUrl}`, newTicket, {
//       headers: {
//         Authorization: "Bearer " + getToken(),
//       },
//     });

//     if (request.status === 201) {
//       toast.success("Chamado criado com sucesso", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       return true;
//     }
//   } catch {
//     toast.error("Valide os dados inseridos.", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//     return false;
//   }
// };

export const getUser = async (id) => {
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
    return false;
  }
};

export const deleteUser = async (id) => {
  try {
    // todo: Conferir se o usuário não está querendo se excluir
    const request = await api.delete(baseURI + "/" + id, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    if (request.status === 200) {
      return true;
    }
  } catch {
    return false;
  }
};

export const updateUser = async (data) => {
  try {
    const request = await api.put(`${baseUrl}`, updateUserData);
    console.log(request.status);

    if (request.status === 200) {
      toast.success("Chamado atualizado com sucesso", {
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
