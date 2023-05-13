import { ListItemBoxed } from "../components/ListItemBoxed/ListItemBoxed";

export const Home = () => {
  return (
    <div className="flex flex-col gap-10 w-full">
      <section id="openTickets" className="flex flex-col gap-2">
        <h1 className="text-xl">Chamados em aberto</h1>

        <ul className="flex flex-col gap-4">
          <ListItemBoxed
            title="#0001 Titulo do chamado"
            description="Aguardando atendimento"
          />
          <hr></hr>
          <ListItemBoxed
            title="#0001 Titulo do chamado"
            description="Aguardando atendimento"
          />
          <hr></hr>
          <ListItemBoxed
            title="#0001 Titulo do chamado"
            description="Aguardando atendimento"
          />
        </ul>
      </section>

      <section id="onGoingTickets" className="flex flex-col gap-2">
        <h1 className="text-xl">Chamados em atendimento</h1>
        <ul className="flex flex-col gap-4">
          <ListItemBoxed
            title="#0001 Titulo do chamado"
            description="Aguardando atendimento"
            started={true}
          />
          <hr></hr>
          <ListItemBoxed
            title="#0001 Titulo do chamado"
            description="Aguardando atendimento"
            started={true}
          />
          <hr></hr>
          <ListItemBoxed
            title="#0001 Titulo do chamado"
            description="Aguardando atendimento"
            started={true}
          />
        </ul>
      </section>
    </div>
  );
};
