import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";

export const ViewStatuses = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Status</h1>

      <ul>
        <li className="py-3 flex flex-col gap-3">
          <span className="font-bold">#0000</span>
          <h2>Nome do staus</h2>
          <div className="flex justify-between gap-3">
            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar staus"
              warn={true}
              icon={<PencilSimpleLine size={24} />}
            />

            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar staus"
              danger={true}
              icon={<TrashSimple size={24} />}
            />
          </div>
        </li>
        <hr></hr>
        <li className="py-3 flex flex-col gap-3">
          <span className="font-bold">#0000</span>
          <h2>Nome do staus</h2>
          <div className="flex justify-between gap-3">
            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar staus"
              warn={true}
              icon={<PencilSimpleLine size={24} />}
            />

            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar staus"
              danger={true}
              icon={<TrashSimple size={24} />}
            />
          </div>
        </li>
        <hr></hr>
        <li className="py-3 flex flex-col gap-3">
          <span className="font-bold">#0000</span>
          <h2>Nome do staus</h2>
          <div className="flex justify-between gap-3">
            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar staus"
              warn={true}
              icon={<PencilSimpleLine size={24} />}
            />

            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar staus"
              danger={true}
              icon={<TrashSimple size={24} />}
            />
          </div>
        </li>
        <hr></hr>
        <li className="py-3 flex flex-col gap-3">
          <span className="font-bold">#0000</span>
          <h2>Nome do staus</h2>
          <div className="flex justify-between gap-3">
            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar staus"
              warn={true}
              icon={<PencilSimpleLine size={24} />}
            />

            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Editar staus"
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
