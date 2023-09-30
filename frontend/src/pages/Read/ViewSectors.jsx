import { PencilSimpleLine, Plus, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ModalDelete } from "../../components/ModalDelete";

export const ViewSectors = ({ sectors, deleteSector }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });
  const navigate = useNavigate();

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
        {sectors.map((sector) => {
          return (
            <li className="py-3 flex flex-col gap-2" key={sector.id}>
              <span className="font-bold">#{sector.id}</span>
              <h2>{sector.name}</h2>
              <div className="flex justify-between gap-2">
                <CommonButton
                  id="btn_editSector"
                  name="btn_editSector"
                  content="Editar setor"
                  warn={true}
                  full={true}
                  showTextOnMobile={false}
                  icon={<PencilSimpleLine size={24} />}
                  onClick={() => navigate(`/sector/update/${sector.id}`)}
                />

                <CommonButton
                  id="btn_deleteSector"
                  name="btn_deleteSector"
                  content="Excluir setor"
                  danger={true}
                  full={true}
                  showTextOnMobile={false}
                  icon={<TrashSimple size={24} />}
                  onClick={() =>
                    setIsVisible({
                      visible: true,
                      id: sector.id,
                      name: sector.name,
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
        onClickYes={() => deleteSector(isVisible.id)}
      />
    </div>
  );
};
