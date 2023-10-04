import { PencilSimpleLine, Plus, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ModalDelete } from "../../components/ModalDelete";

export const ViewEquipmentsType = ({ equipmentsType, deleteEquipmentType }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });
  const navigate = useNavigate();

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
        {equipmentsType.map((equipmentType) => {
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
                  full={true}
                  showTextOnMobile={false}
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
                  full={true}
                  showTextOnMobile={false}
                  icon={<TrashSimple size={24} />}
                  onClick={() =>
                    setIsVisible({
                      visible: true,
                      id: equipmentType.id,
                      name: equipmentType.name,
                    })
                  }
                />
              </div>
              <hr></hr>
            </li>
          );
        })}
      </ul>

      <ModalDelete
        isVisible={isVisible.visible}
        setIsVisible={setIsVisible}
        idEntity={isVisible.id}
        nameEntity={isVisible.name}
        onClickYes={() => deleteEquipmentType(isVisible.id)}
      />
    </div>
  );
};
