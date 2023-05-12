import { Eye, PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";

export const ViewSectors = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl">Setores</h1>

      <ul>
        <li className="py-3 flex flex-col gap-3">
          <span className="font-bold">#0000</span>
          <h2>Nome do setor</h2>
          <div className="flex justify-between gap-3">
            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar setor"
              warn={true}
              icon={<PencilSimpleLine size={24} />}
            />

            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar setor"
              danger={true}
              icon={<TrashSimple size={24} />}
            />
          </div>
        </li>
        <hr></hr>
        <li className="py-3 flex flex-col gap-3">
          <span className="font-bold">#0000</span>
          <h2>Nome do setor</h2>
          <div className="flex justify-between gap-3">
            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar setor"
              warn={true}
              icon={<PencilSimpleLine size={24} />}
            />

            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar setor"
              danger={true}
              icon={<TrashSimple size={24} />}
            />
          </div>
        </li>
        <hr></hr>
        <li className="py-3 flex flex-col gap-3">
          <span className="font-bold">#0000</span>
          <h2>Nome do setor</h2>
          <div className="flex justify-between gap-3">
            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar setor"
              warn={true}
              icon={<PencilSimpleLine size={24} />}
            />

            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar setor"
              danger={true}
              icon={<TrashSimple size={24} />}
            />
          </div>
        </li>
        <hr></hr>
        <li className="py-3 flex flex-col gap-3">
          <span className="font-bold">#0000</span>
          <h2>Nome do setor</h2>
          <div className="flex justify-between gap-3">
            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar setor"
              warn={true}
              icon={<PencilSimpleLine size={24} />}
            />

            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar setor"
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
