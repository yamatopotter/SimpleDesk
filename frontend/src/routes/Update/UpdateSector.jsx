import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../components/Container";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { UpdSector } from "../../pages/Update/UpdSector";
import { useEffect, useState } from "react";
import { getSector } from "../../functions/sectorManagement";

export const UpdateSector = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sector, setSector] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const data = await getSector(id);

      if (data) {
        setSector(data);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      navigate("/sector");
    }

    getData();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <Container>
        <UpdSector sector={sector} navigate={navigate} />
      </Container>
    </LoadingComponent>
  );
};
