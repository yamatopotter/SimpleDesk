import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";

export const ViewUser = ({ user }) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">{user.name}</h1>

      <ul className="flex flex-col gap-2">
        <li>Email: {user.email}</li>
        <li>Telefone: {user.phone}</li>
        <li>Nível no sistema: {user.role}</li>
        <div className="flex gap-5">
          <CommonButton
            id="editUser"
            name="editUser"
            content="Editar usuário"
            warn={true}
            icon={<PencilSimpleLine size={24} />}
          />
          <CommonButton
            id="deleteUser"
            name="deleteUser"
            content="Excluir usuário"
            danger={true}
            icon={<TrashSimple size={24} />}
          />
        </div>
      </ul>
    </div>
  );
};
