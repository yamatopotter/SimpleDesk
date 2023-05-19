import { PencilSimpleLine, Plus, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { toast } from "react-toastify";
import { deleteStatus, getStatuses } from "../../functions/statusManagement";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ViewStatuses = () => {
  const [listStatuses, setListStatuses] = useState([]);
  const navigate = useNavigate();

  async function handleRemove(id) {
    const newListStatuses = listStatuses.filter((item) => item.id !== id);
    if (deleteStatus(id)) {
      setListStatuses(newListStatuses);
      toast.success("Status excluído com sucesso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(
        "Não é possivel excluir porque há informações vinculadas a esse status",
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
    }
  }

  useEffect(() => {
    async function getStatusesList() {
      const data = await getStatuses();
      setListStatuses(data);
    }

    getStatusesList();
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Status</h1>
        <CommonButton
          id="btnAddStatus"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/status/new")}
        />
      </div>

      <ul>
        {listStatuses.map((status) => {
          return (
            <li className="py-3 flex flex-col gap-3" key={status.id}>
              <span className="font-bold">#{status.id}</span>
              <h2>{status.name}</h2>
              <div className="flex justify-between gap-3">
                <CommonButton
                  id="btnEditStatus"
                  name="btnEditStatus"
                  content="Editar staus"
                  warn={true}
                  icon={<PencilSimpleLine size={24} />}
                  onClick={() => navigate(`/status/update/${status.id}`)}
                />

                <CommonButton
                  id="btnDeleteStatus"
                  name="btnDeleteStatus"
                  content="Excluir staus"
                  danger={true}
                  icon={<TrashSimple size={24} />}
                  onClick={() => handleRemove(status.id)}
                />
              </div>
              <hr></hr>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
