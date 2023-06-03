import { useEffect, useState } from "react";
import { LoadingComponent } from "../components/LoadingComponent/LoadingComponent";
import { getTickets } from "../functions/ticketManagement";
import { ViewTickets } from "../pages/Read/ViewTicketsOld";

export const ListTickets = () => {
  const [listTickets, setListTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getStatusesList() {
      const data = await getTickets();
      setListTickets(data);
      setIsLoading(false)
    }

    getStatusesList();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewTickets ticketsData={listTickets}/>
    </LoadingComponent>
  );
};
