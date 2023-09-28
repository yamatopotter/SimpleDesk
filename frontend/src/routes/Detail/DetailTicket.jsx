import { useEffect, useState } from "react";
import { ViewTicket } from "../../pages/Read/ViewTicket";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { getTicket } from "../../functions/ticketManagement";
import { useParams } from "react-router-dom";
import { getTicketHistoryByTicket } from "../../functions/ticketHistoryManagement";

export const DetailTicket = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ticketData, setTicketData] = useState({});
  const [ticketHistory, setTicketHistory] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function loadData() {
      try{
        const ticket = await getTicket(id);
        console.log(ticket);
        const ticketHistory = await getTicketHistoryByTicket(ticket.id);
        setTicketData(ticket);
        setTicketHistory(ticketHistory);
        setIsLoading(false);
      }
      catch(e){
        console.log(e);
      }


    }

    loadData();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewTicket ticketData={ticketData} ticketHistory={ticketHistory}/>
    </LoadingComponent>
  );
};
