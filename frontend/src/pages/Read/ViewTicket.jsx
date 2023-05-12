export const ViewTicket = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-lg">Ticket #0000</h1>

      <ul className="flex flex-col gap-3">
        <li>Usuário: Teste</li>
        <li>Problema: Titulo do problema</li>
        <li>Detalhamento: O computador não liga nem por um decreto</li>
        <li>
          Foto:{" "}
          <a href="" className="text-violet-700">
            Ver Imagem
          </a>
        </li>
        {/* Todo: Criar modal */}
        <li>Computador: D-TESTE-001</li>
        <li>Setor: GERAL</li>
        <li>Criado em: 00/00/0000 às 00:00</li>
        <li>Ultimo status: Aguardando atendimento</li>
      </ul>

      <hr></hr>

      <h2 className="text-lg">Histórico de atendimento</h2>

      <ul className="flex flex-col gap-2 border rounded-md shadow-sm p-2">
        <li>Data: 00/00/0000 00:00</li>
        <li>Status: Aguardando peça</li>
        <li>Descrição: Aguardando peça</li>
        <li>
          Foto:{" "}
          <a href="" className="text-violet-700">
            Ver Imagem
          </a>
        </li>
      </ul>
      <ul className="flex flex-col gap-2 border rounded-md shadow-sm p-2">
        <li>Data: 00/00/0000 00:00</li>
        <li>Status: Aguardando peça</li>
        <li>Descrição: Aguardando peça</li>
        <li>
          Foto:{" "}
          <a href="" className="text-violet-700">
            Ver Imagem
          </a>
        </li>
      </ul>
    </div>
  );
};
