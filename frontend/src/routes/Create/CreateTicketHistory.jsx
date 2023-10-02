import { useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { AddTicketHistory } from "../../pages/Create/AddTicketHistory";
import { getStatuses } from "../../functions/statusManagement";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { transformToOptions } from "../../functions/common";
import { useParams } from "react-router-dom";

export const CreateTicketHistory = () => {
  const [listStatus, setListStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {id} = useParams();

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
        <AddTicketHistory statuses={listStatus} ticket={id}/>
      </Container>
    </LoadingComponent>
  );
};
