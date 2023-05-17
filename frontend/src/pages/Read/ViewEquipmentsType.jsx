import { PencilSimpleLine, Plus, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteEquipmentType,
  getEquipmentsType,
} from "../../functions/equipmentTypeManagement";
import { toast } from "react-toastify";

export const ViewEquipmentsType = () => {
  const [listEquipmentType, setListEquipmentsType] = useState([]);
  const navigate = useNavigate();

  async function handleRemove(id) {
    const newListEquipmentType = listEquipmentType.filter(
      (item) => item.id !== id
    );
    if (deleteEquipmentType(id)) {
      toast.success("Tipo de equipamento excluído com sucesso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setListEquipmentsType(newListEquipmentType);
    }else{
      toast.error(
        "Não é possivel excluir porque há informações vinculadas a esse tipo de equipamento",
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
    async function getEquipmentTypeList() {
      const data = await getEquipmentsType();
      setListEquipmentsType(data);
    }

    getEquipmentTypeList();
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Tipos de equipamento</h1>
        <CommonButton
          id="btnAddEquipmentType"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/equipment_type/new")}
        />
      </div>

      <ul>
        {listEquipmentType.map((equipmentType) => {
          return (
            <li className="py-3 flex flex-col gap-3" key={equipmentType.id}>
              <span className="font-bold">#{equipmentType.id}</span>
              <h2>{equipmentType.name}</h2>
              <div className="flex justify-between gap-3">
                <CommonButton
                  id="btnEditEquipmentType"
                  name="btnEditEquipmentType"
                  content="Editar"
                  warn={true}
                  icon={<PencilSimpleLine size={24} />}
                  onClick={() =>
                    navigate(`/equipment_type/update/${equipmentType.id}`)
                  }
                />

                <CommonButton
                  id="btnDeleteEquipmentType"
                  name="btnDeleteEquipmentType"
                  content="Excluir"
                  danger={true}
                  icon={<TrashSimple size={24} />}
                  onClick={() => handleRemove(equipmentType.id)}
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
