import { PencilSimpleLine, Plus, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalDelete } from "../../components/ModalDelete";

export const ViewEquipments = ({ equipments, deleteEquipment }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Equipamentos</h1>

        <CommonButton
          id="btn_addEquipment"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/equipment/new")}
        />
      </div>

      <ul>
        {equipments.map((equipment) => {
          return (
            <li className="py-3 flex flex-col gap-2" key={equipment.id}>
              <span className="font-bold">#{equipment.id}</span>
              <h2>{equipment.name}</h2>
              <p>{equipment.equipment_type.name}</p>
              <p>{equipment.sector.name}</p>
              <div className="flex justify-between gap-2">
                <CommonButton
                  id="btn_EditEquipment"
                  name="btn_EditEquipment"
                  content="Editar"
                  warn={true}
                  full={true}
                  icon={<PencilSimpleLine size={24} />}
                  onClick={() => navigate(`/equipment/update/${equipment.id}`)}
                />

                <CommonButton
                  id="btn_deleteEquipment"
                  name="btn_deleteEquipment"
                  content="Excluir"
                  danger={true}
                  full={true}
                  icon={<TrashSimple size={24} />}
                  onClick={() =>
                    setIsVisible({
                      visible: true,
                      id: equipment.id,
                      name: equipment.name,
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
        onClickYes={() => deleteEquipment(isVisible.id)}
      />
    </div>
  );
};
