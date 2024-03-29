import { useEffect, useState } from "react";
import { getTicketsByWorkflow } from "../functions/ticketManagement";
import { ViewTickets } from "../pages/Read/ViewTickets";
import { LoadingComponent } from "../components/LoadingComponent/LoadingComponent";
import { Container } from "../components/Container";

export const Home = () => {
  const [listTicketsToDo, setListTicketsToDo] = useState([]);
  const [listTicketsDoing, setListTicketsDoing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getStatusesList() {
      const todo = await getTicketsByWorkflow("todo");
      const doing = await getTicketsByWorkflow("doing");
      setListTicketsToDo(todo);
      setListTicketsDoing(doing);

      setIsLoading(false);
    }

    getStatusesList();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <Container>
        <ViewTickets todo={listTicketsToDo} doing={listTicketsDoing} />
      </Container>
    </LoadingComponent>
  );
};
