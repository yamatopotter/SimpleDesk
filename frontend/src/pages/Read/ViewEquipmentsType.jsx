import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";

export const ViewEquipmentsType = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Tipos de equipamento</h1>

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
