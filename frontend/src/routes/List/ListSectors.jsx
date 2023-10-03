import { useEffect, useState } from "react";
import { ViewSectors } from "../../pages/Read/ViewSectors";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { deleteSector, getSectors } from "../../functions/sectorManagement";
import { toast } from "react-toastify";
import { Container } from "../../components/Container";
import { useNavigate } from "react-router-dom";

export const ListSectors = () => {
  const [listSectors, setListSectors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  async function deleteData(id) {
    const newListSectors = listSectors.filter((item) => item.id !== id);
    const response = await deleteSector(id);
    if (response) {
      setListSectors(newListSectors);
    }
  }

  useEffect(() => {
    async function getData() {
      const data = await getSectors();

      if (data) {
        setListSectors(data);
        setIsLoading(false);
        return;
      }

      navigate("/home");
      setIsLoading(false);
    }

    getData();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <Container>
        <ViewSectors sectors={listSectors} deleteSector={deleteData} />
      </Container>
    </LoadingComponent>
  );
};
