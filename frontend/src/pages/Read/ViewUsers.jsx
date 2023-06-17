import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";

export const ViewUsers = ({ listUsers }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Lista de usuários</h1>

      <ul className="flex flex-col gap-4">
        {listUsers.map((user) => {
          return (
            <>
              <li className="py-3 flex flex-col gap-2">
                <span className="font-bold">#{user.id}</span>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.role}</p>
                <div className="flex justify-between gap-2">
                  <CommonButton
                    id="editUser"
                    name="editUser"
                    content="Editar usuário"
                    warn={true}
                    icon={<PencilSimpleLine size={24} />}
                    onClick={()=>navigate(`/user/update/${user.id}`)}
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
            </>
          );
        })}

        {/* <li className="py-3 flex flex-col gap-2">
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
        </li> */}
      </ul>
    </div>
  );
};
