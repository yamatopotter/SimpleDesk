import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../components/Container";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { UpdSector } from "../../pages/Update/UpdSector";
import { useEffect, useState } from "react";
import { getSector, updateSector } from "../../functions/sectorManagement";

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

  const updateData = async (data) => {
    const response = await updateSector(data);
    if (response) {
      setTimeout(navigate("/sector"), 1000);
    }
  };

  return (
    <LoadingComponent isLoading={isLoading}>
      <Container>
        <UpdSector sector={sector} updateSector={updateData} />
      </Container>
    </LoadingComponent>
  );
};
