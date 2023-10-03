import { useEffect, useState } from "react";
import { ViewTicket } from "../../pages/Read/ViewTicket";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { getTicket } from "../../functions/ticketManagement";
import { useNavigate, useParams } from "react-router-dom";
import { getTicketHistoryByTicket } from "../../functions/ticketHistoryManagement";
import { Container } from "../../components/Container";

export const DetailTicket = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ticketData, setTicketData] = useState({});
  const [ticketHistory, setTicketHistory] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const ticket = await getTicket(id);
      const ticketHistory = await getTicketHistoryByTicket(ticket.id);

      if (ticket !== null || ticketHistory !== null) {
        setTicketData(ticket);
        setTicketHistory(ticketHistory);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      navigate("/ticket");
    }

    loadData();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <Container>
        <ViewTicket ticketData={ticketData} ticketHistory={ticketHistory} />
      </Container>
    </LoadingComponent>
  );
};
