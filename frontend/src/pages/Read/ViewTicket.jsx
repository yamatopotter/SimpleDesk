import { Plus } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { ModalImage } from "../../components/ModalImage/ModalImage";
import { useState } from "react";

export const ViewTicket = ({ ticketData, ticketHistory }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({
    visible: false,
    image: "",
  });

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg">Ticket #{ticketData.id}</h1>
        <CommonButton
          id="btn_addStatus"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/ticket/ticket_history/" + ticketData.id)}
        />
      </div>

      <ul className="flex flex-col gap-3">
        <li>Criado por: {ticketData.user.name}</li>
        <li>Problema: {ticketData.title}</li>
        <li>Detalhamento: {ticketData.description}</li>
        <li>
          Foto:
          {ticketData.urlPhoto ? (
            <span
              className="text-violet-700 cursor-pointer"
              onClick={() =>
                setIsVisible({
                  visible: true,
                  image: ticketData.urlPhoto,
                })
              }
            >
              Ver Imagem
            </span>
          ) : (
            " Não há foto no chamado"
          )}
        </li>
        {/* Todo: Criar modal */}
        <li>Computador: {ticketData.equipment.name}</li>
        <li>Setor: {ticketData.equipment.sector.name}</li>
        <li>
          Criado em: {new Date(ticketData.created_at).toLocaleString("pt-br")}
        </li>
        <li>Ultimo status: {ticketData.status.name}</li>
      </ul>

      <hr></hr>

      <h2 className="text-lg">Histórico de atendimento</h2>

      {ticketHistory.map((data) => {
        return (
          <ul
            className="flex flex-col gap-2 border rounded-md shadow-sm p-2"
            key={data.id}
          >
            <li>Data: {new Date(data.created_at).toLocaleString("pt-br")} </li>
            <li>Status: {data.status.name}</li>
            <li>Descrição: {data.description}</li>
            {data.urlPhoto && (
              <li>
                Foto:{" "}
                <span
                  className="text-violet-700 cursor-pointer"
                  onClick={() =>
                    setIsVisible({
                      visible: true,
                      image: data.urlPhoto,
                    })
                  }
                >
                  Ver Imagem
                </span>
              </li>
            )}
            <li>Criado por: {data.user.name}</li>
          </ul>
        );
      })}

      <ModalImage
        isVisible={isVisible.visible}
        setIsVisible={setIsVisible}
        image={isVisible.image}
      />
    </div>
  );
};
