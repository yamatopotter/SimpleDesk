import { PencilSimpleLine, Plus, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const ViewEquipmentsType = () => {
  const [listEquipmentType, setListEquipmentsType] = useState([]);
  const navigate = useNavigate();

  async function handleRemove(id) {
    const newListEquipmentType = listSectors.filter((item) => item.id !== id);
    if (deleteSector(id)) {
      setListSectors(newListEquipmentType);
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Tipos de equipamento</h1>
        <CommonButton
          id="btnAdd"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/equipment_type/new")}
        />
      </div>

      <ul>
        <li className="py-3 flex flex-col gap-3">
          <span className="font-bold">#0000</span>
          <h2>Tipo do Equipamento</h2>
          <div className="flex justify-between gap-3">
            <CommonButton
              id="equipmentTypeEdit"
              name="equipmentTypeEdit"
              content="Editar"
              warn={true}
              icon={<PencilSimpleLine size={24} />}
            />

            <CommonButton
              id="equipmentTypeDelete"
              name="equipmentTypeDelete"
              content="Excluir"
              danger={true}
              icon={<TrashSimple size={24} />}
            />
          </div>
        </li>
        <hr></hr>
        <li className="py-3 flex flex-col gap-3">
          <span className="font-bold">#0000</span>
          <h2>Tipo do Equipamento</h2>
          <div className="flex justify-between gap-3">
            <CommonButton
              id="equipmentTypeEdit"
              name="equipmentTypeEdit"
              content="Editar"
              warn={true}
              icon={<PencilSimpleLine size={24} />}
            />

            <CommonButton
              id="equipmentTypeDelete"
              name="equipmentTypeDelete"
              content="Excluir"
              danger={true}
              icon={<TrashSimple size={24} />}
            />
          </div>
        </li>
        <hr></hr>
        <li className="py-3 flex flex-col gap-3">
          <span className="font-bold">#0000</span>
          <h2>Tipo do Equipamento</h2>
          <div className="flex justify-between gap-3">
            <CommonButton
              id="equipmentTypeEdit"
              name="equipmentTypeEdit"
              content="Editar"
              warn={true}
              icon={<PencilSimpleLine size={24} />}
            />

            <CommonButton
              id="equipmentTypeDelete"
              name="equipmentTypeDelete"
              content="Excluir"
              danger={true}
              icon={<TrashSimple size={24} />}
            />
          </div>
        </li>
        <hr></hr>
        <li className="py-3 flex flex-col gap-3">
          <span className="font-bold">#0000</span>
          <h2>Tipo do Equipamento</h2>
          <div className="flex justify-between gap-3">
            <CommonButton
              id="equipmentTypeEdit"
              name="equipmentTypeEdit"
              content="Editar"
              warn={true}
              icon={<PencilSimpleLine size={24} />}
            />

            <CommonButton
              id="equipmentTypeDelete"
              name="equipmentTypeDelete"
              content="Excluir"
              danger={true}
              icon={<TrashSimple size={24} />}
            />
          </div>
        </li>
        <hr></hr>
      </ul>
    </div>
  );
};
