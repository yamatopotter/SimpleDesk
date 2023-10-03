import { useEffect, useState } from "react";
import { ViewStatuses } from "../../pages/Read/ViewStatuses";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { deleteStatus, getStatuses } from "../../functions/statusManagement";
import { Container } from "../../components/Container";

export const ListStatuses = () => {
  const [listStatus, setListStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDataFromServer() {
      const data = await getStatuses();
      setListStatus(data);
      setIsLoading(false);
    }

    getDataFromServer();
  }, []);

  async function handleRemove(id) {
    const newListStatuses = listStatus.filter((item) => item.id !== id);
    const response = await deleteStatus(id);
    if (response) {
      setListStatus(newListStatuses);
    }
  }

  return (
    <LoadingComponent isLoading={isLoading}>
      <Container>
        <ViewStatuses listStatus={listStatus} handleRemove={handleRemove} />
      </Container>
    </LoadingComponent>
  );
};
