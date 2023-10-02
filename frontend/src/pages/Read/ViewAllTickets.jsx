import { Eye } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";

export const ViewAllTickets = ({ ticketsData }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Lista de chamados</h1>

      <ul>
        {ticketsData.reverse().map((ticket) => {
          return (
            <li className="py-3 flex flex-col gap-3">
              <span className="font-bold">#{ticket.id}</span>
              <h2>{ticket.title}</h2>
              <p
                className={`p-2 text-white w-fit ${
                  ticket.status.workflow.id == 1
                    ? "bg-red-500"
                    : ticket.status.workflow.id == 2 ? "bg-yellow-500" : "bg-green-500"
                }`}
              >
                Ultimo Status: {ticket.status.name}
              </p>
              <CommonButton
                id="ticketHistory"
                name="ticketHistory"
                content="Ver chamado"
                icon={<Eye size={24} />}
                onClick={() => navigate(`/ticket/${ticket.id}`)}
              />
              <hr></hr>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
