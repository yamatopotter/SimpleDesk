import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { getTickets } from "../../functions/ticketManagement";
import { ViewAllTickets } from "../../pages/Read/ViewAllTickets";
import { Container } from "../../components/Container";

export const ListTickets = () => {
  const [listTickets, setListTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDataFromServer() {
      const data = await getTickets();
      setListTickets(data);
      setIsLoading(false);
    }

    getDataFromServer();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <Container>
        <ViewAllTickets ticketsData={listTickets} />
      </Container>
    </LoadingComponent>
  );
};
