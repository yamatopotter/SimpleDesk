import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";

export const ViewStatus = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Nome do Status</h1>

      <ul className="flex flex-col gap-2">
        <li>
          <CommonButton
            id="editUser"
            name="editUser"
            content="Editar"
            warn={true}
            icon={<PencilSimpleLine size={24} />}
          />
        </li>
        <li>
          <CommonButton
            id="deleteUser"
            name="deleteUser"
            content="Excluir"
            danger={true}
            icon={<TrashSimple size={24} />}
          />
        </li>
      </ul>
    </div>
  );
};
