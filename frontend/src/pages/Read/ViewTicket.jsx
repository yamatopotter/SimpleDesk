export const ViewTicket = ({ ticketData, ticketHistory }) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-lg">Ticket #{ticketData.id}</h1>

      <ul className="flex flex-col gap-3">
        <li>Criado por: {ticketData.user.name}</li>
        <li>Problema: {ticketData.title}</li>
        <li>Detalhamento: {ticketData.description}</li>
        <li>
          Foto:
          {ticketData.urlPhoto ? (
            <a href="" className="text-violet-700">
              Ver Imagem
            </a>
          ) : (
            " Não há foto no chamado"
          )}
        </li>
        {/* Todo: Criar modal */}
        <li>Computador: {ticketData.equipment.name}</li>
        <li>Setor: {ticketData.equipment.sector.name}</li>
        <li>Criado em: {new Date(ticketData.created_at).toLocaleString("pt-br")}</li>
        <li>Ultimo status: {ticketData.status.name}</li>
      </ul>

      <hr></hr>

      <h2 className="text-lg">Histórico de atendimento</h2>

      {ticketHistory.map((data) => {
        return (
          <ul className="flex flex-col gap-2 border rounded-md shadow-sm p-2" key={data.id}>
            <li>Data: {new Date(data.created_at).toLocaleString("pt-br")} </li>
            <li>Status: {data.status.name}</li>
            <li>Descrição: {data.description}</li>
            {data.urlPhoto && (
              <li>
                Foto:{" "}
                <a href={data.urlPhoto} className="text-violet-700">
                  Ver Imagem
                </a>
              </li>
            )}
            <li>Criado por: {data.user.name}</li>
          </ul>
        );
      })}

      {/* <ul className="flex flex-col gap-2 border rounded-md shadow-sm p-2">
        <li>Data: 00/00/0000 00:00</li>
        <li>Status: Aguardando peça</li>
        <li>Descrição: Aguardando peça</li>
        <li>
          Foto:{" "}
          <a href="" className="text-violet-700">
            Ver Imagem
          </a>
        </li>
      </ul> */}
    </div>
  );
};
