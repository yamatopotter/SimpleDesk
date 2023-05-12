import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";

export const ViewEquiment = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Nome do Equipamento</h1>

      <ul className="flex flex-col gap-2">
        <li>Tipo de equipamento</li>
        <li>Setor</li>
        <li>
          <CommonButton
            id="editUser"
            name="editUser"
            content="Editar usuário"
            warn={true}
            icon={<PencilSimpleLine size={24} />}
          />
        </li>
        <li>
          <CommonButton
            id="deleteUser"
            name="deleteUser"
            content="Excluir usuário"
            danger={true}
            icon={<TrashSimple size={24} />}
          />
        </li>
      </ul>
    </div>
  );
};
