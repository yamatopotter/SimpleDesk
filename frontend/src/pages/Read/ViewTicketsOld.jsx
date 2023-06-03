import { Eye } from "@phosphor-icons/react"
import { CommonButton } from "../../components/CommonButton/CommonButton"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const ViewTicketsOld = ({ticketsData}) => {
  const navigate = useNavigate();
    return (
      <div className="flex flex-col gap-5 w-full">
        <h1 className="text-xl">Lista de chamados</h1>

        <ul>
          {ticketsData.map((ticket) => {
            return (
              <li className="py-3 flex flex-col gap-3">
                <span className="font-bold">#{ticket.id}</span>
                <h2>{ticket.title}</h2>
                <p>Ultimo Status: aqui entra o status</p>
                <CommonButton
                  id="ticketHistory"
                  name="ticketHistory"
                  content="Ver chamado"
                  icon={<Eye size={24} />}
                  onClick={()=>navigate(`/ticket/${ticket.id}`)}
                />
                <hr></hr>
              </li>
            );
          })}
        </ul>
      </div>
    );
}