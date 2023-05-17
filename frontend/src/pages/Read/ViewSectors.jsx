import { PencilSimpleLine, Plus, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useEffect, useState } from "react";
import { deleteSector, getSectors } from "../../functions/sectorManagement";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ViewSectors = () => {
  const [listSectors, setListSectors] = useState([]);
  const navigate = useNavigate();

  async function handleRemove(id) {
    const newListSectors = listSectors.filter((item) => item.id !== id);
    if (deleteSector(id)) {
      setListSectors(newListSectors);
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
    } else {
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
    }
  }

  useEffect(() => {
    async function getSectorList() {
      const data = await getSectors();
      setListSectors(data);
    }

    getSectorList();
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Setores</h1>

        <CommonButton
          id="btnAddSector"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/sector/new")}
        />
      </div>

      <ul>
        {listSectors.map((sector) => {
          return (
            <li className="py-3 flex flex-col gap-3" key={sector.id}>
              <span className="font-bold">#{sector.id}</span>
              <h2>{sector.name}</h2>
              <div className="flex justify-between gap-3">
                <CommonButton
                  id="btnEditSector"
                  name="btnEditSector"
                  content="Editar setor"
                  warn={true}
                  icon={<PencilSimpleLine size={24} />}
                  onClick={() => navigate(`/sector/update/${sector.id}`)}
                />

                <CommonButton
                  id="btnDeleteSector"
                  name="btnDeleteSector"
                  content="Excluir setor"
                  danger={true}
                  icon={<TrashSimple size={24} />}
                  onClick={() => handleRemove(sector.id)}
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
