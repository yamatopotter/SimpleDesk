import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";

export const ViewEquipments = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Lista de equipamentos</h1>

      <ul>
        <li className="py-3 flex flex-col gap-2">
          <span className="font-bold">#0000</span>
          <h2>Nome do equipamento</h2>
          <p>Tipo do equipamento</p>
          <p>Setor</p>
          <div className="flex justify-between gap-2">
            <CommonButton
              id="editEquipment"
              name="editEquipment"
              content="Editar"
              warn={true}
              icon={<PencilSimpleLine size={24} />}
            />

            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Excluir"
              danger={true}
              icon={<TrashSimple size={24} />}
            />
          </div>
        </li>
        <hr></hr>
        <li className="py-3 flex flex-col gap-2">
          <span className="font-bold">#0000</span>
          <h2>Nome do equipamento</h2>
          <p>Tipo do equipamento</p>
          <p>Setor</p>
          <div className="flex justify-between gap-2">
            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar Equipamento"
              warn={true}
              icon={<PencilSimpleLine size={24} />}
            />

            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar Equipamento"
              danger={true}
              icon={<TrashSimple size={24} />}
            />
          </div>
        </li>
        <li className="py-3 flex flex-col gap-2">
          <span className="font-bold">#0000</span>
          <h2>Nome do equipamento</h2>
          <p>Tipo do equipamento</p>
          <p>Setor</p>
          <div className="flex justify-between gap-2">
            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar Equipamento"
              warn={true}
              icon={<PencilSimpleLine size={24} />}
            />

            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar Equipamento"
              danger={true}
              icon={<TrashSimple size={24} />}
            />
          </div>
        </li>
        <li className="py-3 flex flex-col gap-3">
          <span className="font-bold">#0000</span>
          <h2>Nome do equipamento</h2>
          <p>Tipo do equipamento</p>
          <p>Setor</p>
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
