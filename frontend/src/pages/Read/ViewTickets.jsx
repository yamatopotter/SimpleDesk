import { useNavigate } from "react-router-dom";
import { ListItemBoxed } from "../../components/ListItemBoxed/ListItemBoxed";

export const ViewTickets = ({ todo, doing }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-10 w-full">
      <section id="openTickets" className="flex flex-col gap-2">
        <h1 className="text-xl">Chamados em aberto</h1>

        <ul className="flex flex-col gap-4">
          {todo.map((task) => (
            <ListItemBoxed
              title={`#${task.id} ${task.title}`}
              description={`${task.status.name}`}
              key={task.id}
              onClick={() => navigate(`/ticket/${task.id}`)}
            />
          ))}

          {todo.length == 0 && (
            <p className="pt-3">Não há chamados em aberto</p>
          )}
        </ul>
      </section>

      <section id="onGoingTickets" className="flex flex-col gap-2">
        <h1 className="text-xl">Chamados em atendimento</h1>
        <ul className="flex flex-col gap-4">
          {doing.map((task) => {
            return (
              <>
                <ListItemBoxed
                  title={`#${task.id} ${task.title}`}
                  description={`${task.status.name}`}
                  started={true}
                  key={task.id}
                  onClick={() => navigate(`/ticket/${task.id}`)}
                />
              </>
            );
          })}

          {doing.length == 0 && (
            <p className="pt-3">Não há chamados em atendimento</p>
          )}
        </ul>
      </section>
    </div>
  );
};
