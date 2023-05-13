import { Eye } from "@phosphor-icons/react"
import { CommonButton } from "../../components/CommonButton/CommonButton"

export const ViewTickets = () => {
    return (
      <div className="flex flex-col gap-5 w-full">
        <h1 className="text-xl">Lista de chamados</h1>

        <ul>
          <li className="py-3 flex flex-col gap-3">
            <span className="font-bold">#0000</span>
            <h2>Titulo do chamado</h2>
            <p>Ultimo Status: aqui entra o status</p>
            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Ver chamado"
              icon={<Eye size={24} />}
            />
          </li>
          <hr></hr>
          <li className="py-3 flex flex-col gap-3">
            <span className="font-bold">#0000</span>
            <h2>Titulo do chamado</h2>
            <p>Ultimo Status: aqui entra o status</p>
            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Ver chamado"
              icon={<Eye size={24} />}
            />
          </li>
          <hr></hr>
          <li className="py-3 flex flex-col gap-3">
            <span className="font-bold">#0000</span>
            <h2>Titulo do chamado</h2>
            <p>Ultimo Status: aqui entra o status</p>
            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Ver chamado"
              icon={<Eye size={24} />}
            />
          </li>
          <hr></hr>
          <li className="py-3 flex flex-col gap-3">
            <span className="font-bold">#0000</span>
            <h2>Titulo do chamado</h2>
            <p>Ultimo Status: aqui entra o status</p>
            <CommonButton
              id="ticketHistory"
              name="ticketHistory"
              content="Ver chamado"
              icon={<Eye size={24} />}
            />
          </li>
          <hr></hr>
        </ul>
      </div>
    );
}