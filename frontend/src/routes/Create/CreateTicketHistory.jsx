import { useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { AddTicketHistory } from "../../pages/Create/AddTicketHistory";
import { getStatuses } from "../../functions/statusManagement";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { transformToOptions } from "../../functions/common";

export const CreateTicketHistory = () => {
  const [listStatus, setListStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDataFromServer() {
      const data = await getStatuses();
      setListStatus(transformToOptions(data));
      setIsLoading(false);
    }

    getDataFromServer();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <Container>
        <AddTicketHistory statuses={listStatus}/>
      </Container>
    </LoadingComponent>
  );
};
