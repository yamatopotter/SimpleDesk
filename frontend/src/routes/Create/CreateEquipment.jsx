import { Container } from "../../components/Container";
import { AddEquipment } from "../../pages/Create/AddEquipment";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { useEffect, useState } from "react";
import { getEquipmentsType } from "../../functions/equipmentTypeManagement";
import { getSectors } from "../../functions/sectorManagement";
import { useNavigate } from "react-router-dom";

export const CreateEquipment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [equipmentType, setEquipmentType] = useState([]);
  const [sector, setSector] = useState([]);
  const navigate = useNavigate();

  function transformToOptions(data) {
    const newData = data.map((d) => {
      return { value: d.id, label: d.name };
    });
    return newData;
  }

  useEffect(() => {
    async function getData() {
      const responseEquipmentsType = await getEquipmentsType();
      const responseSector = await getSectors();

      if (responseEquipmentsType && responseSector) {
        setEquipmentType(transformToOptions(responseEquipmentsType));
        setSector(transformToOptions(responseSector));
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      navigate("/equipment");
    }

    getData();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <Container>
        <AddEquipment equipmentType={equipmentType} sector={sector} />
      </Container>
    </LoadingComponent>
  );
};
