import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";

export const ViewUsers = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Lista de usuários</h1>

      <ul>
        <li className="py-3 flex flex-col gap-2">
          <span className="font-bold">#0000</span>
          <h2>Nome do usuário</h2>
          <p>Email</p>
          <p>Telefone</p>
          <div className="flex justify-between gap-2">
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
        </li>
        <hr></hr>
        <li className="py-3 flex flex-col gap-2">
          <span className="font-bold">#0000</span>
          <h2>Nome do usuário</h2>
          <p>Email</p>
          <p>Telefone</p>
          <div className="flex justify-between gap-2">
            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar usuário"
              warn={true}
              icon={<PencilSimpleLine size={24} />}
            />

            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar usuário"
              danger={true}
              icon={<TrashSimple size={24} />}
            />
          </div>
        </li>
        <li className="py-3 flex flex-col gap-2">
          <span className="font-bold">#0000</span>
          <h2>Nome do usuário</h2>
          <p>Email</p>
          <p>Telefone</p>
          <div className="flex justify-between gap-2">
            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar usuário"
              warn={true}
              icon={<PencilSimpleLine size={24} />}
            />

            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar usuário"
              danger={true}
              icon={<TrashSimple size={24} />}
            />
          </div>
        </li>
        <li className="py-3 flex flex-col gap-3">
          <span className="font-bold">#0000</span>
          <h2>Nome do usuário</h2>
          <p>Email</p>
          <p>Telefone</p>
          <div className="flex justify-between gap-3">
            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar usuário"
              warn={true}
              icon={<PencilSimpleLine size={24} />}
            />

            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar usuário"
              danger={true}
              icon={<TrashSimple size={24} />}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};
