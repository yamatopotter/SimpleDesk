import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { getTickets } from "../../functions/ticketManagement";
import { ViewAllTickets } from "../../pages/Read/ViewAllTickets";
import { Container } from "../../components/Container";
import { useNavigate } from "react-router-dom";

export const ListTickets = () => {
  const [listTickets, setListTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getDataFromServer() {
      const data = await getTickets();
      if (data) {
        setListTickets(data);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      navigate("/home");
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
